import {
    useEffect,
    useState,
} from 'react';

import {
    LogOut,
    Menu,
    UserPlus,
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
        <div
            className="relative flex h-screen items-start justify-between px-14 pt-4"
            style={{ backgroundImage: `url(${bgRegister})` }}
        >
            <button
                onClick={(e) => {
                    e.preventDefault();
                    setIsNavOpen(true);
                }}
            >
                <Menu className="cursor-pointer" size={30} />
            </button>
            <h1 className="text-2xl">Chemistry Legends</h1>

            {/* Sidebar Navigation*/}
            {isNavOpen && (
                <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-5 transition-transform transform translate-x-0">
                    <button
                        className="mb-4 cursor-pointer"
                        onClick={() => setIsNavOpen(false)}
                    >
                        <X size={30} className="text-orange-500" />
                    </button>
                    {authUser ? (
                        <>
                            <nav className="mt-5 space-y-4">
                                <Link
                                    to="/community"
                                    className="group text-lg flex items-center space-x-4 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
                                >
                                    <span className="text-xl w-80 group-hover:w-full text-right transition-all duration-300">
                                        المجتمع
                                    </span>
                                    <Users size={32} className="text-orange-500" />
                                </Link>
                                <button
                                    onClick={logout}
                                    className="group text-lg flex items-center space-x-4 p-2 rounded-md hover:bg-gray-100 transition-all duration-300 w-full"
                                >
                                    <span className="text-xl w-80 group-hover:w-full text-right transition-all duration-300">
                                        تسجيل الخروج
                                    </span>
                                    <LogOut size={32} className="text-orange-500" />
                                </button>
                            </nav>
                        </>
                    ) : (
                        <>
                            <nav className="mt-5 space-y-4">
                                <Link
                                    to="/register"
                                    className="group text-lg flex items-center space-x-4 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
                                >
                                    <span className="text-xl w-80 group-hover:w-full text-right transition-all duration-300">
                                        إنشاء حساب
                                    </span>
                                    <UserPlus size={32} className="text-orange-500" />
                                </Link>
                                <Link
                                    to="/login"
                                    className="group text-lg flex items-center space-x-4 p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
                                >
                                    <span className="text-xl w-80 group-hover:w-full text-right transition-all duration-300">
                                        تسجيل الدخول
                                    </span>
                                    <LogOut size={32} className="text-orange-500" />
                                </Link>
                            </nav>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default Header;
