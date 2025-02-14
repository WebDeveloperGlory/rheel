import React, { useState } from 'react';
import { Eye, Loader2, EyeOff } from 'lucide-react';
import horizon from '../assets/images/horizon.png';
import bg from '../assets/images/bg.png';
import { login } from '../api/sign in/requests';
import logo from '../assets/images/logo.png'

const SignInPage = () => {
  const [formData, setFormData] = useState({ email: '', pswd: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // New state for checkbox

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(formData, rememberMe);
      console.log('Login successful:', response);
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid credentials. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Left Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 md:bg-white bg-[#F1F1F1]">
        <div className="w-full max-w-md bg-white p-5 md:p-0 shadow-md md:shadow-none">
          <img src={logo} alt="" className='md:hidden mx-auto mb-2' />
          <h1 className="text-2xl font-semibold text-green-900 mb-1 text-center md:text-start">Sign In</h1>
          <p className="text-gray-600 md:mb-1 mb-5 text-sm text-center md:text-start px-5 md:px-0">Enter your email and password to sign in!</p>

          <form className="space-y-4 " onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-green-900 mb-1.5">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="mail@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-xs placeholder:text-gray-500 outline-none"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-green-900 md:mb-1.5 mb-3">
                Password*
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="pswd"
                  value={formData.pswd}
                  onChange={handleChange}
                  placeholder="Min. 8 characters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-xs placeholder:text-gray-500 outline-none"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  checked={rememberMe}
                  onChange={handleCheckboxChange}
                />
                <span className="ml-2 text-xs text-green-900 font-semibold">Keep me logged in</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-xs text-white py-4 px-4 rounded-lg mt-3 cursor-pointer flex justify-center items-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 relative overflow-hidden hidden md:block">
        <div className="absolute inset-0">
          <img src={bg} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="bg-white rounded-full p-8 mb-8">
            <img src={horizon} alt="Rheel Logo" className="w-30 h-30" />
          </div>
          <div className="text-center border border-gray-500 rounded-[15px] px-12 py-5">
            <p className="text-sm mb-1">WELCOME ADMIN</p>
            <h2 className="text-2xl font-bold">RHELL ESTATE CONSOLE</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
