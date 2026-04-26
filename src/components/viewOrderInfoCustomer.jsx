import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ViewOrderInfoCustomer({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (order.status === "Completed") {
    return (
      <button
        onClick={() => navigate("/myLearning")}
        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
      >
        Watch Course
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
      >
        View Info
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-800">Order Details</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700 mb-5">
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID</span>
                <span className="font-mono font-bold text-xs bg-slate-100 px-2 py-1 rounded">
                  {order.orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Name</span>
                <span className="font-semibold capitalize">{order.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Email</span>
                <span>{order.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date</span>
                <span>
                  {new Date(order.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                    ${order.status === "Pending"
                      ? "bg-amber-50 text-amber-600 border-amber-100"
                      : "bg-emerald-50 text-emerald-600 border-emerald-100"
                    }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      order.status === "Pending" ? "bg-amber-500" : "bg-emerald-500"
                    }`}
                  ></span>
                  {order.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total</span>
                <span className="font-bold text-slate-900">
                  LKR{" "}
                  {order.total
                    ? order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })
                    : "0.00"}
                </span>
              </div>
              {order.address && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Address</span>
                  <span className="text-right max-w-xs">{order.address}</span>
                </div>
              )}
              {order.phone && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Phone</span>
                  <span>{order.phone}</span>
                </div>
              )}
              {order.notes && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Notes</span>
                  <span className="text-right max-w-xs">{order.notes}</span>
                </div>
              )}
            </div>

            {order.items && order.items.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-700 mb-3">Items</h3>
                <div className="space-y-2">
                  {order.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
                    >
                      {item.thumbnail && (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm truncate">{item.title}</p>
                        <p className="text-xs text-slate-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold text-slate-900 shrink-0">
                        LKR {(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold px-5 py-2 rounded-lg transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
