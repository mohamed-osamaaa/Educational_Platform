import React, { useState } from 'react';

import {
    Eye,
    EyeOff,
    Loader2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import bgRegister from '../assets/bg-register.avif';
import { useAuthStore } from '../store/useAuthStore';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        parentPhoneNumber: "",
        AcademicStage: "",
    });

    const { register, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        register(formData);
    };

    const isFormValid = Object.values(formData).every((value) => value.trim() !== "");

    return (
        <div
            className="w-full h-screen bg-cover bg-center flex justify-center items-center"
            style={{ backgroundImage: `url(${bgRegister})` }}
        >
            <div className="flex flex-col justify-center items-center shadow-2xl w-1/3 p-8 rounded-lg">
                <h1 className="text-3xl mb-4">سجل حساب</h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col justify-center items-center shadow-2xl w-full bg-stone-100 p-10"
                >
                    <div className="w-full text-right">
                        <label className="block mb-2">الاسم</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded text-right"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                        />
                    </div>
                    <div className="w-full text-right">
                        <label className="block mb-2">البريد الإلكتروني</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded text-right"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="relative w-full text-right">
                        <label className="block mb-2">كلمة المرور</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full p-2 border rounded text-right"
                            placeholder="••••••••••••••••••••••••"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />
                        <button
                            type="button"
                            className="absolute top-10 left-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    <div className="w-full text-right">
                        <label className="block mb-2">رقم الهاتف</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded text-right"
                            value={formData.phoneNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, phoneNumber: e.target.value })
                            }
                        />
                    </div>
                    <div className="w-full text-right">
                        <label className="block mb-2">رقم هاتف ولي الأمر</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded text-right"
                            value={formData.parentPhoneNumber}
                            onChange={(e) =>
                                setFormData({ ...formData, parentPhoneNumber: e.target.value })
                            }
                        />
                    </div>
                    <div className="w-full text-right">
                        <label className="block mb-2">المرحلة الدراسية</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={formData.AcademicStage}
                            onChange={(e) =>
                                setFormData({ ...formData, AcademicStage: e.target.value })
                            }
                        >
                            <option value="first">الأولى</option>
                            <option value="second">الثانية</option>
                            <option value="third">الثالثة</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-orange-500 mt-5"
                        disabled={isSigningUp || !isFormValid}
                    >
                        {isSigningUp ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                جاري التحميل...
                            </>
                        ) : (
                            "إنشاء حساب"
                        )}
                    </button>
                    <div className="text-center text-base-content/60 mt-4">
                        ادخل إلى حسابك الآن؟{" "}
                        <Link
                            to="/login"
                            className="text-primary font-medium hover:underline"
                        >
                            تسجيل الدخول
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
