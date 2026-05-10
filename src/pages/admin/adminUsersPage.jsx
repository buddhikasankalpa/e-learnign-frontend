import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { GoVerified } from "react-icons/go";
import { FiSearch } from "react-icons/fi"; // Added for UI enhancement

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      const token = localStorage.getItem("token");
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/users/all", {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          setUsers(response.data);
          setLoaded(true);
        })
        .catch((err) => {
          console.log(err);
          setLoaded(true);
        });
    }
  }, [loaded]);

  return (
    <div className="w-full min-h-screen p-8 lg:p-12 flex flex-col font-sans">
      
      {/* ── Page Header ── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Monitor and manage all system users in real-time.</p>
        </div>

        {/* Search Bar (UI Only) */}
        <div className="flex items-center gap-3">
          <div className="relative group hidden sm:block">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search users..." 
              className="pl-10 pr-4 py-2.5 w-full md:w-64 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="w-full bg-white rounded-2xl shadow-[0_2px_20px_-8px_rgba(0,0,0,0.1)] border border-slate-200/60 overflow-hidden">
        {loaded ? (
          users.length === 0 ? (
            <div className="py-24 text-center flex flex-col items-center gap-3">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-slate-800 font-semibold">No users found</p>
              <p className="text-slate-500 text-sm">There are currently no users registered in the system.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse whitespace-nowrap">
                
                {/* Table Head */}
                <thead className="bg-slate-50/80 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Profile</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Email</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">First Name</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Last Name</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Role</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">Action</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-slate-100">
                  {users.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors duration-200 group">
                      
                      {/* Profile Image */}
                      <td className="px-6 py-4">
                        <div className="relative w-11 h-11">
                          <img
                            src={item.image || `${import.meta.env.VITE_BACKEND_URL}/defaultProfileIcon.png`}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full ring-2 ring-slate-100 shadow-sm group-hover:ring-blue-100 transition-all"
                            onError={(e) => {
                              e.target.src = "https://rlawualidanksomoidky.supabase.co/storage/v1/object/public/Images/defaultprofileBG%20.jpg";
                            }}
                          />
                        </div>
                      </td>

                      {/* Email & Verified Status */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800 text-sm">{item.email}</span>
                          {item.isEmailVerified && (
                            <div title="Verified Email" className="bg-blue-50 p-1 rounded-full text-blue-500">
                              <GoVerified size={14} />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* First Name */}
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {item.firstName || "-"}
                      </td>

                      {/* Last Name */}
                      <td className="px-6 py-4 text-slate-600 font-medium">
                        {item.lastName || "-"}
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border ${
                          item.isAdmin 
                            ? "bg-indigo-50 text-indigo-600 border-indigo-100" 
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}>
                          {item.isAdmin ? "Admin" : "User"}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border ${
                          item.isBlocked 
                            ? "bg-[#FEF2F2] text-[#B91C1C] border-[#FEE2E2]" 
                            : "bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${item.isBlocked ? "bg-[#EF4444]" : "bg-[#22C55E]"}`}></span>
                          {item.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-center">
                        <div className="opacity-90 group-hover:opacity-100 transition-opacity">
                          {item.isAdmin ? (
                            <button
                              disabled
                              className="px-4 py-2 rounded-xl text-xs font-semibold border bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
                              title="Cannot block another Admin"
                            >
                              Block User
                            </button>
                          ) : (
                            <button
                              onClick={async () => {
                                try {
                                  await axios.put(
                                    import.meta.env.VITE_BACKEND_URL + `/users/toggle-block/${item.email}`,
                                    { isBlocked: !item.isBlocked },
                                    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
                                  );
                                  setLoaded(false);
                                } catch (err) {
                                  console.log(err);
                                }
                              }}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm border ${
                                item.isBlocked 
                                  ? "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900" 
                                  : "bg-red-50 border-red-100 text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600"
                              }`}
                            >
                              {item.isBlocked ? "Unblock User" : "Block User"}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <Loader />
            <p className="text-slate-400 text-sm font-medium animate-pulse">Loading users...</p>
          </div>
        )}
      </div>
    </div>
  );
}