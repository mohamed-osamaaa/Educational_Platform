import { useEffect } from 'react';

import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import Course1 from './pages/Course1';
import Course2 from './pages/Course2';
import Course3 from './pages/Course3';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import Register from './pages/Register';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={!authUser ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/course1" element={<Course1 />} />
        <Route path="/course2" element={<Course2 />} />
        <Route path="/course3" element={<Course3 />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App;