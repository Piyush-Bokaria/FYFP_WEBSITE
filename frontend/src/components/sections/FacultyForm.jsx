const FacultyForm = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">

                {/* Header */}
                <div className="bg-[var(--c-primary)] p-6 text-white flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-bold">Faculty</h3>
                        <p className="text-white/80 text-sm mt-1">Please fill in your details below</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        aria-label="Close form"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form Body */}
                <div className="p-8">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Dr. John Doe"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--c-primary)] focus:ring-2 focus:ring-[var(--c-primary)]/20 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="department" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Department
                            </label>
                            <select
                                id="department"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--c-primary)] focus:ring-2 focus:ring-[var(--c-primary)]/20 outline-none transition-all bg-white"
                            >
                                <option value="" disabled selected>Select Department</option>
                                <option value="chem">Chemical Engineering</option>
                                <option value="civil">Civil Engineering</option>
                                <option value="CSE">Computer Science and Engineering</option>
                                <option value="DE">Data Engeering</option>
                                <option value="EEE">Electrical and Electronics Engineering</option>
                                <option value="ECE">Electronics and Communication Engineering</option>
                                <option value="IECT">Information Engineering & Computation Technology</option>
                                <option value="Science">Science & Humanities</option>
                                <option value="ME">Mechanical Engineering</option>
                                <option value="MBA">MBA</option>
                                <option value="Hostel">Hostel</option>
                                <option value="other">Other</option> 
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                Place:
                            </label>
                            <input
                                type="text"
                                id="room"
                                placeholder="Staff Room - 1 / Lab"
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[var(--c-primary)] focus:ring-2 focus:ring-[var(--c-primary)]/20 outline-none transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[var(--c-primary)] text-white font-bold uppercase py-4 rounded-xl shadow-lg hover:bg-[#238b7e] hover:shadow-xl hover:-translate-y-0.5 transition-all mt-4"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export { FacultyForm };
