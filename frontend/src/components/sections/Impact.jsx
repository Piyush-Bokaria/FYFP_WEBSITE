export const Impact = () => {
    return (
        <section id="impact" className="impact py-24 bg-white relative">
            <div className="container max-w-[1400px] mx-auto px-6">
                <div className="mb-20 text-center">
                    <h2 className="text-[3rem] mb-6 font-[800] uppercase tracking-tight text-[var(--c-text-main)]">Our Impact</h2>
                    <p className="text-[var(--c-text-light)] max-w-2xl mx-auto text-lg">Measuring our success by the lives we touch and the communities we strengthen.</p>
                </div>

                <div className="impact-stats grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
                    {[
                        { number: '1000+', label: 'Students Benefitted', color: 'bg-teal-50' },
                        { number: '10k+', label: 'Books distributed', color: 'bg-orange-50' },
                        { number: '4 lakhs+', label: 'rupees raised through recycling', color: 'bg-blue-50' },
                        { number: '20+', label: 'Schools Benefitted', color: 'bg-yellow-50' }
                    ].map((stat, index) => (
                        <div key={index} className={`stat-card rounded-3xl p-8 text-center transition-transform hover:-translate-y-1 ${stat.color}`}>
                            <div className="stat-number text-[3rem] font-[900]] mb-2 leading-none">{stat.number}</div>
                            <div className="stat-label uppercase text-[var(--c-text-light)] font-bold text-xs tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
