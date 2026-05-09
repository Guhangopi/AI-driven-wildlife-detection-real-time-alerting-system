import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Phone, Lock, ArrowRight, Check } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile_number: '',
    password: '',
    role: 'student'
  });
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setRegistrationSuccess(true);
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error", error);
      alert("Failed to register. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nature-50 via-gray-50 to-gray-100">
        <div className="absolute inset-0 z-0 overflow-hidden">
           <div className="absolute -top-[30%] -left-[10%] w-[70vh] h-[70vh] rounded-full bg-nature-200/30 blur-3xl" />
           <div className="absolute top-[20%] -right-[10%] w-[60vh] h-[60vh] rounded-full bg-nature-300/20 blur-3xl" />
        </div>
        <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow-2xl border border-white/50 z-10 relative text-center">
            <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Registration Successful!</h2>
            <p className="mt-4 text-gray-600">Your account has been created. To receive instant alerts, please join our Telegram group.</p>
            
            <a href="https://t.me/+4-CZQz0YDY9hNmQ1" target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-center gap-2 w-full bg-[#0088cc] hover:bg-[#0077b5] text-white py-3.5 px-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-[#0088cc]/30">
               <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.94z"/></svg>
               Join Telegram Alerts Group
            </a>
            
            <button onClick={() => navigate('/login')} className="mt-4 w-full py-3.5 px-4 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-xl font-semibold transition-all shadow-sm">
               Proceed to Login
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-nature-50 via-gray-50 to-gray-100">
      <div className="absolute inset-0 z-0 overflow-hidden">
         <div className="absolute -top-[30%] -left-[10%] w-[70vh] h-[70vh] rounded-full bg-nature-200/30 blur-3xl" />
         <div className="absolute top-[20%] -right-[10%] w-[60vh] h-[60vh] rounded-full bg-nature-300/20 blur-3xl" />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow-2xl border border-white/50 z-10 relative">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-nature-100 rounded-full flex items-center justify-center mb-6">
            <User className="h-8 w-8 text-nature-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="mt-3 text-gray-600">
            Join <span className="font-semibold text-nature-700">WildAlert</span> to stay safe.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-nature-500 transition-colors" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nature-500/50 focus:border-nature-500 transition-all shadow-sm"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

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
                  name="mobile_number"
                  type="tel"
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nature-500/50 focus:border-nature-500 transition-all shadow-sm"
                  placeholder="Enter your mobile number"
                  value={formData.mobile_number}
                  onChange={handleChange}
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
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am registering as a...
              </label>
              <div className="flex flex-wrap gap-4 sm:gap-x-4 gap-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleChange}
                    className="text-nature-600 focus:ring-nature-500 focus:ring-2 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-gray-700 font-medium">Student</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="staff"
                    checked={formData.role === 'staff'}
                    onChange={handleChange}
                    className="text-nature-600 focus:ring-nature-500 focus:ring-2 w-4 h-4 cursor-pointer"
                  />
                  <span className="text-gray-700 font-medium">Staff Member</span>
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
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-nature-600 hover:text-nature-500 transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
