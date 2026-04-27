import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, ArrowRight, Lock } from 'lucide-react';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile_number: mobile, password: password, role: role }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
        setErrorMsg(data.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
        console.error("Login failed", error);
        setErrorMsg("Failed to connect to the server. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nature-50 via-gray-50 to-gray-100">
      <div className="absolute inset-0 z-0 overflow-hidden">
         <div className="absolute -top-[30%] -left-[10%] w-[70vh] h-[70vh] rounded-full bg-nature-200/30 blur-3xl" />
         <div className="absolute top-[20%] -right-[10%] w-[60vh] h-[60vh] rounded-full bg-nature-300/20 blur-3xl" />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50 z-10 relative">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-nature-100 rounded-full flex items-center justify-center mb-6">
            <Phone className="h-8 w-8 text-nature-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-3 text-gray-600">
            Sign in to access the <span className="font-semibold text-nature-700">WildAlert</span> dashboard.
          </p>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 animate-in fade-in slide-in-from-top-2 rounded-xl bg-red-50 border border-red-200 text-sm font-medium text-red-600 text-center shadow-sm">
            {errorMsg}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="mobile-number" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-nature-500 transition-colors" />
                </div>
                <input
                  id="mobile-number"
                  name="mobile"
                  type="tel"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nature-500/50 focus:border-nature-500 transition-all shadow-sm"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-nature-500 transition-colors" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nature-500/50 focus:border-nature-500 transition-all shadow-sm"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am logging in as a...
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === 'student'}
                    onChange={(e) => setRole(e.target.value)}
                    className="text-nature-600 focus:ring-nature-500 focus:ring-2 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-gray-700 font-medium">Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="staff"
                    checked={role === 'staff'}
                    onChange={(e) => setRole(e.target.value)}
                    className="text-nature-600 focus:ring-nature-500 focus:ring-2 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-gray-700 font-medium">Staff Member</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer ml-auto">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={(e) => setRole(e.target.value)}
                    className="text-nature-600 focus:ring-nature-500 focus:ring-2 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-gray-500 font-medium text-xs uppercase tracking-wider">Admin</span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-nature-600 hover:bg-nature-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nature-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-nature-600/30 transform hover:-translate-y-0.5"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-4">
              <ArrowRight className="h-5 w-5 text-nature-200 group-hover:text-white transition-colors" />
            </span>
            {loading ? 'Signing in...' : 'Sign In to Dashboard'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-nature-600 hover:text-nature-500 transition-colors">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
