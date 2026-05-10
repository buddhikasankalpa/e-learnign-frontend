import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import ViewOrderInfo from "../../components/viewOrderInfo";
import { FiSearch, FiFilter } from "react-icons/fi"; // Make sure to import these

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loaded, setloaded] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/orders", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setOrders(response.data);
        setloaded(true);
        setFetchError(false);
      })
      .catch((error) => {
        console.error("Failed to fetch orders:", error);
        setloaded(true);
        setFetchError(true);
      });
  }, []);

  const statusStyles = {
    Pending:    { bg: "#FFF7ED", color: "#C2410C", dot: "#F97316", border: "#FFEDD5" },
    Processing: { bg: "#F0F9FF", color: "#0369A1", dot: "#0EA5E9", border: "#E0F2FE" },
    Completed:  { bg: "#F0FDF4", color: "#15803D", dot: "#22C55E", border: "#DCFCE7" },
    Cancelled:  { bg: "#FEF2F2", color: "#B91C1C", dot: "#EF4444", border: "#FEE2E2" },
  };

  return (
    <div className="w-full min-h-screen p-8 lg:p-12 flex flex-col font-sans">
      {/* ── Page Header ── */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Order Management</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium">Monitor and manage all customer transactions in real-time.</p>
        </div>
        
        {/* Search & Filter Bar (UI Elements) */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="pl-10 pr-4 py-2.5 w-full md:w-64 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm">
            <FiFilter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* ── Main Content Area ── */}
      <div className="w-full bg-white rounded-2xl shadow-[0_2px_20px_-8px_rgba(0,0,0,0.1)] border border-slate-200/60 overflow-hidden">
        {!loaded ? (
          <div className="py-32 flex flex-col items-center justify-center gap-4">
            <Loader />
            <p className="text-slate-400 text-sm font-medium animate-pulse">Loading orders...</p>
          </div>
        ) : fetchError ? (
          <div className="py-24 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-red-50 text-red-500 flex items-center justify-center rounded-2xl shadow-sm mb-2">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <p className="text-lg font-bold text-slate-800">Connection Failed</p>
            <p className="text-sm text-slate-500 max-w-sm">
              We couldn't reach the server. Please check your connection or ensure the backend is running.
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="py-24 text-center flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-slate-800 font-semibold">No orders yet</p>
            <p className="text-slate-500 text-sm">When customers place orders, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Order ID</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Customer Name</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Customer Email</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">Total Amount</th>
                  <th className="px-6 py-5 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order, index) => {
                  const s = statusStyles[order.status] || statusStyles.Pending;
                  return (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors duration-200 group">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold bg-slate-100/80 text-slate-600 px-2.5 py-1.5 rounded-md border border-slate-200/60">
                          {order.orderId}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800 text-sm capitalize">{order.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-slate-500">{order.email}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                        {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4">
                        <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}` }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                          <span style={{ background: s.dot }} className="w-1.5 h-1.5 rounded-full animate-pulse" />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 text-sm">
                          LKR {order.total ? order.total.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {/* ViewOrderInfo component might need its own styling inside its file, but this wrapper keeps it aligned */}
                        <div className="inline-block opacity-90 group-hover:opacity-100 transition-opacity">
                          <ViewOrderInfo order={order} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}