import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, ArrowRight, Lock, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [mobile, setMobile] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile_number: mobile, new_password: newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMsg('Password reset successfully! You can now login.');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setErrorMsg(data.error || 'Failed to reset password.');
      }
    } catch (error) {
        console.error("Reset failed", error);
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

      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-xl p-6 sm:p-10 rounded-3xl shadow-2xl border border-white/50 z-10 relative">
        <div>
          <Link to="/login" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-nature-600 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Login
          </Link>
          <div className="mx-auto h-16 w-16 bg-nature-100 rounded-full flex items-center justify-center mb-6">
            <Lock className="h-8 w-8 text-nature-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight text-center">
            Reset Password
          </h2>
          <p className="mt-3 text-gray-600 text-center">
            Enter your registered mobile number to create a new password.
          </p>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 animate-in fade-in slide-in-from-top-2 rounded-xl bg-red-50 border border-red-200 text-sm font-medium text-red-600 text-center shadow-sm">
            {errorMsg}
          </div>
        )}
        
        {successMsg && (
          <div className="mt-4 p-3 animate-in fade-in slide-in-from-top-2 rounded-xl bg-green-50 border border-green-200 text-sm font-medium text-green-700 text-center shadow-sm">
            {successMsg}
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
                  placeholder="Enter your registered mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  disabled={successMsg !== ''}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
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
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={successMsg !== ''}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || successMsg !== ''}
            className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-nature-600 hover:bg-nature-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nature-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-nature-600/30 transform hover:-translate-y-0.5"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-4">
              <ArrowRight className="h-5 w-5 text-nature-200 group-hover:text-white transition-colors" />
            </span>
            {loading ? 'Processing...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
