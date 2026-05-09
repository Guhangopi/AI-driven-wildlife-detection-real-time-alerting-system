import React, { useEffect, useState } from 'react';
import { Users, Phone, Shield, User as UserIcon, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // Check admin authentication
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;
        if (!user || user.role !== 'admin') {
            navigate('/'); // Redirect non-admins
        } else {
            setCurrentUser(user);
            fetchUsers();
        }
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            // Note: In a real app, pass admin auth tokens
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/users`);
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        if (currentUser && currentUser.id === userId) {
            alert("Action Prevented: You cannot delete your own admin account.");
            return;
        }

        if (window.confirm(`Are you absolutely sure you want to permanently delete the user "${userName}"?`)) {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/users/${userId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setUsers(users.filter(u => u.id !== userId));
                } else {
                    const data = await response.json();
                    alert(data.error || "Failed to delete user");
                }
            } catch (error) {
                console.error("Error deleting user:", error);
                alert("Connection error while deleting user");
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh] text-gray-500">
                <div className="animate-pulse flex flex-col items-center">
                    <Users className="h-10 w-10 text-gray-300 mb-2" />
                    Loading Directory...
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                    <Users className="w-8 h-8 text-nature-600" />
                    User Directory
                </h1>
                <p className="text-gray-500 mt-2">Manage and view registered staff and students.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 whitespace-nowrap">Name</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 whitespace-nowrap">Mobile (ID)</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 whitespace-nowrap">Role</th>
                                <th className="py-4 px-6 text-sm font-semibold text-gray-600 whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map(user => (
                                <tr key={user.id} className="hover:bg-nature-50/30 transition-colors">
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-nature-100 flex items-center justify-center text-nature-600 shrink-0">
                                                <UserIcon className="w-5 h-5" />
                                            </div>
                                            <span className="font-medium text-gray-900">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                                            {user.mobile_number}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center w-max gap-1
                                            ${user.role === 'admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                                            : user.role === 'staff' ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                            : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
                                            {user.role === 'admin' && <Shield className="w-3 h-3" />}
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right whitespace-nowrap">
                                        <button
                                            onClick={() => handleDeleteUser(user.id, user.name)}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
                                            title="Delete User"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-gray-500">
                                        No users registered yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UsersList;
