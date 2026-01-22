import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";

export const Events = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('/api/events/');
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                const formattedData = data.map(event => ({
                    ...event,
                    desc: event.description // Map backend 'description' to frontend 'desc'
                }));
                setEvents(formattedData);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event =>
        activeTab === 'upcoming' ? event.is_upcoming : !event.is_upcoming
    );

    return (
        <section id="events" className="events py-24 bg-[var(--c-bg-main)]">
            <div className="container max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-[3rem] text-[var(--c-text-main)] font-[800] uppercase tracking-tight mb-2">Events</h2>
                    <div className="w-16 h-1.5 bg-[var(--c-accent)] rounded-full mb-8"></div>

                    <div className="events-tabs flex gap-2 p-1 bg-white rounded-full shadow-sm border border-gray-100">
                        {['upcoming', 'past'].map((tab) => (
                            <button
                                key={tab}
                                className={cn(
                                    "px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all duration-300",
                                    activeTab === tab
                                        ? "bg-[var(--c-primary)] text-white shadow-md"
                                        : "bg-transparent text-[var(--c-text-light)] hover:bg-gray-50"
                                )}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab} Events
                            </button>
                        ))}
                    </div>
                </div>

                <div className="events-content grid grid-cols-1 md:grid-cols-3 gap-8">
                    {loading ? (
                        <div className="col-span-3 text-center py-12 text-[var(--c-primary)] font-bold">Loading events...</div>
                    ) : error ? (
                        <div className="col-span-3 text-center py-12 text-red-500 font-bold">Error: {error}</div>
                    ) : filteredEvents.map((event, i) => (
                        <div
                            key={i}
                            onClick={() => setSelectedEvent(event)}
                            className="event-card bg-white p-8 rounded-3xl shadow-card hover:shadow-hover transition-all duration-300 border border-transparent hover:border-[var(--c-primary)]/20 group cursor-pointer"
                        >
                            <div className="mb-6 flex justify-between items-start">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--c-secondary)]/10 text-[var(--c-text-main)] text-xs font-bold uppercase tracking-wider">
                                    {event.date}
                                </span>
                            </div>
                            <h3 className="text-[1.5rem] mb-3 font-[800] leading-tight text-[var(--c-text-main)] group-hover:text-[var(--c-primary)] transition-colors">
                                {event.title}
                            </h3>
                            <p className="text-[var(--c-text-light)] font-medium leading-relaxed line-clamp-3">
                                {event.desc}
                            </p>
                            <div className="mt-6 flex items-center text-[var(--c-primary)] font-bold text-sm uppercase tracking-wide opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                <button
                                    className="flex items-center hover:underline focus:outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedEvent(event);
                                    }}
                                >
                                    Learn More <span className="ml-2">→</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Modal
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
                title={selectedEvent?.title}
            >
                <div className="space-y-4">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--c-secondary)]/10 text-[var(--c-text-main)] text-xs font-bold uppercase tracking-wider mb-2">
                        {selectedEvent?.date}
                    </div>
                    <p className="text-lg leading-relaxed text-[var(--c-text-light)]">
                        {selectedEvent?.desc}
                    </p>
                </div>
            </Modal>
        </section>
    );
};
