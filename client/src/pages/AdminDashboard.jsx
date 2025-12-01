import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Users, Activity, Settings, LogOut, Shield, Moon, Sun, Bell, User, Save, Trash2, Edit, X } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // New State for Tabs and Theme
    const [activeTab, setActiveTab] = useState('dashboard');
    const [darkMode, setDarkMode] = useState(true);

    // Settings State
    const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' });
    const [notifications, setNotifications] = useState({ email: true, sms: false });

    // User Management State
    const [editingUser, setEditingUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleDeleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                await axios.delete(`http://localhost:5000/api/auth/users/${userId}`, config);
                setUsers(users.filter((u) => u._id !== userId));
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Failed to delete user");
            }
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `http://localhost:5000/api/auth/users/${editingUser._id}`,
                { name: editingUser.name, email: editingUser.email, role: editingUser.role },
                config
            );
            setUsers(users.map((u) => (u._id === data._id ? data : u)));
            setShowEditModal(false);
            setEditingUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user");
        }
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                const { data } = await axios.get('http://localhost:5000/api/auth/users', config);
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };

        if (user && (activeTab === 'users' || activeTab === 'dashboard')) {
            fetchUsers();
        }
    }, [user, activeTab]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleTheme = () => setDarkMode(!darkMode);

    const theme = {
        bg: darkMode ? 'bg-gray-900' : 'bg-gray-100',
        text: darkMode ? 'text-white' : 'text-gray-900',
        cardBg: darkMode ? 'bg-gray-800' : 'bg-white',
        cardBorder: darkMode ? 'border-gray-700' : 'border-gray-200',
        sidebarBg: darkMode ? 'bg-gray-800' : 'bg-white',
        sidebarBorder: darkMode ? 'border-gray-700' : 'border-gray-200',
        headerBg: darkMode ? 'bg-gray-800' : 'bg-white',
        inputBg: darkMode ? 'bg-gray-700' : 'bg-gray-50',
        inputText: darkMode ? 'text-white' : 'text-gray-900',
        subText: darkMode ? 'text-gray-400' : 'text-gray-500',
        hoverBg: darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
    };

    return (
        <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans transition-colors duration-300`}>
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 ${theme.sidebarBg} border-r ${theme.sidebarBorder} shadow-2xl z-50 hidden md:block transition-colors duration-300`}>
                <div className={`flex items-center justify-center h-20 border-b ${theme.sidebarBorder}`}>
                    <h1 className="text-2xl font-bold text-green-500 flex items-center gap-2">
                        <Shield size={28} /> Cropin Admin
                    </h1>
                </div>
                <nav className="mt-10 px-4 space-y-4">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-green-600 text-white shadow-lg scale-105' : `${theme.subText} ${theme.hoverBg}`}`}
                    >
                        <Activity size={20} className="mr-3" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === 'users' ? 'bg-green-600 text-white shadow-lg scale-105' : `${theme.subText} ${theme.hoverBg}`}`}
                    >
                        <div className="flex items-center">
                            <Users size={20} className="mr-3" />
                            User Management
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${activeTab === 'users' ? 'bg-white text-green-600' : 'bg-gray-200 text-gray-600'}`}>
                            {users.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeTab === 'settings' ? 'bg-green-600 text-white shadow-lg scale-105' : `${theme.subText} ${theme.hoverBg}`}`}
                    >
                        <Settings size={20} className="mr-3" />
                        Settings
                    </button>
                </nav>
                <div className="absolute bottom-10 w-full px-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-md transition-colors"
                    >
                        <LogOut size={20} className="mr-3" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="md:ml-64 min-h-screen transition-colors duration-300">
                {/* Header */}
                <header className={`${theme.headerBg} shadow-md h-20 flex items-center justify-between px-8 border-b ${theme.cardBorder} transition-colors duration-300`}>
                    <h2 className={`text-xl font-semibold ${theme.text}`}>
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </h2>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className={`p-2 rounded-full ${theme.hoverBg} transition-colors`}>
                            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-600" />}
                        </button>
                        <div className="text-right">
                            <p className={`text-sm ${theme.subText}`}>Welcome back,</p>
                            <p className={`font-bold ${theme.text}`}>{user?.name || 'Admin'}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg overflow-hidden">
                            {user?.profilePicture ? (
                                <img src={`http://localhost:5000${user.profilePicture}`} alt="Profile" className="h-full w-full object-cover" />
                            ) : (
                                user?.name?.charAt(0) || 'A'
                            )}
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-8">
                    {activeTab === 'dashboard' && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            {/* Stat Card 1: Total Users */}
                            <div className={`${theme.cardBg} rounded-2xl p-6 shadow-xl border ${theme.cardBorder} relative overflow-hidden group hover:border-green-500 transition-all`}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Users size={100} className="text-green-500" />
                                </div>
                                <h3 className={`${theme.subText} text-sm font-medium uppercase tracking-wider`}>Total Users</h3>
                                <p className={`text-4xl font-bold ${theme.text} mt-2`}>{loading ? '...' : users.length}</p>
                                <p className="text-green-500 text-sm mt-4 flex items-center">
                                    <span className="bg-green-500/20 px-2 py-1 rounded-md mr-2">Registered</span> accounts
                                </p>
                            </div>

                            {/* Stat Card 2: Farmers */}
                            <div className={`${theme.cardBg} rounded-2xl p-6 shadow-xl border ${theme.cardBorder} relative overflow-hidden group hover:border-blue-500 transition-all`}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Activity size={100} className="text-blue-500" />
                                </div>
                                <h3 className={`${theme.subText} text-sm font-medium uppercase tracking-wider`}>Farmers</h3>
                                <p className={`text-4xl font-bold ${theme.text} mt-2`}>
                                    {loading ? '...' : users.filter(u => u.role === 'farmer').length}
                                </p>
                                <p className="text-blue-500 text-sm mt-4 flex items-center">
                                    <span className="bg-blue-500/20 px-2 py-1 rounded-md mr-2">Active</span> producers
                                </p>
                            </div>

                            {/* Stat Card 3: Admins */}
                            <div className={`${theme.cardBg} rounded-2xl p-6 shadow-xl border ${theme.cardBorder} relative overflow-hidden group hover:border-purple-500 transition-all`}>
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Shield size={100} className="text-purple-500" />
                                </div>
                                <h3 className={`${theme.subText} text-sm font-medium uppercase tracking-wider`}>Admins</h3>
                                <p className={`text-4xl font-bold ${theme.text} mt-2`}>
                                    {loading ? '...' : users.filter(u => u.role === 'admin').length}
                                </p>
                                <p className="text-purple-500 text-sm mt-4 flex items-center">
                                    <span className="bg-purple-500/20 px-2 py-1 rounded-md mr-2">System</span> managers
                                </p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'users' && (
                        <div className={`${theme.cardBg} rounded-2xl shadow-xl border ${theme.cardBorder} overflow-hidden`}>
                            <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
                                <div>
                                    <h3 className={`text-lg font-bold ${theme.text}`}>User Directory</h3>
                                    <p className={`text-sm ${theme.subText}`}>Manage all registered users</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                                        Export CSV
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border-b ${theme.cardBorder}`}>
                                            <th className={`p-4 text-sm font-semibold ${theme.subText}`}>User</th>
                                            <th className={`p-4 text-sm font-semibold ${theme.subText}`}>Role</th>
                                            <th className={`p-4 text-sm font-semibold ${theme.subText}`}>Email</th>
                                            <th className={`p-4 text-sm font-semibold ${theme.subText}`}>Status</th>
                                            <th className={`p-4 text-sm font-semibold ${theme.subText}`}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700/50">
                                        {users.map((user) => (
                                            <tr key={user._id} className={`${theme.hoverBg} transition-colors`}>
                                                <td className="p-4 flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                                                        {user.profilePicture ? (
                                                            <img src={`http://localhost:5000${user.profilePicture}`} alt="Profile" className="h-full w-full object-cover rounded-full" />
                                                        ) : (
                                                            user.name?.charAt(0) || 'U'
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className={`font-medium ${theme.text}`}>{user.name}</p>
                                                        <p className="text-xs text-gray-500">ID: {user._id.slice(-6)}</p>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                                                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                                                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                                        }`}>
                                                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                                    </span>
                                                </td>
                                                <td className={`p-4 text-sm ${theme.subText}`}>{user.email}</td>
                                                <td className="p-4">
                                                    <span className="flex items-center gap-2 text-sm text-green-400">
                                                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                                        Active
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => {
                                                                setEditingUser(user);
                                                                setShowEditModal(true);
                                                            }}
                                                            className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                                                            title="Edit User"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteUser(user._id)}
                                                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Edit User Modal */}
                    {showEditModal && editingUser && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                            <div className={`${theme.cardBg} rounded-2xl shadow-xl max-w-md w-full p-6 border ${theme.cardBorder}`}>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className={`text-xl font-bold ${theme.text}`}>Edit User</h3>
                                    <button
                                        onClick={() => setShowEditModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                                <form onSubmit={handleUpdateUser} className="space-y-4">
                                    <div>
                                        <label className={`block text-sm font-medium ${theme.subText} mb-1`}>Name</label>
                                        <input
                                            type="text"
                                            value={editingUser.name}
                                            onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                            className={`w-full px-4 py-2 rounded-lg border ${theme.cardBorder} ${theme.inputBg} ${theme.inputText} focus:outline-none focus:border-green-500`}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium ${theme.subText} mb-1`}>Email</label>
                                        <input
                                            type="email"
                                            value={editingUser.email}
                                            onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                            className={`w-full px-4 py-2 rounded-lg border ${theme.cardBorder} ${theme.inputBg} ${theme.inputText} focus:outline-none focus:border-green-500`}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className={`block text-sm font-medium ${theme.subText} mb-1`}>Role</label>
                                        <select
                                            value={editingUser.role}
                                            onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                            className={`w-full px-4 py-2 rounded-lg border ${theme.cardBorder} ${theme.inputBg} ${theme.inputText} focus:outline-none focus:border-green-500`}
                                        >
                                            <option value="user">User</option>
                                            <option value="farmer">Farmer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className="flex justify-end gap-3 mt-6">
                                        <button
                                            type="button"
                                            onClick={() => setShowEditModal(false)}
                                            className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    {activeTab === 'settings' && (
                        <div className="max-w-4xl mx-auto space-y-6">
                            {/* Appearance Settings */}
                            <div className={`${theme.cardBg} rounded-2xl shadow-xl border ${theme.cardBorder} p-6`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-blue-500/20 rounded-lg text-blue-500">
                                        <Sun size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold ${theme.text}`}>Appearance</h3>
                                        <p className={`text-sm ${theme.subText}`}>Customize how the admin panel looks</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-700/50 bg-gray-900/20">
                                    <div className="flex items-center gap-3">
                                        {darkMode ? <Moon size={20} className="text-purple-400" /> : <Sun size={20} className="text-yellow-500" />}
                                        <span className={`font-medium ${theme.text}`}>Dark Mode</span>
                                    </div>
                                    <button
                                        onClick={toggleTheme}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${darkMode ? 'bg-green-500' : 'bg-gray-400'}`}
                                    >
                                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            </div>

                            {/* Profile Settings */}
                            <div className={`${theme.cardBg} rounded-2xl shadow-xl border ${theme.cardBorder} p-6`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-green-500/20 rounded-lg text-green-500">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold ${theme.text}`}>Profile Settings</h3>
                                        <p className={`text-sm ${theme.subText}`}>Update your personal information</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-700 border-2 border-green-500">
                                            {user?.profilePicture ? (
                                                <img src={`http://localhost:5000${user.profilePicture}`} alt="Profile" className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-white font-bold text-xl bg-gradient-to-tr from-green-400 to-blue-500">
                                                    {user?.name?.charAt(0) || 'A'}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className={`block text-sm font-medium ${theme.subText} mb-1`}>Profile Picture</label>
                                            <input
                                                type="file"
                                                onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    const formData = new FormData();
                                                    formData.append('image', file);
                                                    try {
                                                        const config = {
                                                            headers: {
                                                                'Content-Type': 'multipart/form-data',
                                                                Authorization: `Bearer ${user.token}`,
                                                            },
                                                        };
                                                        await axios.post('http://localhost:5000/api/upload', formData, config);
                                                        alert('Image uploaded successfully!');
                                                        window.location.reload();
                                                    } catch (error) {
                                                        console.error(error);
                                                        alert('Upload failed');
                                                    }
                                                }}
                                                className={`block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4
                                                    file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-green-50 file:text-green-700
                                                    hover:file:bg-green-100
                                                `}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className={`block text-sm font-medium ${theme.subText} mb-1`}>Full Name</label>
                                            <input
                                                type="text"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                className={`w-full px-4 py-2 rounded-lg border ${theme.cardBorder} ${theme.inputBg} ${theme.inputText} focus:outline-none focus:border-green-500`}
                                            />
                                        </div>
                                        <div>
                                            <label className={`block text-sm font-medium ${theme.subText} mb-1`}>Email Address</label>
                                            <input
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                className={`w-full px-4 py-2 rounded-lg border ${theme.cardBorder} ${theme.inputBg} ${theme.inputText} focus:outline-none focus:border-green-500`}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                                            <Save size={18} className="mr-2" />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Notification Settings */}
                            <div className={`${theme.cardBg} rounded-2xl shadow-xl border ${theme.cardBorder} p-6`}>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 bg-purple-500/20 rounded-lg text-purple-500">
                                        <Bell size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`text-lg font-bold ${theme.text}`}>Notifications</h3>
                                        <p className={`text-sm ${theme.subText}`}>Manage your alert preferences</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-700/50 bg-gray-900/20">
                                        <div>
                                            <h4 className={`font-medium ${theme.text}`}>Email Alerts</h4>
                                            <p className={`text-xs ${theme.subText}`}>Receive daily summaries and critical alerts</p>
                                        </div>
                                        <button
                                            onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.email ? 'bg-green-500' : 'bg-gray-400'}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.email ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-700/50 bg-gray-900/20">
                                        <div>
                                            <h4 className={`font-medium ${theme.text}`}>SMS Notifications</h4>
                                            <p className={`text-xs ${theme.subText}`}>Get instant text messages for urgent issues</p>
                                        </div>
                                        <button
                                            onClick={() => setNotifications({ ...notifications, sms: !notifications.sms })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications.sms ? 'bg-green-500' : 'bg-gray-400'}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications.sms ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
