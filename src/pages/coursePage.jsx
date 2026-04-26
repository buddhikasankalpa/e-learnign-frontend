import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader";
import CourseCard from "../components/courseCard";
import HeroSection from "../components/heroSection";
import JoinSection from "../components/JoinSection";

export default function CoursePage() {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/courses")
                .then((response) => {
                    setProducts(response.data);
                    setLoaded(true);
                })
                .catch((error) => {
                    console.error("Error fetching courses:", error);
                    setLoaded(true);
                });
        }
    }, [loaded]);

    if (!loaded) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center bg-[#f9f9f9]">
                <Loader />
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen flex flex-col bg-[#f9f9f9]">
            
            {/* Hero Section */}
            <div className="flex-shrink-0">
                <HeroSection />
            </div>

            {/* Curriculum Section - Using Gradient from your HTML */}
            <section className="relative overflow-hidden bg-gradient-to-b from-[#f1f4f9] to-[#e8ebf2] py-24 md:py-32">
                
                {/* Abstract Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                    <div className="absolute -top-24 -left-24 w-96 h-96 border-[40px] border-blue-600/10 rounded-full"></div>
                    <div className="absolute top-1/2 -right-48 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 to-transparent rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    
                    {/* Header Part */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-1.5 w-12 bg-[#004ac6] rounded-full"></div>
                                <span className="text-[#004ac6] font-bold uppercase tracking-[0.2em] text-[11px]">
                                    THE CURRICULUM
                                </span>
                            </div>
                            <h2 className="ttext-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                                Curated Mastery Programs
                            </h2>
                            <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                                Precision-engineered paths designed to bridge the gap between amateur and 
                                industry authority. Each program is a focused journey toward absolute 
                                technical mastery.
                            </p>
                        </div>

                        {/* Explore Catalog Button - Styled like your HTML buttons */}
                        <Link 
                            to="/categories" 
                            className="group inline-flex items-center gap-4 bg-white px-8 py-4 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-600/30 transition-all hover:shadow-md active:scale-95"
                        >
                            <span className="font-semibold text-[#004ac6] text-lg">
                                Explore Full Catalog
                            </span>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="w-6 h-6 text-[#004ac6] transition-transform group-hover:translate-x-1" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor" 
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="arrow_forward" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {/* Courses Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

                        {products.slice(0, 3).map((item) => (
                            <CourseCard
                                key={item.courseId || item._id || Math.random()} 
                                course={item} 
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Section */}
            <div className="w-full">
                <JoinSection />
            </div>
            
        </div>
    );
}