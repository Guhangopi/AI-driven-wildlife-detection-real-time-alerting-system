import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, AlertTriangle, User, LogOut, Users } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = user && user.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/dashboard') || isActive('/') ? 'text-nature-600' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        
        <Link 
          to="/report" 
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/report') ? 'text-nature-600' : 'text-gray-500 hover:text-gray-900'}`}
        >
          <AlertTriangle className="w-6 h-6" />
          <span className="text-[10px] font-medium">Report</span>
        </Link>

        {isAdmin && (
          <Link 
            to="/admin/users" 
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/admin/users') ? 'text-nature-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <Users className="w-6 h-6" />
            <span className="text-[10px] font-medium">Users</span>
          </Link>
        )}

        {!user ? (
          <Link 
            to="/login" 
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/login') || isActive('/register') ? 'text-nature-600' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-medium">Login</span>
          </Link>
        ) : (
          <button 
            onClick={handleLogout}
            className="flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-6 h-6" />
            <span className="text-[10px] font-medium">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default BottomNav;
