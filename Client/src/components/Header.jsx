import {
    useEffect,
    useState,
} from 'react';

import {
    LogIn,
    LogOut,
    Menu,
    UserPlus,
    UserRound,
    Users,
    X,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import bgRegister from '../assets/bg-register.avif';
import { useAuthStore } from '../store/useAuthStore';

function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { authUser, checkAuth, logout } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return (
        <div style={{ backgroundImage: `url(${bgRegister})` }} className='relative h-screen bg-cover bg-center'>
            <div className="relative flex items-center justify-between px-6 sm:px-10 md:px-14 pt-4">
                <button onClick={(e) => { e.preventDefault(); setIsNavOpen(true); }}>
                    <Menu className="cursor-pointer" size={30} />
                </button>
                <h1 className="text-2xl">Chemistry Legends</h1>
            </div>
            {isNavOpen && (
                <div className="fixed z-50 top-0 right-0 w-64 sm:w-72 md:w-80 h-full bg-white shadow-lg p-5 transition-transform transform translate-x-0">
                    <button className="mb-4 cursor-pointer" onClick={() => setIsNavOpen(false)}>
                        <X size={30} className="text-orange-500" />
                    </button>
                    {authUser ? (
                        <nav className="mt-5 space-y-4">
                            <Link to="/community" className="group text-lg flex items-center space-x-4 p-2 rounded-md hover:bg-gray-100 transition-all duration-300">
                                <span className="text-xl w-full text-right transition-all duration-300">المجتمع</span>
                                <Users size={32} className="text-orange-500" />
                            </Link>
                            <Link to="/profile" className="group text-lg flex items-center space-x-4 p-2 rounded-md hover:bg-gray-100 transition-all duration-300">
                                <span className="text-xl w-full text-right transition-all duration-300">الملف الشخصي</span>
                                <UserRound size={32} className="text-orange-500" />
                            </Link>
                            <button onClick={logout} className="group text-lg flex items-center space-x-4 p-2 rounded-md hover:bg-gray-100 transition-all duration-300 w-full">
                                <span className="text-xl w-full text-right transition-all duration-300">تسجيل الخروج</span>
                                <LogOut size={32} className="text-orange-500" />
                            </button>
                        </nav>
                    ) : (
                        <nav className="mt-5 space-y-4">
                            <Link to="/register" className="group text-lg flex items-center space-x-4 p-2 rounded-md hover:bg-gray-100 transition-all duration-300">
                                <span className="text-xl w-full text-right transition-all duration-300">إنشاء حساب</span>
                                <UserPlus size={32} className="text-orange-500" />
                            </Link>
                            <Link to="/login" className="group text-lg flex items-center space-x-4 p-2 rounded-md hover:bg-gray-100 transition-all duration-300">
                                <span className="text-xl w-full text-right transition-all duration-300">تسجيل الدخول</span>
                                <LogIn size={32} className="text-orange-500" />
                            </Link>
                        </nav>
                    )}
                </div>
            )}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex flex-col justify-start items-center text-center space-y-6 px-4 sm:px-8">
                <h1 className="text-3xl sm:text-4xl font-bold">الكيمياء أسهل مع د/ أحمد المنسي</h1>
                <a className="cursor-pointer bg-orange-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-orange-600 transition-all duration-300 mt-3 w-32 sm:w-40" onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById("home1");
                    if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                    }
                }}>
                    ابدأ الان
                </a>
            </div>
        </div>
    );
}

export default Header;