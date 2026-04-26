import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

export default function ViewOrderInfo({ order }) {
  const [isOpen, setIsOpen] = useState(false);
  
  const [status, setStatus] = useState(order?.status || "Pending");
  const [notes, setNotes] = useState(order?.notes || "");
  const [isSaving, setIsSaving] = useState(false);

  if (!order) return null;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  const statusColors = {
    Pending:    { bg: "#FFF7ED", color: "#9A3412", dot: "#F97316" },
    Processing: { bg: "#E0F2FE", color: "#0369A1", dot: "#0284C7" },
    Completed:  { bg: "#EAF3DE", color: "#27500A", dot: "#639922" },
    Cancelled:  { bg: "#FCEBEB", color: "#501313", dot: "#E24B4A" },

    //'bg-amber-50 text-amber-600 border-amber-100'
  };
  
  const s = statusColors[status] || statusColors.Pending;

  const hasChanges = status !== order.status || notes !== (order.notes || "");

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("token") || ""; 

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/orders/${order.orderId}`,
        {
          status: status,
          notes: notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsOpen(false);
      alert("Order updated successfully!");
      
      // after save page relaord
      window.location.reload();
      
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order details.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        View Info
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.45)", zIndex: 1000 },
          content: {
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            right: "auto", bottom: "auto",
            width: "90%", maxWidth: "540px",
            borderRadius: "12px",
            padding: "1.5rem",
            border: "0.5px solid #e5e7eb",
          },
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: 500, margin: 0 }}>Order details</h2>
            <p style={{ fontSize: "13px", color: "#6b7280", margin: "4px 0 0" }}>
              Review the full breakdown of this customer order.
            </p>
          </div>
          <button onClick={() => setIsOpen(false)}
            style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#6b7280" }}>✕
          </button>
        </div>

        <hr style={{ margin: "1rem 0", borderColor: "#e5e7eb" }} />

        {/* Info Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "1rem" }}>
          {[
            { label: "Order ID",          value: order.orderId },
            { label: "Order date & time", value: formatDate(order.date) },
            { label: "Customer name",     value: order.name },
            { label: "Email",             value: order.email },
            { label: "Phone",             value: order.phone || "—" },
            { label: "Total amount",      value: `LKR. ${order.total?.toFixed(2)}`, highlight: true },
          ].map(({ label, value, highlight }) => (
            <div key={label}>
              <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", margin: "0 0 2px" }}>{label}</p>
              <p style={{ fontSize: "14px", fontWeight: highlight ? 500 : 400, color: highlight ? "#BA7517" : "#111827", margin: 0 }}>{value}</p>
            </div>
          ))}

          {/* Status Dropdown*/}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", margin: "0 0 4px" }}>Status</p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "12px", fontWeight: 500, background: s.bg, color: s.color, padding: "3px 10px", borderRadius: "99px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.dot, display: "inline-block" }}></span>
                {status}
              </span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ padding: "4px 8px", borderRadius: "6px", border: "1px solid #d1d5db", fontSize: "13px", outline: "none", cursor: "pointer" }}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Address */}
        <div style={{ background: "#f9fafb", borderRadius: "8px", padding: "10px 14px", marginBottom: "1rem" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", margin: "0 0 4px" }}>Delivery address</p>
          <p style={{ fontSize: "14px", color: "#111827", margin: 0 }}>{order.address}</p>
        </div>

        {/* Additional Notes Box */}
        <div style={{ border: "0.5px solid #e5e7eb", borderRadius: "8px", padding: "10px 14px", marginBottom: "1rem", background: "#f9fafb" }}>
          <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", margin: "0 0 4px" }}>Additional Notes</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any extra notes here..."
            style={{ width: "100%", minHeight: "50px", background: "transparent", border: "none", outline: "none", fontSize: "14px", color: "#111827", resize: "vertical" }}
          />
        </div>

        {/* Items */}
        <div style={{ border: "0.5px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 14px", background: "#f9fafb" }}>
            <p style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", color: "#6b7280", margin: 0 }}>Items</p>
            <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{order.items?.length} item{order.items?.length !== 1 ? "s" : ""}</p>
          </div>
          {order.items?.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 14px", borderTop: i > 0 ? "0.5px solid #e5e7eb" : "none" }}>
              <img src={item.thumbnail} alt={item.title}
                style={{ width: "52px", height: "52px", borderRadius: "8px", objectFit: "cover", flexShrink: 0, border: "0.5px solid #e5e7eb" }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "14px", fontWeight: 500, color: "#111827", margin: 0 }}>{item.title}</p>
                <p style={{ fontSize: "12px", color: "#6b7280", margin: "2px 0 0" }}>
                  Course ID: {item.courseId} &nbsp;|&nbsp; Qty: {item.quantity} &nbsp;|&nbsp; Unit price: LKR. {item.price?.toFixed(2)}
                </p>
              </div>
              <p style={{ fontSize: "14px", fontWeight: 500, color: "#111827", margin: 0, whiteSpace: "nowrap" }}>
                LKR. {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "1.5rem" }}>
          {hasChanges && (
            <button 
              onClick={handleSave} 
              disabled={isSaving}
              style={{ padding: "8px 24px", background: "#111827", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: isSaving ? "not-allowed" : "pointer", opacity: isSaving ? 0.7 : 1 }}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          )}
          
          <button onClick={() => setIsOpen(false)}
            style={{ padding: "8px 24px", background: hasChanges ? "#f3f4f6" : "#1f2937", color: hasChanges ? "#374151" : "#fff", border: hasChanges ? "1px solid #d1d5db" : "none", borderRadius: "8px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}>
            Close
          </button>
        </div>
      </Modal>
    </>
  );
}