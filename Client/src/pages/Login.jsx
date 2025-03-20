import React, { useState } from 'react';

import {
    Eye,
    EyeOff,
    Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import bgLogin from '../assets/bg-register.avif';
import { useAuthStore } from '../store/useAuthStore';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

    return (
        <div
            className="w-full h-screen bg-cover bg-center flex justify-center items-center px-4 sm:px-6 lg:px-8"
            style={{ backgroundImage: `url(${bgLogin})` }}
        >
            <div className="flex flex-col justify-center items-center shadow-2xl w-full max-w-xl p-8 rounded-lg ">
                <h1 className="text-3xl mb-4">تسجيل الدخول</h1>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center shadow-2xl w-full bg-stone-100 p-10">
                    <div className="w-full text-right">
                        <label className="block mb-2">البريد الإلكتروني</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded text-right"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="relative w-full text-right">
                        <label className="block mb-2">كلمة المرور</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full p-2 border rounded text-right"
                            placeholder="••••••••••••••••••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            type="button"
                            className="absolute top-10 left-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-5"
                        disabled={isLoggingIn || !isFormValid}
                    >
                        {isLoggingIn ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                جاري التحميل...
                            </>
                        ) : (
                            "تسجيل الدخول"
                        )}
                    </button>
                    <div className="text-center text-gray-600 mt-4">
                        ليس لديك حساب؟ {" "}
                        <Link to="/register" className="text-orange-500 font-medium hover:underline">
                            إنشاء حساب
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;