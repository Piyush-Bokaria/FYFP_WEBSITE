import { useState, useEffect } from 'react';

export const Team = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await fetch('/api/team/');
                if (!response.ok) {
                    throw new Error('Failed to fetch team members');
                }
                const data = await response.json();
                setTeamMembers(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeam();
    }, []);

    const convenor = teamMembers.find(m => m.category === 'convenor');
    const coreMembers = teamMembers.filter(m => m.category === 'core');
    // For now assuming all non-core/non-convenor are the second grid, which was multimedia/PR
    const extendedMembers = teamMembers.filter(m => m.category === 'extended');

    if (loading) return <div className="text-center py-24 text-[var(--c-primary)] font-bold">Loading team...</div>;
    if (error) return <div className="text-center py-24 text-red-500 font-bold">Error: {error}</div>;

    return (
        <section id="team" className="team py-24 bg-[var(--c-bg-main)]">
            <div className="container max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-[3rem] text-[var(--c-text-main)] font-[800] uppercase tracking-tight mb-4">Meet Our Team</h2>
                </div>

                {convenor && (
                    <div className="flex justify-center mb-12">
                        <div className="team-member bg-white p-10 rounded-3xl shadow-card hover:shadow-hover text-center group transition-all duration-300 max-w-sm w-full transform hover:-translate-y-2">
                            <div className="member-photo w-[200px] h-[200px] bg-gray-50 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl group-hover:bg-[var(--c-secondary)]/20 transition-colors shadow-inner">
                                <div className="placeholder-photo flex items-center justify-center w-full h-full overflow-hidden rounded-full">
                                    {convenor.image_url ? (
                                        <img src={convenor.image_url} alt={convenor.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="opacity-50">👤</span>
                                    )}
                                </div>
                            </div>
                            {convenor.profile_link ? (
                                <a href={convenor.profile_link} target="_blank" rel="noopener noreferrer">
                                    <h3 className="text-[1.5rem] font-[800] text-[var(--c-text-main)] mb-1">{convenor.name}</h3>
                                    <p className="member-role font-medium text-[var(--c-primary)] mb-4 uppercase tracking-wider text-sm">{convenor.role}</p>
                                </a>
                            ) : (
                                <>
                                    <h3 className="text-[1.5rem] font-[800] text-[var(--c-text-main)] mb-1">{convenor.name}</h3>
                                    <p className="member-role font-medium text-[var(--c-primary)] mb-4 uppercase tracking-wider text-sm">{convenor.role}</p>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {coreMembers.map((member, index) => (
                        <div key={index} className="team-member bg-white p-8 rounded-3xl shadow-card hover:shadow-hover text-center group transition-all duration-300">
                            <div className="member-photo w-[140px] h-[140px] bg-gray-50 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl group-hover:bg-[var(--c-secondary)]/20 transition-colors shadow-inner">
                                <div className="placeholder-photo flex items-center justify-center w-full h-full overflow-hidden rounded-full">
                                    {member.image_url ? (
                                        <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="opacity-50">👤</span>
                                    )}
                                </div>
                            </div>
                            <h3 className="text-[1.25rem] font-[800] text-[var(--c-text-main)] mb-1">{member.name}</h3>
                            <p className="member-role font-medium text-[var(--c-primary)] mb-4 uppercase tracking-wider text-xs">{member.role}</p>
                        </div>
                    ))}
                </div>

                <div className="team-grid-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 mt-8">
                    {extendedMembers.map((member, index) => (
                        <div key={index} className={`team-member bg-white p-8 rounded-3xl shadow-card hover:shadow-hover text-center group transition-all duration-300 lg:col-span-2 ${index === 0 ? 'lg:col-start-2' : ''}`}>
                            <div className="member-photo w-[140px] h-[140px] bg-gray-50 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl group-hover:bg-[var(--c-secondary)]/20 transition-colors shadow-inner">
                                <div className="placeholder-photo flex items-center justify-center w-full h-full overflow-hidden rounded-full">
                                    {member.image_url ? (
                                        <img src={member.image_url} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="opacity-50">👤</span>
                                    )}
                                </div>
                            </div>
                            <h3 className="text-[1.25rem] font-[800] text-[var(--c-text-main)] mb-1">{member.name}</h3>
                            <p className="member-role font-medium text-[var(--c-primary)] mb-4 uppercase tracking-wider text-xs">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
