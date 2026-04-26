import React from 'react';

export default function CategoriesHeroSection({ query }) {
    const courses = [
        {
            label: 'Web Development',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80',
            rotate: '-rotate-6',
            position: 'top-0 left-6 z-10',
            size: 'w-48 h-28',
        },
        {
            label: 'Data Science',
            image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&q=80',
            rotate: 'rotate-2',
            position: 'top-10 left-2 z-20',
            size: 'w-44 h-28',
        },
        {
            label: 'UI/UX Design',
            image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=400&q=80',
            rotate: 'rotate-6',
            position: 'top-20 left-16 z-30',
            size: 'w-44 h-28',
        },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-6 mt-1">
            <div className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10"
                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 60%, #6d28d9 100%)' }}>

                {/* Soft light orb top right */}
                <div className="absolute top-[-20%] right-[-5%] w-[350px] h-[350px] rounded-full -z-0"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }}></div>
                <div className="absolute bottom-[-20%] left-[-5%] w-[250px] h-[250px] rounded-full -z-0"
                    style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)' }}></div>

                {/* Left Content */}
                <div className="relative z-10 flex flex-col items-start max-w-xl">

                    {/* Badge */}
                    <div className="mb-5 flex items-center gap-2 px-4 py-1.5 rounded-full border"
                        style={{ background: 'rgba(255,255,255,0.12)', borderColor: 'rgba(255,255,255,0.2)' }}>
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-200 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-100"></span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-widest text-blue-100">Expert-Led Courses</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-5 text-white">
                        Course{' '}
                        <span style={{ color: '#a5b4fc' }}>Catalog</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-base md:text-lg leading-relaxed font-medium"
                        style={{ color: 'rgba(219,234,254,0.85)', maxWidth: '420px' }}>
                        Master the world's most in-demand skills with{' '}
                        <span className="text-white font-semibold">industry-leading</span>{' '}
                        mentors and real-world projects.
                    </p>

                    {/* Decorative line */}
                    <div className="mt-8 rounded-full h-1 w-20"
                        style={{ background: 'rgba(165,180,252,0.5)' }}></div>

                    {/* Search Result Indicator */}
                    {query && (
                        <div className="mt-6 px-5 py-2 text-sm font-semibold rounded-2xl border text-white"
                            style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.2)' }}>
                            Results for: "{query}"
                        </div>
                    )}
                </div>

                {/* Right - Stacked Cards */}
                <div className="relative z-10 w-64 h-52 flex-shrink-0 hidden md:block">
                    {courses.map((course, i) => (
                        <div
                            key={i}
                            className={`absolute ${course.position} ${course.size} ${course.rotate} rounded-2xl overflow-hidden shadow-2xl`}
                            style={{ border: '2px solid rgba(255,255,255,0.25)' }}
                        >
                            <img
                                src={course.image}
                                alt={course.label}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 px-3 py-2"
                                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}>
                                <span className="text-white text-xs font-bold">{course.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}