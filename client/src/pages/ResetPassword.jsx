import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const emailParam = queryParams.get("email");
        if (emailParam) setEmail(emailParam);
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        try {
            await axios.post("http://localhost:5000/api/users/reset-password", { email, otp, newPassword });
            setMessage("Password reset successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to reset password. Please check your OTP.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="max-w-md w-full p-10 bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-800">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Reset</h1>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Enter OTP and your new password</p>
                </div>

                {message && <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-500/50 rounded-2xl text-emerald-400 text-xs font-bold text-center">{message}</div>}
                {error && <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-2xl text-red-400 text-xs font-bold text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-gray-950 text-white border border-gray-800 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none opacity-50"
                            value={email}
                            readOnly
                        />
                    </div>
                    
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">OTP Code</label>
                        <input
                            type="text"
                            required
                            maxLength="6"
                            className="w-full bg-gray-950 text-white border border-gray-800 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none text-center tracking-[1em] font-black"
                            placeholder="000000"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                className="w-full bg-gray-950 text-white border border-gray-800 rounded-2xl p-4 pr-12 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                                placeholder="••••••••"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-indigo-400 transition-colors"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12.a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-gray-900 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "RESETTING..." : "RESET PASSWORD"}
                    </button>
                </form>

                <p className="mt-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Want to try again?{" "}
                    <Link to="/forgot-password" className="text-indigo-400 hover:text-white transition-colors">Resend OTP</Link>
                </p>
            </div>
        </div>
    );
}

export default ResetPassword;
