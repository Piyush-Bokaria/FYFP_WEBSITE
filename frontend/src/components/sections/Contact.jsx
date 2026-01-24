export const Contact = () => {
    return (
        <section id="contact" className="contact py-16 md:py-32 bg-[#F9F9F9] border-t border-gray-100">
            <div className="container max-w-[1000px] mx-auto px-6">
                <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-20 shadow-xl text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--c-secondary)]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--c-primary)]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <h2 className="text-4xl md:text-[3.5rem] mb-8 font-[800] uppercase tracking-tight text-[var(--c-text-main)] relative z-10">Get In Touch</h2>
                    <p className="text-[var(--c-text-light)] text-lg md:text-xl mb-12 max-w-lg mx-auto relative z-10">
                        We'd love to hear from you. Reach out for collaborations, questions, or just to say hi.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                        <div className="flex flex-col gap-4 items-center">
                            <span className="text-xl md:text-2xl font-bold text-[var(--c-primary)] bg-[var(--c-bg-main)] px-8 py-4 rounded-full inline-block">
                                Email Us at:
                            </span>
                            <a href="mailto:studentcoordinator.fyfpmvgr@gmail.com" className="text-base sm:text-lg md:text-2xl font-bold text-[var(--c-primary)] hover:underline decoration-2 underline-offset-4 bg-[var(--c-bg-main)] px-6 py-4 rounded-full inline-block break-all max-w-full">
                                studentcoordinator.fyfpmvgr@gmail.com
                            </a>
                        </div>

                        <div className="social-links flex flex-col items-center">
                            <h4 className="font-bold uppercase tracking-widest text-[#9CA3AF] mb-8 text-sm">Follow Us</h4>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <a key='Instagram' href="https://www.instagram.com/fyfp_mvgr?igsh=MW02eTNzenlwaHp4cw==" className="social px-8 py-3 font-bold uppercase bg-[var(--c-text-main)] text-white rounded-full hover:bg-[var(--c-primary)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300" target="_blank" rel="noopener noreferrer">
                                    Instagram
                                </a>

                                <a key='LinkedIn' href="https://www.linkedin.com/company/fyfp/" className="social px-8 py-3 font-bold uppercase bg-[var(--c-text-main)] text-white rounded-full hover:bg-[var(--c-primary)] hover:-translate-y-1 hover:shadow-lg transition-all duration-300" target="_blank" rel="noopener noreferrer">
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
