import React, { useState, useEffect } from 'react';

export const EventManager = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        date: '',
        description: '',
        is_upcoming: true
    });

    const token = localStorage.getItem('access_token');

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/events/');
            const data = await response.json();
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editMode ? `/api/events/${currentId}` : '/api/events/';
            const method = editMode ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                fetchEvents();
                resetForm();
            } else {
                alert('Failed to save event');
            }
        } catch (error) {
            console.error('Error saving event:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await fetch(`/api/events/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    fetchEvents();
                } else {
                    alert('Failed to delete event');
                }
            } catch (error) {
                console.error('Error deleting event:', error);
            }
        }
    };

    const handleEdit = (event) => {
        setEditMode(true);
        setCurrentId(event.id);
        setFormData({
            title: event.title,
            date: event.date,
            description: event.description,
            is_upcoming: event.is_upcoming
        });
    };

    const resetForm = () => {
        setEditMode(false);
        setCurrentId(null);
        setFormData({
            title: '',
            date: '',
            description: '',
            is_upcoming: true
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Manage Events</h2>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">{editMode ? 'Edit Event' : 'Add New Event'}</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="md:col-span-2">
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
                            placeholder="e.g. January 24, 2026"
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--c-primary)] outline-none"
                            required
                        />
                    </div>
                    <div className="flex items-end">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                name="is_upcoming"
                                checked={formData.is_upcoming}
                                onChange={handleChange}
                                className="w-4 h-4 text-[var(--c-primary)] rounded border-gray-300 focus:ring-[var(--c-primary)]"
                            />
                            <span className="text-sm font-medium text-gray-700">Is Upcoming Event?</span>
                        </label>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--c-primary)] outline-none"
                            required
                        ></textarea>
                    </div>
                    <div className="md:col-span-2 flex gap-3">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[var(--c-primary)] text-white font-bold rounded-lg hover:brightness-90 transition-all"
                        >
                            {editMode ? 'Update Event' : 'Add Event'}
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

            <div className="grid grid-cols-1 gap-4">
                {events.map(event => (
                    <div key={event.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h4 className="font-bold text-lg text-gray-800">{event.title}</h4>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${event.is_upcoming ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                                    {event.is_upcoming ? 'Upcoming' : 'Past'}
                                </span>
                            </div>
                            <p className="text-sm text-[var(--c-primary)] font-medium mb-1">{event.date}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{event.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(event)}
                                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-bold hover:bg-blue-100 transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M20.548 3.452a1.542 1.542 0 0 1 0 2.182l-7.636 7.636-3.273 1.091 1.091-3.273 7.636-7.636a1.542 1.542 0 0 1 2.182 0zM4 21h15a1 1 0 0 0 1-1v-8a1 1 0 0 0-2 0v7H5V6h7a1 1 0 0 0 0-2H4a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => handleDelete(event.id)}
                                className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-all"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                    <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
                {events.length === 0 && !loading && (
                    <div className="text-center py-12 text-gray-400">No events found.</div>
                )}
            </div>
        </div>
    );
};
