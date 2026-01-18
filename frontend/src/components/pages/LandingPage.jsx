
import { useState } from 'react';
import { Navbar } from "@/components/sections/Navbar";
import { FacultyForm } from "@/components/sections/FacultyForm";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Events } from "@/components/sections/Events";
import { Calendar } from "@/components/sections/Calendar";
import { Gallery } from "@/components/sections/Gallery";
import { Team } from "@/components/sections/Team";
import { Impact } from "@/components/sections/Impact";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

function LandingPage() {
    const [isFacultyFormOpen, setIsFacultyFormOpen] = useState(false);

    return (
        <main className="min-h-screen bg-[#F2F2F0] text-black font-sans selection:bg-[#CCFF00] selection:text-black">
            <Navbar onOpenFacultyForm={() => setIsFacultyFormOpen(true)} />
            <FacultyForm isOpen={isFacultyFormOpen} onClose={() => setIsFacultyFormOpen(false)} />
            <Hero />
            <RevealOnScroll><About /></RevealOnScroll>
            <RevealOnScroll><Events /></RevealOnScroll>
            <RevealOnScroll><Calendar /></RevealOnScroll>
            <RevealOnScroll><Gallery /></RevealOnScroll>
            <RevealOnScroll><Team /></RevealOnScroll>
            <RevealOnScroll><Impact /></RevealOnScroll>
            <RevealOnScroll><FAQ /></RevealOnScroll>
            <RevealOnScroll><Contact /></RevealOnScroll>
            <Footer />
        </main>
    );
}

export { LandingPage };
