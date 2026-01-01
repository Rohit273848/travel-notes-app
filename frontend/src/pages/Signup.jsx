import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { User, Mail, Lock, UserPlus, Loader2, Eye, EyeOff, Sparkles, CheckCircle } from "lucide-react";

const Signup = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await fetch(
                "https://travel-notes-app.onrender.com/api/auth/signup",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Signup failed");
                return;
            }

            alert("✅ Signup successful. Please login.");
            navigate("/login");

        } catch (error) {
            console.error(error);
            alert("❌ Signup error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl shadow-lg mb-4">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h1>
                    <p className="text-gray-600">Start your travel journey with us</p>
                </div>

                {/* Signup Form Card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 transition-all duration-200 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Requirements */}
                            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                                <p className="text-xs font-semibold text-gray-700 mb-2">Password must contain:</p>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                    At least 8 characters
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                    One uppercase & lowercase letter
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="w-5 h-5" />
                                        Sign Up
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Bottom Accent */}
                    <div className="h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>
                </div>

                {/* Login Link */}
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={() => navigate("/login")}
                            className="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                        >
                            Login
                        </button>

                    </p>
                </div>

                {/* Additional Info */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                        <Sparkles className="w-4 h-4 text-emerald-500" />
                        <span>Join thousands of travelers worldwide</span>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-emerald-600">100+</div>
                        <div className="text-xs text-gray-600">Countries</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-emerald-600">50K+</div>
                        <div className="text-xs text-gray-600">Notes</div>
                    </div>
                    <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="text-2xl font-bold text-emerald-600">10K+</div>
                        <div className="text-xs text-gray-600">Users</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;