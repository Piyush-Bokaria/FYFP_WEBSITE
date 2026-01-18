export const About = () => {
    return (
        <section id="about" className="about py-16 md:py-24 bg-[var(--c-bg-main)] relative overflow-hidden">
            <div className="container max-w-[1400px] mx-auto px-6">
                <div className="flex flex-col items-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] text-[var(--c-text-main)] font-[800] uppercase leading-none tracking-tight mb-4 text-center">About Our FYFP</h2>
                    <div className="w-24 h-2 bg-[var(--c-secondary)] rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 items-start">
                    <div className="about-text space-y-8">
                        <p className="text-[1.15rem] leading-relaxed pl-6 border-l-4 border-[var(--c-secondary)] font-medium text-[var(--c-text-main)] bg-white p-6 rounded-r-xl shadow-sm">
                            From The Youth For The People (FYFP) is a student-led service organization at MVGR College of Engineering (A). We are dedicated to making a tangible difference in our community through consistent, compassionate action.
                        </p>
                        <p className="text-[1.15rem] leading-relaxed pl-6 border-l-4 border-[var(--c-secondary)] font-medium text-[var(--c-text-main)] bg-white p-6 rounded-r-xl shadow-sm">
                            Our mission extends beyond our activities; we aim to foster a culture of empathy and social responsibility among young minds. Through initiatives in educational and social awareness, we strive to uplift people, while empowering students to become change-makers.
                        </p>
                    </div>

                    <div className="about-values w-full bg-[var(--c-primary)] text-white p-6 md:p-10 rounded-3xl shadow-xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h3 className="text-white mb-8 border-b border-white/20 pb-4 font-[800] uppercase tracking-wide">Our Initiatives</h3>
                        <ul className="list-none grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {['Project Kitab', 'Project Vikas', 'Project Setu', 'Streetplay', 'Project Nidesh', 'Project Swayamika'].map((item) => (
                                <li key={item} className="font-sans text-lg flex items-center gap-3">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
