import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const specialtyColors = {
  Design: "bg-pink-100 text-pink-600",
  Development: "bg-blue-100 text-blue-600",
  Analysis: "bg-amber-100 text-amber-600",
  Other: "bg-slate-100 text-slate-600",
};

export default function InstructorsPage() {
  const [instructors, setInstructors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6); //Load More

  useEffect(() => {
    axios
      .get(BACKEND + "/instructors")
      .then((res) => {
        setInstructors(res.data);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  return (
    <div className="w-full font-sans bg-gray-50 min-h-screen pb-20">

      {/* ── Hero Banner — course catalog style ── */}
      <div className="mx-80 mt-10 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-12 text-white relative overflow-hidden">
        {/* decorative circles */}
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white/5"></div>
        <div className="absolute bottom-0 right-32 w-40 h-40 rounded-full bg-white/5"></div>

        <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full mb-4 inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block"></span>
          Expert-Led Faculty
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-3 mb-4">
          Guided by the world's<br />
          <span className="text-blue-200">most refined masters.</span>
        </h1>
        <p className="text-blue-100 text-base max-w-xl leading-relaxed">
          Our Faculty of Experts aren't just teachers — they are practitioners at the pinnacle of their craft.
        </p>
      </div>

      {/* ── Section Header — course catalog style ── */}
      <div className="max-w-7xl mx-auto px-8 mt-10 mb-8 border-b border-slate-200 pb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Master In-Demand Industrial Skills
        </h2>
        <p className="text-slate-500 text-base md:text-lg max-w-3xl leading-relaxed">
          Explore our comprehensive faculty designed to bridge the gap between learning and industry mastery.
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-8">
        {!loaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="bg-slate-200 h-64 w-full" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-2/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-8 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : instructors.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-sm">No instructors found.</p>
          </div>
        ) : (
          <>
            {/* CourseCard style grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.slice(0, visibleCount).map((inst) => (
                <div
                  key={inst.instructorId}
                  className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col cursor-pointer border border-gray-100 w-full"
                >
                  {/* Photo — h-64, rounded-2xl, badge overlay */}
                  <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 bg-gray-100">
                    {inst.image ? (
                      <img
                        src={inst.image}
                        alt={inst.name}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-slate-100">
                        <span className="text-7xl font-extrabold text-blue-200 select-none">
                          {inst.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    {/* Specialty badge — course category badge style */}
                    <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                      {inst.specialty || "Faculty"}
                    </span>
                    {/* Rating badge */}
                    {inst.rating > 0 && (
                      <span className="absolute top-4 right-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-amber-500 font-black text-xs px-2.5 py-1 rounded-lg shadow-sm">
                        ★ {inst.rating}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="px-2 flex flex-col flex-grow">
                    {/* Name */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {inst.name}
                    </h3>

                    {/* Title + avatar row */}
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-blue-600">
                          {inst.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm font-medium">{inst.title}</p>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-2">
                      {inst.bio}
                    </p>

                    {/* Divider */}
                    <div className="w-full h-px bg-gray-100 mb-5"></div>

                    {/* Stats + Button */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4">
                        {inst.students && (
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Students</span>
                            <span className="text-lg font-black text-gray-900">{inst.students}</span>
                          </div>
                        )}
                        {inst.students && inst.courses > 0 && (
                          <div className="w-px h-8 bg-slate-100" />
                        )}
                        {inst.courses > 0 && (
                          <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Courses</span>
                            <span className="text-lg font-black text-gray-900">{inst.courses}</span>
                          </div>
                        )}
                      </div>

                      {/* Buy Course style button */}
                      <button className="bg-blue-600 text-white rounded-xl px-6 py-3 font-bold text-sm hover:bg-blue-700 hover:shadow-lg transition-all active:scale-95">
                        View Courses
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More — course catalog style */}
            {visibleCount < instructors.length && (
              <div className="w-full flex justify-center mt-16">
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="group inline-flex items-center gap-4 bg-white px-10 py-4 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-600/30 transition-all hover:shadow-md active:scale-95"
                >
                  <span className="font-semibold text-[#004ac6] text-lg">Load More Instructors</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#004ac6] transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}