import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  LogOut, 
  Users, 
  Settings, 
  Ban, 
  Check,
  RefreshCw,
  PlayCircle,
  CheckCircle,
  XCircle 
} from 'lucide-react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newApiLimit, setNewApiLimit] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://emailservice-app-backend-1.onrender.com/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const setUserApiLimit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://emailservice-app-backend-1.onrender.com/admin/set-user-limit', {
        user_id: selectedUser,
        api_usage_limit: newApiLimit
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('API Limit Updated');
      fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      toast.error('Failed to set API limit');
    }
  };

  const disableUserApi = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://emailservice-app-backend-1.onrender.com/admin/disable-user', {
        user_id: userId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('User API Access Disabled');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to disable user API');
    }
  };

  const enableUserApi = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://emailservice-app-backend-1.onrender.com/admin/enable-user', {
        user_id: userId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('User API Access Enabled');
      fetchUsers();
    } catch (error) {
      toast.error('Failed to enable user API');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/Auth';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-400 flex items-center">
          <Users className="mr-3" /> Admin Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={fetchUsers}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw className="mr-2" /> Refresh
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="mr-2" /> Logout
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-xl p-6">
        <h2 className="text-2xl mb-6 text-indigo-300 flex items-center">
          <Settings className="mr-3" /> User Management
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-3 text-indigo-300">Email</th>
                <th className="p-3 text-indigo-300">API Usage</th>
                <th className="p-3 text-indigo-300">API Status</th>
                <th className="p-3 text-indigo-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">
                    <div className="flex items-center">
                      <div 
                        className="h-2 w-2 rounded-full mr-2"
                        style={{
                          backgroundColor: 
                            (user.current_usage / user.api_usage_limit) > 0.8 ? 'red' : 
                            (user.current_usage / user.api_usage_limit) > 0.5 ? 'yellow' : 'green'
                        }}
                      />
                      {user.current_usage || 0}/{user.api_usage_limit || 0}
                    </div>
                  </td>
                  <td className="p-3">
                    {user.api_usage_disabled ? (
                      <div className="flex items-center text-red-500">
                        <XCircle className="mr-2" /> Inactive
                      </div>
                    ) : (
                      <div className="flex items-center text-green-500">
                        <CheckCircle className="mr-2" /> Active
                      </div>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedUser(user._id)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition-colors"
                      >
                        Set Limit
                      </button>
                      {user.api_usage_disabled ? (
                        <button 
                          onClick={() => enableUserApi(user._id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center transition-colors"
                        >
                          <PlayCircle className="mr-2" /> Enable
                        </button>
                      ) : (
                        <button 
                          onClick={() => disableUserApi(user._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                        >
                          Disable
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <div className="mt-6 bg-gray-700 p-4 rounded-lg">
            <h3 className="text-xl mb-4 text-indigo-300">Set API Limit</h3>
            <div className="flex items-center">
              <input 
                type="number"
                onChange={(e) => setNewApiLimit(parseInt(e.target.value))}
                placeholder="New API Limit"
                className="mr-4 p-2 border rounded bg-gray-600 text-white"
              />
              <button 
                onClick={setUserApiLimit}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center transition-colors"
              >
                <Check className="mr-2" /> Update Limit
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer 
        position="bottom-right"
        theme="dark"
      />
    </div>
  );
};

export default AdminDashboard;