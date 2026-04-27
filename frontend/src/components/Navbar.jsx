import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShieldAlert, Menu, X, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation(); // Force re-render on route changes (like after login redirect)
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const isAdmin = user && user.role === 'admin';

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50 top-0 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ShieldAlert className="h-8 w-8 text-nature-600" />
            <span className="font-bold text-lg text-gray-800 tracking-tight flex-shrink-0 mr-4">AI Driven Wildlife Detection and Real Time Alerting System</span>
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/dashboard" className="text-gray-600 hover:text-nature-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Live Dashboard</Link>
              <Link to="/report" className="text-gray-600 hover:text-nature-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Report Incident</Link>
              {isAdmin && (
                  <Link to="/admin/users" className="text-purple-600 hover:text-purple-700 bg-purple-50 px-3 py-2 rounded-md text-sm font-bold transition-colors border border-purple-100">Users Directory</Link>
              )}
              {!user ? (
                  <>
                      <Link to="/register" className="text-gray-600 hover:text-nature-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Register</Link>
                      <Link to="/login" className="bg-nature-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-nature-700 transition-colors shadow-sm hover:shadow-md">Login</Link>
                  </>
              ) : (
                  <div className="flex items-center gap-3">
                      <div className="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-2 rounded-md border border-gray-100">
                          {user.name}
                      </div>
                      <button 
                          onClick={handleLogout}
                          className="flex items-center gap-1.5 text-sm font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-md transition-colors border border-red-100"
                      >
                          <LogOut className="w-4 h-4" />
                          Logout
                      </button>
                  </div>
              )}
            </div>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-nature-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nature-500 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden animate-fade-in-down">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-100 shadow-lg">
            <Link to="/dashboard" className="text-gray-600 hover:text-nature-600 block px-3 py-2 rounded-md text-base font-medium">Live Dashboard</Link>
            <Link to="/report" className="text-gray-600 hover:text-nature-600 block px-3 py-2 rounded-md text-base font-medium">Report Incident</Link>
            {!user ? (
                <Link to="/login" className="bg-nature-50 text-nature-700 block px-3 py-2 rounded-md text-base font-medium">Login</Link>
            ) : (
                <button onClick={handleLogout} className="w-full text-left text-red-600 hover:bg-red-50 block px-3 py-2 rounded-md text-base font-medium">Logout</button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
