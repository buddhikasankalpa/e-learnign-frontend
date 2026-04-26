import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

export default function OrdersPage() {
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
        console.log("User orders:", response.data);
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

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-6 lg:p-10 flex flex-col font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">My Purchases</h1>
        <p className="text-slate-500 mt-1 text-sm">view purchases history and find approve courses.</p>
      </div>

      <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
        {!loaded ? (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        ) : fetchError ? (
          <div className="p-12 text-center flex flex-col items-center gap-3">
            <div className="bg-red-50 text-red-500 p-4 rounded-full">⚠️</div>
            <p className="font-semibold text-slate-800">Connection Failed</p>
            <p className="text-sm text-slate-500 max-w-xs">
              Please make sure you are logged in and try again.
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500 text-sm">No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer Email</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order, index) => (
                  <tr key={index} className="hover:bg-blue-50/30 transition-colors duration-200">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {order.orderId}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800 text-sm capitalize">{order.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">{order.email}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                        ${order.status === 'Pending'
                          ? 'bg-amber-50 text-amber-600 border-amber-100'
                          : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${order.status === 'Pending' ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900 text-sm">
                        LKR {order.total ? order.total.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ViewOrderInfoCustomer order={order} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}