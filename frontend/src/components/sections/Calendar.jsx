import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { API } from "../../config";

export const Calendar = () => {
    const [showAll, setShowAll] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const INITIAL_VISIBLE_COUNT = 5;

    const FALLBACK_CALENDAR_DATA = [
        { month: 'JULY 2025', title: 'Project Nidhesh', desc: 'Career guidance sessions for school students on competitive exams and future opportunities.' },
        { month: 'AUG 2025', title: 'Independence day Celebrations', desc: 'Conducting games and competitions for school students, along with distributing momentos, certificates to the winners.' },
        { month: 'OCT 2025', title: 'Project Kitab', desc: 'Annual event providing textbooks, notebooks, stationery, and other educational essentials to school children.' },
        { month: 'DEC 2025', title: 'Project Vakankur', desc: 'Building a greener tomorrow by engaging school students in tree plantation and environmental conservation activities.' },
        { month: 'DEC 2025', title: 'Digital Bootcamp', desc: 'A hands-on computer learning session for school students.' },
        { month: 'JAN 2026', title: 'Project Swayamika', desc: 'Empowerment sessions for female students covering menstrual health, personal safety (Good Touch-Bad Touch), and related topics.' },
        { month: 'JAN 2026', title: '15th anniversary celebrations', desc: 'Selebrating the 15th anniversary of the FYFP.' },
        { month: 'JAN 2026', title: 'Camps for Training on CPR', desc: 'Training students in CPR and first aid to prepare them for future emergencies.' },
        { month: 'JAN 2026', title: 'Republic Day Celebrations', desc: 'Presenting certificates of appreciation to final year students who volunteered with FYFP for their valuable support towards the club and its initiatives.' },
        { month: 'FEB 2026', title: 'Project Vikas', desc: 'Academic support for school students and awareness programs on various educational topics.' },
        { month: 'FEB 2026', title: 'National Science Day Celebrations', desc: 'A event focused on creating awareness and collaborating with the schools to promote innovation among the students, along helping and displaying projects at schools.' },
        { month: 'MAR 2026', title: 'Annual Day Stall', desc: 'Showcasing the achievements of the club at the annual day.' },
        { month: 'MAR 2026', title: 'Next Academic year team elections', desc: 'Elections conducted to select the team for the next academic year.' },
    ];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${API}/calendar/`);
                console.log(`${API}/calendar/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch calendar activities');
                }
                const data = await response.json();
                // Map API response to UI expected format
                const formattedData = data.map(item => ({
                    month: item.month,
                    title: item.title,
                    desc: item.description
                }));
                setEvents(formattedData);
                setError(null);
            } catch (err) {
                console.error("Using fallback data for calendar:", err);
                setEvents(FALLBACK_CALENDAR_DATA);
                setError(null); // Clear error since we have fallback
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const visibleEvents = showAll ? events : events.slice(0, INITIAL_VISIBLE_COUNT);

    if (loading) {
        return (
            <section id="calendar" className="calendar py-24 bg-white relative overflow-hidden min-h-[600px] flex items-center justify-center">
                <div className="text-[var(--c-primary)] font-bold text-xl">Loading calendar...</div>
            </section>
        );
    }

    if (error) {
        return (
            <section id="calendar" className="calendar py-24 bg-white relative overflow-hidden min-h-[600px] flex items-center justify-center">
                <div className="text-red-500 font-bold text-xl">Error: {error}</div>
            </section>
        );
    }

    return (
        <section id="calendar" className="calendar py-24 bg-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--c-secondary)]/5 via-transparent to-transparent"></div>

            <div className="container max-w-[1400px] mx-auto px-6 relative z-10">
                <div className="mb-20 text-center">
                    <h2 className="text-[3rem] text-[var(--c-text-main)] font-[800] uppercase tracking-tight mb-4">Academic Year 2025-26</h2>
                    <p className="font-medium text-[var(--c-text-light)] text-lg max-w-2xl mx-auto leading-relaxed">
                        Keeping our community connected through shared events and milestones.
                    </p>
                </div>

                <div className="relative">
                    <div className="md:hidden relative border-l-2 border-[var(--c-primary)]/20 ml-4 pl-8 space-y-12">
                        {visibleEvents.map((event, index) => (
                            <div key={index} className="relative">
                                <div className="absolute -left-[calc(2rem_+_1px)] top-0 w-4 h-4 rounded-full bg-white border-[3px] border-[var(--c-primary)]"></div>

                                <div className="bg-[var(--c-bg-main)] p-6 rounded-3xl shadow-sm border border-transparent">
                                    <div className="inline-block px-3 py-1 rounded-lg bg-[var(--c-primary)]/10 text-[var(--c-primary)] font-bold text-xs mb-3">
                                        {event.month}
                                    </div>
                                    <h4 className="font-[800] text-xl text-[var(--c-text-main)] mb-2">{event.title}</h4>
                                    <p className="text-[var(--c-text-light)] font-medium leading-relaxed">{event.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="hidden md:block">
                        {visibleEvents.map((event, index) => {
                            const isEven = index % 2 === 0;
                            const isLast = index === visibleEvents.length - 1;

                            return (
                                <div key={index} className="grid grid-cols-[1fr_100px_1fr] h-full min-h-[180px]">
                                    <div className={cn("flex flex-col justify-start py-4 pr-8", isEven ? "items-end text-right" : "")}>
                                        {isEven && (
                                            <div className="bg-[var(--c-bg-main)] p-8 rounded-3xl shadow-sm hover:shadow-card transition-all duration-300 border border-transparent hover:border-[var(--c-primary)]/10 max-w-lg w-full relative group">
                                                <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--c-primary)]/10 text-[var(--c-primary)] font-bold text-sm mb-4">
                                                    {event.month}
                                                </div>
                                                <h4 className="font-[800] text-2xl text-[var(--c-text-main)] mb-3">{event.title}</h4>
                                                <p className="text-[var(--c-text-light)] font-medium leading-relaxed">{event.desc}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="relative h-full w-full">
                                        <div className={cn(
                                            "absolute top-12 w-5 h-5 rounded-full bg-white border-[4px] border-[var(--c-primary)] z-20 shadow-sm transform transition-transform duration-300 hover:scale-150",
                                            isEven ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
                                        )}
                                        ></div>

                                        {!isLast && (
                                            <svg
                                                className="absolute top-12 w-full h-[calc(100%_+_0px)] overflow-visible"
                                                preserveAspectRatio="none"
                                                viewBox="0 0 100 100"
                                            >
                                                {isEven ? (
                                                    <path
                                                        d="M 0 0 C 0 50, 100 50, 100 100"
                                                        fill="none"
                                                        stroke="var(--c-primary)"
                                                        strokeWidth="3"
                                                        strokeOpacity="0.3"
                                                        strokeDasharray="4 4"
                                                        vectorEffect="non-scaling-stroke"
                                                    />
                                                ) : (
                                                    <path
                                                        d="M 100 0 C 100 50, 0 50, 0 100"
                                                        fill="none"
                                                        stroke="var(--c-primary)"
                                                        strokeWidth="3"
                                                        strokeOpacity="0.3"
                                                        strokeDasharray="4 4"
                                                        vectorEffect="non-scaling-stroke"
                                                    />
                                                )}
                                            </svg>
                                        )}
                                    </div>

                                    <div className={cn("flex flex-col justify-start py-4 pl-8", !isEven ? "items-start text-left" : "")}>
                                        {!isEven && (
                                            <div className="bg-[var(--c-bg-main)] p-8 rounded-3xl shadow-sm hover:shadow-card transition-all duration-300 border border-transparent hover:border-[var(--c-primary)]/10 max-w-lg w-full relative group">
                                                <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--c-primary)]/10 text-[var(--c-primary)] font-bold text-sm mb-4">
                                                    {event.month}
                                                </div>
                                                <h4 className="font-[800] text-2xl text-[var(--c-text-main)] mb-3">{event.title}</h4>
                                                <p className="text-[var(--c-text-light)] font-medium leading-relaxed">{event.desc}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {events.length > INITIAL_VISIBLE_COUNT && (
                        <div className="flex justify-center mt-20 relative z-30">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="px-10 py-4 rounded-full font-bold text-sm uppercase tracking-wide bg-[var(--c-primary)] text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ring-4 ring-white"
                            >
                                {showAll ? 'Show Less' : 'Show More'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};