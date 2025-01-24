import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { 
  ClipboardDocumentIcon, 
  KeyIcon, 
  DocumentTextIcon, 
  ArrowLeftOnRectangleIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/solid';

const UserDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [apiDetails, setApiDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const userResponse = await axios.get('https://emailservice-app-backend-1.onrender.com/user-details', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserDetails(userResponse.data);

      const apiResponse = await axios.get('https://emailservice-app-backend-1.onrender.com/get-api-details', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApiDetails(apiResponse.data);
    } catch (error) {
      toast.error('Failed to fetch user details');
    }
  };

  const generateApiKey = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://emailservice-app-backend-1.onrender.com/generate-api-key', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('API Key Generated');
      setApiDetails(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('You can only have one API key');
      } else {
        toast.error('Failed to generate API key');
      }
    }
  };

  const refreshApiDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://emailservice-app-backend-1.onrender.com/get-api-details', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApiDetails(response.data);
      toast.success('API details refreshed');
    } catch (error) {
      toast.error('Failed to refresh API details');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/auth');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.info('Copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <ToastContainer theme="dark" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-100">Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>

        {/* User Info & API Details */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* User Info Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-200 flex items-center">
              <KeyIcon className="w-6 h-6 mr-3 text-blue-400" />
              User Information
            </h2>
            {userDetails && (
              <div className="space-y-3">
                <p className="text-gray-400">Email: 
                  <span className="ml-2 text-white">{userDetails.email}</span>
                </p>
              </div>
            )}
          </div>

          {/* API Details Card */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-200 flex items-center">
                <ClipboardDocumentIcon className="w-6 h-6 mr-3 text-green-400" />
                API Details
              </h2>
              <button
                onClick={refreshApiDetails}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded flex items-center"
              >
                <ArrowPathIcon className="w-5 h-5 mr-2" /> Refresh
              </button>
            </div>
            {apiDetails ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400">API Key</p>
                    <p className="text-white truncate max-w-[200px]">
                      {apiDetails.api_key || 'Not Generated'}
                    </p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(apiDetails.api_key)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Copy
                  </button>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-400">Usage Limit</p>
                  <p className="text-white">
                    {apiDetails.current_usage}/{apiDetails.usage_limit}
                  </p>
                </div>
                <button
                  onClick={generateApiKey}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-4"
                >
                  Generate New API Key
                </button>
              </div>
            ) : (
              <p>Loading API details...</p>
            )}
          </div>
        </div>

        {/* API Documentation */}
        <div className="bg-gray-800 rounded-xl p-8 mt-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-gray-100 flex items-center">
            <DocumentTextIcon className="w-8 h-8 mr-3 text-purple-400" />
            API Documentation
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold mb-3 text-gray-200">Endpoint</h3>
              <pre
  className="bg-gray-900 p-3 rounded text-green-400 overflow-x-auto break-all"
>
  https://emailservice-app-backend-1.onrender.com/send-email?apikey=YOUR_API_KEY
</pre>
            </div>

            <div className="bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold mb-3 text-gray-200">Request Method</h3>
              <div className="bg-gray-900 p-3 rounded text-blue-400">
                POST
              </div>
            </div>

            <div className="md:col-span-2 bg-gray-700 rounded-lg p-5">
              <h3 className="text-xl font-semibold mb-3 text-gray-200">Request Body</h3>
              <pre className="bg-gray-900 p-3 rounded text-yellow-400">
                {JSON.stringify({
                  receiver_email: "recipient@example.com",
                  subject: "Test Email",
                  message: "This is a test email."
                }, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;