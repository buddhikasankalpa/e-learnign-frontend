import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import { GoVerified } from "react-icons/go";

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
    <div className="w-full min-h-screen bg-[#f8fafc] p-8 flex flex-col">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Users Management</h1>
        <p className="text-slate-500 mt-1">Monitor and manage all system users in real-time.</p>
      </div>

      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {loaded ? (
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-slate-50/50 text-slate-400 uppercase text-[11px] font-semibold tracking-wider">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">First Name</th>
                <th className="px-6 py-4">Last Name</th>
                <th className="px-6 py-4">Admin</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((item, index) => (
                <tr key={index} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="relative w-10 h-10">
                      <img
                        src={item.image || `${import.meta.env.VITE_BACKEND_URL}/defaultProfileIcon.png`}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full ring-2 ring-slate-100"
                        onError={(e) => {
                          e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                        }}
                      />
                    </div>
                  </td>

                  <td className="px-6 py-4 font-medium text-slate-600">
                    <div className="flex items-center gap-2">
                      {item.email}
                      {item.isEmailVerified && <GoVerified className="text-blue-500" />}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-600">{item.firstName}</td>
                  <td className="px-6 py-4 text-slate-600">{item.lastName}</td>

                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold uppercase tracking-tight ${item.isAdmin ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-400"}`}>
                      {item.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold leading-none ${
                      item.isBlocked 
                        ? "bg-[#fff1f2] text-[#be123c]" 
                        : "bg-[#f0fdf4] text-[#15803d]"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${item.isBlocked ? "bg-[#be123c]" : "bg-[#15803d]"}`}></span>
                      {item.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
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
                      className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm border ${
                        item.isBlocked 
                          ? "bg-white border-blue-100 text-[#2563eb] hover:bg-blue-50/50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)]" 
                          : "bg-[#2563eb] border-[#2563eb] text-white hover:bg-[#1d4ed8]"
                      }`}
                    >
                      {item.isBlocked ? "Unblock User" : "Block User"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-20 flex justify-center"><Loader /></div>
        )}
      </div>
    </div>
  );
}