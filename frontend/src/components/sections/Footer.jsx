export const Footer = () => {
    return (
        <footer className="footer bg-[var(--c-text-main)] text-white py-16">
            <div className="container max-w-[1400px] mx-auto px-6">
                <div className="footer-content flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="footer-logo flex items-center gap-4">
                        <img src="./assets/FYFP_logo.png" alt="FYFP Logo" className="footer-logo-image w-[50px] h-[50px] bg-white rounded-lg p-1 opacity-90" />
                        <div className="footer-text">
                            <h3 className="text-[1.5rem] font-[800] leading-none uppercase tracking-wide">FYFP</h3>
                            <p className="font-sans text-[0.8rem] uppercase tracking-wider opacity-70 mt-1">From the Youth For the People</p>
                            <p className="font-sans text-[0.7rem] uppercase tracking-wider opacity-70 mt-1"> Beside DE Block, MVGR College Of Engineering (A), Chintalavalasa, Vizianagaram, Andhra Pradesh, India</p>
                        </div>
                    </div>
                    <div className="footer-info text-center md:text-right text-gray-400 text-sm font-medium">
                        <p className="mb-2">
                            &copy; 2026 From the Youth For the People. All rights reserved.
                        </p>
                        <p>Designed with care for our FYFP - Piyush.</p>
                        <a href="/admin" className="opacity-10 hover:opacity-100 transition-opacity text-xs mt-4 block">Admin Login</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
