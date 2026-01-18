export const Team = () => {
    return (
        <section id="team" className="team py-24 bg-[var(--c-bg-main)]">
            <div className="container max-w-[1400px] mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-[3rem] text-[var(--c-text-main)] font-[800] uppercase tracking-tight mb-4">Meet Our Team</h2>
                </div>

                <div className="team-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { name: 'L. Prasanth', role: 'President' },
                        { name: 'K V Navadeep Kumar', role: 'Secretary' },
                        { name: 'K.Bharat', role: 'Treasurer' }
                    ].map((member, index) => (
                        <div key={index} className="team-member bg-white p-8 rounded-3xl shadow-card hover:shadow-hover text-center group transition-all duration-300">
                            <div className="member-photo w-[140px] h-[140px] bg-gray-50 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl group-hover:bg-[var(--c-secondary)]/20 transition-colors shadow-inner">
                                <div className="placeholder-photo opacity-50">👤</div>
                            </div>
                            <h3 className="text-[1.25rem] font-[800] text-[var(--c-text-main)] mb-1">{member.name}</h3>
                            <p className="member-role font-medium text-[var(--c-primary)] mb-4 uppercase tracking-wider text-xs">{member.role}</p>
                        </div>
                    ))}
                </div>

                <div className="team-grid-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8">
                    {[
                        { name: 'S.Vennela', role: 'Multimedia Design Head' },
                        { name: 'K.Hima Bindu', role: 'PR & Outreach' }
                    ].map((member, index) => (
                        <div key={index} className={`team-member bg-white p-8 rounded-3xl shadow-card hover:shadow-hover text-center group transition-all duration-300 lg:col-span-2 ${index === 0 ? 'lg:col-start-2' : ''}`}>
                            <div className="member-photo w-[140px] h-[140px] bg-gray-50 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl group-hover:bg-[var(--c-secondary)]/20 transition-colors shadow-inner">
                                <div className="placeholder-photo opacity-50">👤</div>
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
