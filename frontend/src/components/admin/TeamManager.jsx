import React, { useState, useEffect } from 'react';

export const TeamManager = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        category: 'core',
        image_url: '',
        profile_link: ''
    });

    const token = localStorage.getItem('access_token');

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API}/team/`);
            const data = await response.json();
            setMembers(data);
        } catch (error) {
            console.error('Error fetching team members:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editMode ? `${API}/team/${currentId}` : `${API}/team/`;
            const method = editMode ? 'PUT' : 'POST';

            // Handle optional fields
            const payload = { ...formData };
            if (!payload.image_url) delete payload.image_url;
            if (!payload.profile_link) delete payload.profile_link;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                fetchMembers();
                resetForm();
            } else {
                alert('Failed to save team member');
            }
        } catch (error) {
            console.error('Error saving team member:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            try {
                const response = await fetch(`${API}/team/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    fetchMembers();
                } else {
                    alert('Failed to delete member');
                }
            } catch (error) {
                console.error('Error deleting member:', error);
            }
        }
    };

    const handleEdit = (member) => {
        setEditMode(true);
        setCurrentId(member.id);
        setFormData({
            name: member.name,
            role: member.role,
            category: member.category,
            image_url: member.image_url || '',
            profile_link: member.profile_link || ''
        });
    };

    const resetForm = () => {
        setEditMode(false);
        setCurrentId(null);
        setFormData({
            name: '',
            role: '',
            category: 'core',
            image_url: '',
            profile_link: ''
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Manage Team</h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">{editMode ? 'Edit Member' : 'Add New Member'}</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--c-primary)] outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--c-primary)] outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--c-primary)] outline-none"
                        >
                            <option value="convenor">Convenor</option>
                            <option value="core">Core Team</option>
                            <option value="extended">Extended Team</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Link (Optional)</label>
                        <input
                            type="url"
                            name="profile_link"
                            value={formData.profile_link}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--c-primary)] outline-none"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL (Optional)</label>
                        <input
                            type="text"
                            name="image_url"
                            value={formData.image_url}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--c-primary)] outline-none"
                        />
                    </div>
                    <div className="md:col-span-2 flex gap-3">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[var(--c-primary)] text-white font-bold rounded-lg hover:brightness-90 transition-all"
                        >
                            {editMode ? 'Update Member' : 'Add Member'}
                        </button>
                        {editMode && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200 transition-all"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map(member => (
                    <div key={member.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 group">
                        <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                            {member.image_url ? (
                                <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-2xl">👤</div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-800 truncate">{member.name}</h4>
                            <p className="text-sm text-[var(--c-primary)] truncate">{member.role}</p>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{member.category}</span>
                        </div>
                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEdit(member)}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M20.548 3.452a1.542 1.542 0 0 1 0 2.182l-7.636 7.636-3.273 1.091 1.091-3.273 7.636-7.636a1.542 1.542 0 0 1 2.182 0zM4 21h15a1 1 0 0 0 1-1v-8a1 1 0 0 0-2 0v7H5V6h7a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDelete(member.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
