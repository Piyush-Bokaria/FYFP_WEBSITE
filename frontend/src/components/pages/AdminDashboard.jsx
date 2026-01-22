import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventManager } from '../admin/EventManager';
import { CalendarManager } from '../admin/CalendarManager';
import { TeamManager } from '../admin/TeamManager';
import { GalleryManager } from '../admin/GalleryManager';

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('events');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/admin');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'events':
                return <EventManager />;
            case 'calendar':
                return <CalendarManager />;
            case 'team':
                return <TeamManager />;
            case 'gallery':
                return <GalleryManager />;
            default:
                return <EventManager />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl font-bold text-[var(--c-text-main)]">FYFP Admin</h1>
                    <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">LIVE</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 font-medium transition-colors"
                >
                    Logout
                </button>
            </header>

            <div className="flex flex-1 flex-col md:flex-row h-full">
                {/* Sidebar */}
                <aside className="w-full md:w-64 bg-white border-r border-gray-200 md:min-h-[calc(100vh-64px)] overflow-y-auto">
                    <nav className="p-4 space-y-2">
                        {[
                            { id: 'events', label: 'Events' },
                            { id: 'calendar', label: 'Calendar' },
                            { id: 'team', label: 'Team Members' },
                            { id: 'gallery', label: 'Gallery' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${activeTab === item.id
                                        ? 'bg-[var(--c-primary)] text-white shadow-md'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto w-full">
                    <div className="max-w-6xl mx-auto">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};
