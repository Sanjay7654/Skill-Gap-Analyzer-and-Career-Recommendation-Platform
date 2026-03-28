import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");
        try {
            await axios.post("http://localhost:5000/api/users/forgot-password", { email });
            setMessage("OTP sent to mock service. CHECK THE SERVER TERMINAL for the code!");
            setTimeout(() => navigate(`/reset-password?email=${email}`), 3000);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to send OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
            <div className="max-w-md w-full p-10 bg-gray-900 rounded-[2.5rem] shadow-2xl border border-gray-800">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Recover</h1>
                    <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Enter your email to receive an OTP</p>
                </div>

                {message && <div className="mb-6 p-4 bg-emerald-900/20 border border-emerald-500/50 rounded-2xl text-emerald-400 text-xs font-bold text-center">{message}</div>}
                {error && <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-2xl text-red-400 text-xs font-bold text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-gray-950 text-white border border-gray-800 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-600 transition-all outline-none"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-gray-900 text-white font-black py-4 rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "SENDING..." : "SEND OTP"}
                    </button>
                </form>

                <p className="mt-8 text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Remember your password?{" "}
                    <Link to="/login" className="text-indigo-400 hover:text-white transition-colors">Sign In</Link>
                </p>
            </div>
        </div>
    );
}

export default ForgotPassword;
