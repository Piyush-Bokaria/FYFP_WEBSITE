import React, { useState, useEffect } from 'react';

export const GalleryManager = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        link: '',
        image_url: ''
    });

    const token = localStorage.getItem('access_token');

    const fetchItems = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API}/gallery/`);
            const data = await response.json();
            setItems(data);
        } catch (error) {
            console.error('Error fetching gallery items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editMode ? `${API}/gallery/${currentId}` : `${API}/gallery/`;
            const method = editMode ? 'PUT' : 'POST';

            // Handle optional image_url
            const payload = { ...formData };
            if (!payload.image_url) delete payload.image_url;

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                fetchItems();
                resetForm();
            } else {
                alert('Failed to save gallery item');
            }
        } catch (error) {
            console.error('Error saving gallery item:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const response = await fetch(`$/gallery/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    fetchItems();
                } else {
                    alert('Failed to delete item');
                }
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleEdit = (item) => {
        setEditMode(true);
        setCurrentId(item.id);
        setFormData({
            title: item.title,
            date: item.date,
            link: item.link,
            image_url: item.image_url || ''
        });
    };

    const resetForm = () => {
        setEditMode(false);
        setCurrentId(null);
        setFormData({
            title: '',
            date: '',
            link: '',
            image_url: ''
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Manage Gallery</h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">{editMode ? 'Edit Item' : 'Add New Item'}</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--c-primary)] outline-none"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                            type="text"
                            name="date"
                            placeholder="e.g. JUL 2025"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--c-primary)] outline-none"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Google Drive Link / URL</label>
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--c-primary)] outline-none"
                            required
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL (Optional)</label>
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
                            {editMode ? 'Update Item' : 'Add Item'}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 group">
                        <div className="aspect-video bg-gray-100 rounded-xl mb-4 overflow-hidden flex items-center justify-center relative">
                            {item.image_url ? (
                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl opacity-30">📸</span>
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="px-3 py-1 bg-white text-blue-600 rounded text-xs font-bold"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <path d="M20.548 3.452a1.542 1.542 0 0 1 0 2.182l-7.636 7.636-3.273 1.091 1.091-3.273 7.636-7.636a1.542 1.542 0 0 1 2.182 0zM4 21h15a1 1 0 0 0 1-1v-8a1 1 0 0 0-2 0v7H5V6h7a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-3 py-1 bg-white text-red-600 rounded text-xs font-bold"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                        <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <h4 className="font-bold text-gray-800 line-clamp-1">{item.title}</h4>
                        <div className="flex justify-between items-center mt-2 text-xs">
                            <span className="font-semibold text-[var(--c-primary)] uppercase">{item.date}</span>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Link</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
