import { Routes, Route, Link } from 'react-router-dom';
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
  return (
    <div className="w-screen h-screen flex overflow-hidden">

      <div className="fixed top-0 left-0 h-screen w-[250px] bg-[#0F172A] flex flex-col z-50">
        <Link
          className="w-full h-[50px] bg-[#0F172A] text-[#60A5FA] border-b border-white/20 flex items-center justify-center font-bold text-lg tracking-wide shrink-0"
          to="/"
        >
          Scholarly
        </Link>
        <nav className="flex flex-col p-3 gap-1 flex-1 overflow-y-auto">
          <Link className="h-[46px] flex items-center gap-3 px-4 text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/admin/">
            <MdDashboard size={18} /> Dashboard
          </Link>
          <Link className="h-[46px] flex items-center gap-3 px-4 text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/admin/courses">
            <IoCalendarClear size={18} /> Courses
          </Link>
          <Link className="h-[46px] flex items-center gap-3 px-4 text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/admin/videos">
            <BiSolidVideos size={18} /> Videos
          </Link>
          <Link className="h-[46px] flex items-center gap-3 px-4 text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/admin/users">
            <FaUsers size={18} /> Users
          </Link>
          <Link className="h-[46px] flex items-center gap-3 px-4 text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/admin/teachers">
            <GiTeacher size={18} /> Teachers
          </Link>
          <Link className="h-[46px] flex items-center gap-3 px-4 text-white hover:bg-blue-600 rounded-lg transition text-sm font-medium" to="/admin/enrollments">
            <FaBookOpenReader size={18} /> Enrollments
          </Link>
        </nav>
      </div>

      {/* ── Main Content (sidebar width offset) ── */}
      <div className="ml-[250px] flex-1 h-screen overflow-y-auto bg-[#F9FAFB]">
        <Routes>
          <Route path="/" element={<AdminOrdersPage />} />
          <Route path="/courses" element={<AdminCoursePage />} />
          <Route path="/update-course" element={<AdminUpdateCoursePage />} />
          <Route path="/videos" element={<AdminVideosPage />} />
          <Route path="/users" element={<AdminUsersPage />} />
          <Route path="/teachers" element={<AdminTeachersPage />} />
          <Route path="/enrollments" element={<h1>Enrollments Page</h1>} />
          <Route path="/add-course" element={<AdminAddCoursePage />} />
        </Routes>
      </div>

    </div>
  );
}