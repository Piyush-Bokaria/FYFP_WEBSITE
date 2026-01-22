import { useState } from 'react';
import { cn } from "@/lib/utils";

export const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section id="faq" className="faq py-24 bg-white">
            <div className="container max-w-[1000px] mx-auto px-6">
                <h2 className="text-[3rem] mb-16 font-[800] uppercase tracking-tight text-[var(--c-text-main)] text-center">Frequently Asked Questions</h2>
                <div className="faq-container space-y-4">
                    {[
                        { q: 'What is FYFP?', a: 'FYFP is MVGR College Of Engineering Student Club, focussed on helping the society through various activities and events.' },
                        { q: 'What is the role of FYFP?', a: 'FYFP is MVGR College Of Engineering Student Club, focussed on helping the society through various activities and events.' },
                        { q: 'What are the activities of FYFP?', a: 'FYFP conducts mulitple events and activities to uplift the society, which includes Project Kitab, Project Vikas, Project Setu, Streetplay, Project Nidesh, Project Swayamika.' },
                        { q: 'How to join FYFP?', a: 'To join FYFP, you dont need any requirements. Just come and join us at our events and activities.' },
                        { q: 'What are the achievements of FYFP?', a: 'FYFP has been able to uplift the society through various activities and events, and has been able to make a positive impact on the lives of many people.' }
                    ].map((item, index) => (
                        <div key={index} className="faq-item group">
                            <div
                                className={cn(
                                    "faq-question p-6 cursor-pointer flex justify-between items-center rounded-2xl transition-all duration-300",
                                    activeIndex === index ? "bg-[var(--c-bg-main)]" : "hover:bg-[var(--c-bg-main)]/50"
                                )}
                                onClick={() => toggleFAQ(index)}
                            >
                                <h3 className="font-[700] text-lg pr-8">{item.q}</h3>
                                <span className={cn(
                                    "faq-icon w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 bg-white shadow-sm",
                                    activeIndex === index ? "rotate-45 bg-[var(--c-accent)] text-white" : "text-[var(--c-text-main)]"
                                )}>
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 0V12M0 6H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </span>
                            </div>
                            <div
                                className={cn(
                                    "faq-answer px-6 overflow-hidden transition-all duration-500 ease-in-out",
                                    activeIndex === index ? "active opacity-100 pb-6" : "opacity-0"
                                )}
                            >
                                <p className="font-medium text-[var(--c-text-light)] leading-relaxed pl-2 border-l-2 border-[var(--c-primary)]/30">{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
