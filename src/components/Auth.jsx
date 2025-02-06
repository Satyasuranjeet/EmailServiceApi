import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { 
  Mail, 
  Lock, 
  UserPlus, 
  LogIn, 
  ShieldCheck,
  Loader2 
} from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const [isRegistration, setIsRegistration] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    verification_code: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      const response = await axios.post('https://emailservice-app-backend-1.onrender.com/register', {
        email: formData.email,
        password: formData.password
      });
      toast.success(response.data.message);
      setIsVerification(true);
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await axios.post('https://emailservice-app-backend-1.onrender.com/verify', {
        email: formData.email,
        verification_code: formData.verification_code
      });
      toast.success(response.data.message);
      setIsVerification(false);
      setIsRegistration(false);
    } catch (error) {
      toast.error(error.response?.data?.error || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await axios.post('https://emailservice-app-backend-1.onrender.com/login', {
        email: formData.email,
        password: formData.password
      });

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('user_role', response.data.user_role);

      if (response.data.user_role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    if (isVerification) {
      return (
        <form 
          className="space-y-6 w-full" 
          onSubmit={handleVerification}
        >
          <div className="relative">
            <label 
              htmlFor="verification_code" 
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              Verification Code
            </label>
            <div className="flex items-center">
              <ShieldCheck className="absolute left-3 text-gray-400" />
              <input
                type="text"
                name="verification_code"
                id="verification_code"
                value={formData.verification_code}
                onChange={handleInputChange}
                className="pl-10 w-full p-3 bg-gray-700 border-gray-600 text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter verification code"
                required
                disabled={isLoading}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 animate-spin" /> Verifying...
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2" /> Verify Email
              </>
            )}
          </button>
        </form>
      );
    }

    return (
      <form 
        className="space-y-6 w-full" 
        onSubmit={isRegistration ? handleRegistration : handleLogin}
      >
        <div className="relative">
          <label 
            htmlFor="email" 
            className="block mb-2 text-sm font-medium text-gray-200"
          >
            Email Address
          </label>
          <div className="flex items-center">
            <Mail className="absolute left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="pl-10 w-full p-3 bg-gray-700 border-gray-600 text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="name@company.com"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="relative">
          <label 
            htmlFor="password" 
            className="block mb-2 text-sm font-medium text-gray-200"
          >
            Password
          </label>
          <div className="flex items-center">
            <Lock className="absolute left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="pl-10 w-full p-3 bg-gray-700 border-gray-600 text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-5 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 animate-spin" /> 
              {isRegistration ? "Creating Account..." : "Signing In..."}
            </>
          ) : isRegistration ? (
            <>
              <UserPlus className="mr-2" /> Create Account
            </>
          ) : (
            <>
              <LogIn className="mr-2" /> Login
            </>
          )}
        </button>
        <div className="text-sm font-medium text-gray-300 text-center">
          {isRegistration
            ? "Already have an account?"
            : "Not registered yet?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegistration(!isRegistration)}
            disabled={isLoading}
            className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRegistration ? "Sign in" : "Create account"}
          </button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <ToastContainer theme="dark" />
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <div className="hidden md:flex items-center justify-center bg-indigo-600 p-12">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">
              {isRegistration ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-indigo-100">
              {isRegistration 
                ? "Sign up and start your journey" 
                : "Login to access your dashboard"}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-white text-center">
              {isVerification 
                ? "Verify Your Email" 
                : (isRegistration ? "Register" : "Sign In")}
            </h2>
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
