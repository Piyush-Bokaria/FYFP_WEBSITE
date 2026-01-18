import ShaderBackground from "@/components/ui/shader-background";

export const Hero = () => {
    return (
        <section id="home" className="hero min-h-screen flex items-center justify-center py-16 relative border-b border-gray-200 bg-transparent overflow-hidden">
            <ShaderBackground />
            <div className="hero-content text-center max-w-[1200px] relative z-[2] px-4">
                <div className="logos flex justify-center gap-8 mb-12">
                    <div className="hero-logo group">
                        <img src="assets/FYFP_logo.png" alt="FYFP Logo" className="h-[80px] w-auto bg-white p-4 rounded-xl shadow-lg border border-gray-100 transition-transform hover:-translate-y-1" />
                    </div>
                    <div className="hero-logo college-logo group">
                        <img src="assets/MANSAS copy.png" alt="College Logo" className="h-[80px] w-auto bg-white p-4 rounded-xl shadow-lg border border-gray-100 transition-transform hover:-translate-y-1" />
                    </div>
                </div>
                <h1 className="text-[clamp(3.5rem,10vw,8rem)] leading-[1.1] mb-8 relative z-[2] text-[var(--c-text-main)] font-[800] uppercase tracking-tight">
                    From the Youth <br />
                    <span className="text-[var(--c-primary)]">For the People</span>
                </h1>
                <p className="text-[1.25rem] font-medium leading-relaxed mb-12 text-[var(--c-text-main)] max-w-[700px] mx-auto bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-sm">
                    A student led club at MVGR College of Engineering (A) aimed to help the society.
                </p>
                <button className="cta-button text-[1.25rem] font-[700] uppercase bg-[var(--c-accent)] text-white px-10 py-4     rounded-full shadow-lg cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 hover:bg-[#d66045] border-none">
                    <a href="https://whatsapp.com/channel/0029Vb5dUJzId7nPoSpowZ2W">Join Us</a>
                </button>
            </div>
        </section>
    );
};
