import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion"; // <-- Added Framer Motion
import Loader from "../components/loader";
import CourseCard from "../components/courseCard";
import CategoriesHeroSection from "../components/categoriesHeroSection";

export default function CourseCategoriesPage() {
    const [course, setCourse] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("search") || "";

    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        setLoaded(false);
        setVisibleCount(6); 

        const url = query.trim() === "" 
            ? `${import.meta.env.VITE_BACKEND_URL}/courses`
            : `${import.meta.env.VITE_BACKEND_URL}/courses/search/${encodeURIComponent(query)}`;

        axios.get(url)
            .then((response) => {
                setCourse(response.data);
                setLoaded(true);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                setLoaded(true);
            });
    }, [query]);

    const loadMore = () => {
        setVisibleCount(prevCount => prevCount + 6);
    };

    if (!loaded) {
        return (
            <div className="w-full min-h-[calc(100vh-100px)] flex justify-center items-center bg-gray-50">
                <Loader />
            </div>
        );
    }

    // Animation Variants
    const headerVariant = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const gridContainerVariant = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15 // Controls the delay between each card appearing
            }
        }
    };

    const buttonVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <div className="w-full min-h-[calc(100vh-100px)] flex flex-col bg-gray-50 pt-10 pb-20">
            <CategoriesHeroSection query={query} />

            <div className="w-full flex justify-center p-4">
                <div className="w-full max-w-7xl mx-auto px-8 py-8">
                    
                    {/* Header Section with Animation */}
                    <motion.div 
                        variants={headerVariant}
                        initial="hidden"
                        animate="visible"
                        className="mb-12 border-b border-slate-200 pb-10"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-5 tracking-tight">
                            {query ? (
                                <span>
                                    Search Results for <span className="text-blue-600">"{query}"</span>
                                </span>
                            ) : (
                                "Master In-Demand Industrial Skills"
                            )}
                        </h2>
                        <p className="text-slate-500 text-[14px] md:text-[18px] max-w-3xl leading-relaxed font-[Inter]">
                            {query 
                                ? `Discover ${course.length} specialized programs matching your search criteria.` 
                                : "Explore our comprehensive curriculum designed to bridge the gap between learning and industry mastery. Choose your path and start your journey today."}
                        </p>
                    </motion.div>
                    {/* End of Header Section */}

                    {course.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="w-full flex justify-center items-center h-[300px]"
                        >
                            <p className="text-gray-500 text-xl font-[Inter]">No courses found.</p>
                        </motion.div>
                    ) : (
                        <>
                            {/* Grid Section with Staggered Animation */}
                            <motion.div 
                                variants={gridContainerVariant}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {course.slice(0, visibleCount).map((item) => (
                                    <CourseCard
                                        key={item.courseId || item._id}
                                        course={item}
                                    />
                                ))}
                            </motion.div>

                            {/* Load More Button Animation */}
                            {visibleCount < course.length && (
                                <motion.div 
                                    variants={buttonVariant}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.5 }}
                                    className="w-full flex justify-center mt-16"
                                >
                                    <button 
                                        onClick={loadMore}
                                        className="group inline-flex items-center gap-4 bg-white px-10 py-4 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-600/30 transition-all hover:shadow-md active:scale-95 cursor-pointer"
                                    >
                                        <span className="font-semibold text-[#004ac6] text-lg">
                                            Load More Courses
                                        </span>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            className="w-6 h-6 text-[#004ac6] transition-transform group-hover:translate-x-1" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor" 
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </button>
                                </motion.div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}