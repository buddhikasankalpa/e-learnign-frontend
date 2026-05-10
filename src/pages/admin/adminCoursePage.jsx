import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiSearch } from "react-icons/fi"; // Added for UI enhancement
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../../components/loader";
import CourseDeleteButton from "../../components/courseDeleteButton";

export default function AdminCoursePage() {
  const [course, setProducts] = useState([]);
  const [loaded, setloaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/courses")
        .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setloaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen p-8 lg:p-12 flex flex-col font-sans">
      
      {/* ── Page Header ── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Course Management</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Create, update, and manage your educational content.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search Bar (UI Only) */}
          <div className="relative group hidden sm:block">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="pl-10 pr-4 py-2.5 w-full md:w-64 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>

          {/* Add Course Button */}
          <Link
            to="/admin/add-course"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-600/30 hover:bg-blue-700 hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <BiPlus size={20} />
            Add Course
          </Link>
        </div>
      </div>

      {/* ── Table Container ── */}
      <div className="w-full bg-white rounded-2xl shadow-[0_2px_20px_-8px_rgba(0,0,0,0.1)] border border-slate-200/60 overflow-hidden">
        {loaded ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              
              {/* Table Head */}
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Thumbnail</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Course ID</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Title</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Description</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Price</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Labelled Price</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Instructor</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Duration</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-100">
                {course.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="py-24 text-center">
                       <div className="flex flex-col items-center gap-3">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                            <span className="text-2xl">📚</span>
                          </div>
                          <p className="text-slate-800 font-semibold">No courses found</p>
                          <p className="text-slate-500 text-sm">Click 'Add Course' to create your first course.</p>
                       </div>
                    </td>
                  </tr>
                ) : (
                  course.map((item) => (
                    <tr
                      key={item.courseId}
                      className="hover:bg-slate-50/50 transition-colors duration-200 group"
                    >
                      {/* Thumbnail */}
                      <td className="px-6 py-4">
                        <div className="w-[50px] h-[50px] rounded-lg overflow-hidden border border-slate-200 shadow-sm group-hover:shadow transition-all">
                          <img
                            src={item.thumbnail || "/default-course.png"}
                            className="w-full h-full object-cover"
                            alt="thumbnail"
                          />
                        </div>
                      </td>

                      {/* Course ID */}
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold bg-slate-100/80 text-slate-600 px-2.5 py-1.5 rounded-md border border-slate-200/60">
                          {item.courseId}
                        </span>
                      </td>

                      {/* Title */}
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800 text-sm">{item.title}</div>
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4 text-sm text-slate-500">
                        <div className="max-w-[200px] truncate" title={item.description}>
                          {item.description}
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 text-sm">
                          ${item.price}
                        </span>
                      </td>

                      {/* Labelled Price */}
                      <td className="px-6 py-4">
                        <span className="line-through text-xs font-medium text-slate-400">
                          {item.labelledPrice ? `$${item.labelledPrice}` : "-"}
                        </span>
                      </td>

                      {/* Instructor */}
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {item.instructor}
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {item.duration}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 text-sm text-slate-600">
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-xs font-medium">
                          {item.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${
                            item.isAvailable
                              ? "bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]"
                              : "bg-[#FEF2F2] text-[#B91C1C] border-[#FEE2E2]"
                          }`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.isAvailable ? "bg-[#22C55E]" : "bg-[#EF4444]"}`} />
                          {item.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                          <button
                            className="text-xs font-semibold bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 shadow-sm"
                            onClick={() => navigate("/admin/update-course", { state: item })}
                          >
                            Edit
                          </button>
                          
                          {/* CourseDeleteButton component (Ensure it has modern styles inside its own file if needed) */}
                          <CourseDeleteButton courseId={item.courseId} reload={() => { setloaded(false) }} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <Loader />
            <p className="text-slate-400 text-sm font-medium animate-pulse">Loading courses...</p>
          </div>
        )}
      </div>

    </div>
  );
}