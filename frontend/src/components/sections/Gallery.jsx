import { useState, useEffect } from 'react';
import { API } from "../../config";

export const Gallery = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const FALLBACK_GALLERY_DATA = [
        { title: 'Project Nidesh', date: 'JULY 2025', link: "https://drive.google.com/drive/folders/1VLT9pCch-V3Qhv-59XVatTb9FOLrPy1q" },
        { title: 'Independence day Celebrations', date: 'AUG 2025', link: "https://drive.google.com/drive/folders/1VgHbBqYt5mXq1YEy3tG6kbbtkRZntQBK" },
        { title: 'Project Kitab', date: 'OCT 2025', link: "https://drive.google.com/drive/folders/1vlaG183pgFQPrJMXBIq1V6XJkJZ75Ylb" },
        { title: 'Project Vakankur', date: 'DEC 2025', link: "https://drive.google.com/drive/folders/1a_t6np3tABJ5hMFc91R9nhtZDTNyME1u" },
        { title: 'Digital Bootcamp', date: 'DEC 2025', link: "https://drive.google.com/drive/folders/1quebjhzKVUBD04SoEzxjtiMPUeiP3hSC" },
        { title: 'Project Swayamika', date: 'JAN 2025', link: "https://drive.google.com/drive/folders/1BEbZ_paQuN50SdBBJX1WY_b9_fcLABGC" },
        { title: 'Camps for Training on CPR', date: 'JAN 2025', link: "#" },
        { title: 'Cloth Donation camp', date: 'JAN 2025', link: "#" },
    ];

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch(`${API}/gallery/`);
                console.log(`${API}/gallery/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch gallery items');
                }
                const data = await response.json();
                setItems(data);
                setError(null);
            } catch (err) {
                console.error("Using fallback data for gallery:", err);
                setItems(FALLBACK_GALLERY_DATA);
                setError(null); // Clear error since we have fallback
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    return (
        <section id="gallery" className="gallery py-24 bg-[var(--c-bg-main)]">
            <div className="container max-w-[1400px] mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-[3rem] font-[800] uppercase tracking-tight text-[var(--c-text-main)] mb-2">Event Gallery</h2>
                        <p className="text-[var(--c-text-light)] font-medium text-lg max-w-lg">
                            Capturing moments of connection and impact.
                        </p>
                    </div>
                </div>
                {loading ? (
                    <div className="text-center py-12 text-[var(--c-primary)] font-bold">Loading gallery...</div>
                ) : error ? (
                    <div className="text-center py-12 text-red-500 font-bold">Error: {error}</div>
                ) : (
                    <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((item, index) => (
                            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
                                <div className="gallery-item aspect-square rounded-2xl bg-white relative overflow-hidden group shadow-sm hover:shadow-card transition-all duration-300">
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100 group-hover:scale-105 transition-transform duration-500">
                                        {item.image_url ? (
                                            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center text-[var(--c-text-light)] opacity-50">
                                                <div className="text-5xl mb-2">📸</div>
                                                <p className="font-medium text-sm">{item.title}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="gallery-overlay absolute inset-0 bg-gradient-to-t from-[var(--c-text-main)]/90 via-[var(--c-text-main)]/60 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h4 className="text-white text-xl font-[800] uppercase mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-150">{item.title}</h4>
                                        <p className="text-white/80 font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200">{item.date}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
