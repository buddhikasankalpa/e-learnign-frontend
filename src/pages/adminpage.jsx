import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { IoCalendarClear } from "react-icons/io5";
import { BiSolidVideos } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { FaBookOpenReader } from "react-icons/fa6";

import AdminCoursePage from "./admin/adminCoursePage";
import AdminAddCoursePage from './admin/adminAddCoursePage';
import AdminUpdateCoursePage from './admin/adminUpdateCoursePage';
import AdminOrdersPage from './admin/adminOrdersPage';
import AdminUsersPage from './admin/adminUsersPage';
import AdminVideosPage from "./admin/adminVideosPage";
import AdminTeachersPage from "./admin/adminTeachersPage";

export default function Admin() {
  // translate-x-1 ඉවත් කරලා, පළල w-[96%] කරලා ලස්සනට මැදට ගත්තා shadow එක කැපෙන්නේ නැති වෙන්න
  const navLinkClass = ({ isActive }) =>
    `h-[48px] w-[96%] mx-auto flex items-center gap-4 px-5 rounded-xl transition-all duration-300 text-sm font-medium ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-600/40"
        : "text-slate-400 hover:bg-slate-800 hover:text-white hover:translate-x-1"
    }`;

  return (
    <div className="w-screen h-screen flex overflow-hidden bg-slate-50">
      {/* ── Sidebar ── */}
      <div className="fixed top-0 left-0 h-screen w-[260px] bg-[#0B1120] flex flex-col z-50 shadow-2xl border-r border-slate-800/50">
        <Link
          className="w-full h-[70px] flex items-center gap-3 px-8 border-b border-slate-800/80 shrink-0 group"
          to="/"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-600/40 group-hover:scale-105 transition-transform">
            <FaBookOpenReader className="text-white" size={16} />
          </div>
          <span className="text-white font-bold text-xl tracking-wide">Scholarly</span>
        </Link>
        
        {/* Padding වෙනස් කරලා තියෙනවා Shadow එකට ඉඩ තියන්න */}
        <div className="py-6 flex flex-col flex-1 overflow-hidden">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-6">Main Menu</p>
          <nav className="flex flex-col gap-2 flex-1 overflow-y-auto px-2 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <NavLink end className={navLinkClass} to="/admin/">
              <MdDashboard size={20} /> Dashboard
            </NavLink>
            <NavLink className={navLinkClass} to="/admin/courses">
              <IoCalendarClear size={20} /> Courses
            </NavLink>
            <NavLink className={navLinkClass} to="/admin/videos">
              <BiSolidVideos size={20} /> Videos
            </NavLink>
            <NavLink className={navLinkClass} to="/admin/users">
              <FaUsers size={20} /> Users
            </NavLink>
            <NavLink className={navLinkClass} to="/admin/teachers">
              <GiTeacher size={20} /> Teachers
            </NavLink>
          </nav>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="ml-[260px] flex-1 h-screen overflow-y-auto bg-slate-50/50">
        <Routes>
          <Route path="/" element={<AdminOrdersPage />} />
          <Route path="/courses" element={<AdminCoursePage />} />
          <Route path="/update-course" element={<AdminUpdateCoursePage />} />
          <Route path="/videos" element={<AdminVideosPage />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/teachers" element={<AdminTeachersPage />} />
          <Route path="/add-course" element={<AdminAddCoursePage />} />
        </Routes>
      </div>
    </div>
  );
}