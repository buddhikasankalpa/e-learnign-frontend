import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // <-- Added Framer Motion
import Loader from "../components/loader";

export default function MyLearningPage() {
  const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/orders/mylearning", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCourses(res.data);
        setLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load learning courses:", err);
        setLoaded(true);
      });
  }, []);

  // Animation Variants
  const sidebarVariant = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const headerVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger effect for cards
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex min-h-screen">

        {/* Sidebar with Slide-In Animation */}
        <motion.aside 
          variants={sidebarVariant}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex h-screen w-72 sticky top-0 flex-col gap-2 p-4 bg-slate-50 border-r border-gray-200"
        >
          <div className="p-4 mb-2 bg-white rounded-xl shadow-sm mt-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900">My Account</h3>
                <p className="text-xs text-gray-500">Scholar</p>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                <span>Courses</span>
                <span>{courses.length} enrolled</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all"
                  style={{ width: courses.length > 0 ? "100%" : "0%" }}
                ></div>
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { icon: "▶", label: "My Learning", active: true },
              { icon: "♥", label: "Wishlist", active: false },
              { icon: "✓", label: "Certificates", active: false },
              { icon: "⚙", label: "Settings", active: false },
            ].map((item) => (
              <a
                key={item.label}
                href="#"
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  item.active
                    ? "bg-white text-blue-700 shadow-sm font-bold"
                    : "text-gray-500 hover:bg-blue-50"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto p-2 mb-4">
            <button
              onClick={() => navigate("/")}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-700 transition active:scale-95"
            >
              Browse More Courses
            </button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-8 md:p-12 overflow-hidden">
          <motion.header 
            variants={headerVariant}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              My Learning
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Your purchased courses are ready to watch.
            </p>
          </motion.header>

          {!loaded ? (
            <div className="flex justify-center py-20">
              <Loader />
            </div>
          ) : courses.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm"
            >
              <div className="text-5xl mb-4">📚</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">No courses yet</h2>
              <p className="text-gray-500 text-sm mb-6">
                Complete a purchase to start learning.
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition shadow-lg active:scale-95"
              >
                Browse Courses
              </button>
            </motion.div>
          ) : (
            <section>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-baseline justify-between mb-8"
              >
                <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                <span className="text-blue-600 font-bold text-sm">
                  {courses.length} course{courses.length !== 1 ? "s" : ""}
                </span>
              </motion.div>

              {/* Grid with Staggered Animations */}
              <motion.div 
                variants={containerVariant}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {courses.map((course, i) => (
                  <motion.div key={i} variants={itemVariant} className="h-full">
                    <div
                      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer border border-gray-100 flex flex-col h-full"
                      onClick={() => navigate(`/course/${course.courseId}`)}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video bg-gray-100 overflow-hidden shrink-0">
                        {course.image ? (
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                            <span className="text-4xl">🎓</span>
                          </div>
                        )}
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="bg-white text-blue-600 px-4 py-2 rounded-full font-bold text-sm shadow">
                            ▶ Watch Now
                          </span>
                        </div>
                      </div>

                      {/* Card Body - Flex grow applied to equalize heights */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                            Course
                          </span>
                          <span className="text-xs text-gray-400 font-mono">{course.courseId}</span>
                        </div>

                        <h3 className="text-base font-bold text-gray-900 mb-5 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                          {course.title || course.courseId}
                        </h3>

                        {/* Button pushed to the bottom using mt-auto */}
                        <button
                          className="w-full py-3 mt-auto bg-gray-100 text-gray-900 font-bold rounded-xl text-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-200"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/course/${course.courseId}`);
                          }}
                        >
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}