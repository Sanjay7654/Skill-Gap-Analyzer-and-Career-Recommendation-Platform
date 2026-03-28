import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../config/supabaseClient.js';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const password_hash = await bcrypt.hash(password, 10);
        const { data, error } = await supabase
            .from('users')
            .insert([{ name, email, password_hash }])
            .select()
            .single();

        if (error) throw error;

        const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.status(201).json({ token, user: data });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !data) return res.status(401).json({ error: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, data.password_hash);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({ token, user: data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// In-memory OTP store (In production, use Redis or a DB table)
const otpStore = new Map();

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (error || !data) return res.status(404).json({ error: 'User not found' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore.set(email, { otp, expires: Date.now() + 600000 }); // 10 mins

        // Send real email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'SkillGap Analyzer - Password Recovery OTP',
            text: `Your OTP for password recovery is: ${otp}. It will expire in 10 minutes.`
        };

        try {
            await transporter.sendMail(mailOptions);
            res.json({ message: 'OTP sent to your email address' });
        } catch (mailError) {
            console.error('[MAIL ERROR]', mailError);
            res.status(500).json({ error: 'Failed to send email. Check server configuration.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    try {
        const stored = otpStore.get(email);
        if (!stored || stored.otp !== otp || stored.expires < Date.now()) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        const password_hash = await bcrypt.hash(newPassword, 10);
        const { error } = await supabase
            .from('users')
            .update({ password_hash })
            .eq('email', email);

        if (error) throw error;

        otpStore.delete(email);
        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
