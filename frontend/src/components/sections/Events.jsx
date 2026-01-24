import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { API } from "../../config";

export const Events = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const FALLBACK_EVENTS_DATA = [
        { title: "Project Nidhesh", date: "July 2025", desc: "Career guidance sessions for school students on competitive exams and future opportunities.", is_upcoming: false },
        { title: "Independence Day Celebrations", date: "August 15, 2025", desc: "Conducting games and competitions for school students, along with distributing mementos and certificates to the winners.", is_upcoming: false },
        { title: "Project Kitab", date: "October 2025", desc: "Annual event providing textbooks, notebooks, stationery, and other educational essentials to school children.", is_upcoming: false },
        { title: "Project Vakankur", date: "December 20, 2025", desc: "Building a greener tomorrow by engaging school students in tree plantation and environmental conservation activities.", is_upcoming: false },
        { title: "Project Vikas - Digital Bootcamp", date: "December 27, 2025", desc: "A hands-on computer learning session for school students from Sarika Government School.", is_upcoming: false },
        { title: "Project Swayamika", date: "January 3, 2026", desc: "Empowerment sessions for female students covering menstrual health, personal safety (Good Touch-Bad Touch), and related topics.", is_upcoming: false },
        { title: "15 Year's Anniversary", date: "January 24, 2026", desc: "Celebrating the 15th anniversary of FYFP and its journey of social impact.", is_upcoming: false },
        { title: "Republic Day Celebrations", date: "January 26, 2026", desc: "Presenting certificates of appreciation to final year students who volunteered with FYFP for their valuable support towards the club and its initiatives.", is_upcoming: true },
        { title: "Project Vikas", date: "February 2026", desc: "Academic support for school students and awareness programs on various educational topics.", is_upcoming: true },
        { title: "National Science Day", date: "February 28, 2026", desc: "An event focused on creating awareness and collaborating with schools to promote innovation among students, along with helping and displaying projects at schools.", is_upcoming: true },
        { title: "Annual Day Stall", date: "March 2026", desc: "Showcasing the achievements of the club at the annual day celebration.", is_upcoming: true },
        { title: "Next Academic Year Team Elections", date: "March 2026", desc: "Elections conducted to select the team for the next academic year.", is_upcoming: true },
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API}/events/`);
                console.log(`${API}/events`);
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                const data = await response.json();
                const formattedData = data.map(event => ({
                    ...event,
                    desc: event.description // Map backend 'description' to frontend 'desc'
                }));
                setEvents(formattedData);
                setError(null);
            } catch (err) {
                console.error("Using fallback data for events:", err);
                setEvents(FALLBACK_EVENTS_DATA);
                setError(null); // Clear error since we have fallback
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
