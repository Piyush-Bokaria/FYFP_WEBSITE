import { useState } from 'react';
import { cn } from "@/lib/utils";

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <nav className="navbar bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-[1000] shadow-sm">
            <div className="nav-container flex justify-between items-center max-w-[1400px] mx-auto px-6 h-[90px]">
                <div className="nav-logo flex items-center gap-3">
                    <img src="./assets/FYFP_logo.png" alt="FYFP Logo" className="logo-image w-[45px] h-[45px] p-1 rounded-lg bg-white" />
                    <div className="logo-text flex flex-col">
                        <h2 className="text-[1.75rem] font-[800] leading-none text-[var(--c-text-main)] tracking-tight">FYFP</h2>
                        <span className="logo-subtitle font-sans text-[0.65rem] uppercase tracking-wider text-[var(--c-text-light)] font-medium">From the Youth For the People</span>
                    </div>
                </div>

                {/* Desktop Menu */}
                <ul className="nav-menu hidden lg:flex gap-1 items-center list-none">
                    {['Home', 'About', 'Events', 'Gallery', 'Team', 'Impact', 'FAQ', 'Contact'].map((item) => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase()}`} className="nav-link font-bold uppercase text-[0.9rem] px-4 py-2 rounded-full text-[var(--c-text-main)] transition-colors hover:text-[var(--c-primary)] hover:bg-[var(--c-primary)]/5">
                                {item}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a href="#donate" className="ml-4 nav-link donate-nav bg-[var(--c-primary)] text-white font-bold uppercase text-[0.9rem] px-6 py-3 rounded-full shadow-md hover:bg-[#238b7e] hover:shadow-lg hover:-translate-y-0.5 transition-all">
                            Donate
                        </a>
                    </li>
                </ul>

                {/* Mobile Menu Toggle */}
                <div className="threedots lg:hidden flex flex-col gap-[6px] cursor-pointer p-2" onClick={toggleMenu}>
                    <span className={`w-[25px] h-[3px] bg-[var(--c-text-main)] rounded-full transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
                    <span className={`w-[25px] h-[3px] bg-[var(--c-text-main)] rounded-full transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`w-[25px] h-[3px] bg-[var(--c-text-main)] rounded-full transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-[90px] left-0 w-full bg-white border-b border-gray-100 p-6 shadow-xl flex flex-col gap-4 z-50">
                    {['Home', 'About', 'Events', 'Gallery', 'Team', 'Impact', 'Contact'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} className="text-xl font-bold uppercase text-[var(--c-text-main)]" onClick={() => setMobileMenuOpen(false)}>{item}</a>
                    ))}
                    <a href="#donate" className="text-xl font-bold uppercase bg-[var(--c-primary)] text-white p-3 text-center rounded-xl shadow-md" onClick={() => setMobileMenuOpen(false)}>Donate</a>
                </div>
            )}
        </nav>
    );
};
