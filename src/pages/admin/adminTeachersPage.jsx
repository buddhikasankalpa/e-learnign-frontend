import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const emptyForm = {
  instructorId: "",
  name: "",
  title: "",
  specialty: "Development",
  bio: "",
  image: "",
  rating: "",
  students: "",
  courses: "",
};

export default function AdminTeachersPage() {
  const [instructors, setInstructors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { fetchInstructors(); }, []);

  async function fetchInstructors() {
    try {
      const res = await axios.get(BACKEND + "/instructors", { headers });
      setInstructors(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoaded(true);
    }
  }

  function openAdd() {
    setForm(emptyForm);
    setEditTarget(null);
    setMsg(null);
    setShowForm(true);
  }

  function openEdit(inst) {
    setForm({
      instructorId: inst.instructorId,
      name: inst.name,
      title: inst.title,
      specialty: inst.specialty,
      bio: inst.bio,
      image: inst.image || "",
      rating: inst.rating || "",
      students: inst.students || "",
      courses: inst.courses || "",
    });
    setEditTarget(inst);
    setMsg(null);
    setShowForm(true);
  }

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    try {
      const payload = {
        ...form,
        rating: parseFloat(form.rating) || 0,
        courses: parseInt(form.courses) || 0,
      };
      if (editTarget) {
        const { instructorId, ...updateData } = payload;
        await axios.put(BACKEND + "/instructors/" + editTarget.instructorId, updateData, { headers });
        setMsg({ type: "success", text: "Instructor updated!" });
      } else {
        await axios.post(BACKEND + "/instructors", payload, { headers });
        setMsg({ type: "success", text: "Instructor added!" });
      }
      setShowForm(false);
      fetchInstructors();
    } catch (e) {
      setMsg({ type: "error", text: e.response?.data?.message || "Error saving." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    try {
      await axios.delete(BACKEND + "/instructors/" + deleteTarget.instructorId, { headers });
      setMsg({ type: "success", text: "Instructor deleted." });
      setDeleteTarget(null);
      fetchInstructors();
    } catch {
      setMsg({ type: "error", text: "Failed to delete." });
      setDeleteTarget(null);
    }
  }

  const specialtyColors = {
    Design: "bg-pink-50 text-pink-600 border-pink-100",
    Development: "bg-blue-50 text-blue-600 border-blue-100",
    Analysis: "bg-amber-50 text-amber-600 border-amber-100",
    Other: "bg-slate-100 text-slate-500 border-slate-200",
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] p-6 lg:p-10 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Instructor Management</h1>
          <p className="text-slate-500 mt-1 text-sm">Add, edit and remove instructors.</p>
        </div>
        <button
          onClick={openAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow"
        >
          + Add Instructor
        </button>
      </div>

      {/* Message */}
      {msg && !showForm && (
        <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
          msg.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
          : "bg-red-50 text-red-600 border border-red-100"}`}>
          {msg.text}
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {!loaded ? (
          <div className="py-20 text-center text-slate-400 text-sm">Loading...</div>
        ) : instructors.length === 0 ? (
          <div className="py-20 text-center text-slate-400 text-sm">
            No instructors yet. Click "+ Add Instructor" to start.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">Instructor</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">Title</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">Specialty</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">Rating</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">Students</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">Courses</th>
                  <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {instructors.map((inst) => (
                  <tr key={inst.instructorId} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {inst.image ? (
                          <img src={inst.image} alt={inst.name}
                            className="w-10 h-10 rounded-xl object-cover shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                            <span className="text-blue-600 font-bold text-sm">
                              {inst.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-800">{inst.name}</p>
                          <p className="text-xs text-slate-400 font-mono">{inst.instructorId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-sm">{inst.title}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${specialtyColors[inst.specialty] || specialtyColors.Other}`}>
                        {inst.specialty}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-sm font-semibold text-slate-700">
                        <span className="text-amber-400">★</span> {inst.rating}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 text-sm">{inst.students}</td>
                    <td className="px-5 py-4 text-slate-600 text-sm">{inst.courses}</td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => openEdit(inst)}
                          className="text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition">
                          Edit
                        </button>
                        <button onClick={() => setDeleteTarget(inst)}
                          className="text-xs font-bold bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1.5 rounded-lg transition">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                {editTarget ? "Edit Instructor" : "Add Instructor"}
              </h2>
              <button onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl font-bold leading-none">×</button>
            </div>

            <div className="space-y-4">
              {/* Instructor ID add only */}
              {!editTarget ? (
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Instructor ID *</label>
                  <input type="text" placeholder="e.g. INST001"
                    value={form.instructorId}
                    onChange={(e) => setForm({ ...form, instructorId: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Instructor ID</label>
                  <div className="w-full border border-slate-100 bg-slate-50 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-400 flex items-center justify-between">
                    <span>{editTarget.instructorId}</span>
                    <span className="text-xs bg-slate-200 text-slate-500 px-2 py-0.5 rounded font-sans">read-only</span>
                  </div>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Full Name *</label>
                <input type="text" placeholder="e.g. Sarah Chen"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Job Title *</label>
                <input type="text" placeholder="e.g. Full Stack Architect"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Specialty *</label>
                <select value={form.specialty}
                  onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option>Design</option>
                  <option>Development</option>
                  <option>Analysis</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Bio *</label>
                <textarea rows={3} placeholder="Short description about the instructor..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Profile Image URL</label>
                <input type="text" placeholder="https://..."
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {form.image && (
                  <img src={form.image} alt="preview"
                    className="mt-2 w-16 h-16 rounded-xl object-cover border border-slate-100" />
                )}
              </div>

              {/* Rating / Students / Courses */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Rating</label>
                  <input type="number" step="0.1" min="0" max="5" placeholder="4.9"
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Students</label>
                  <input type="text" placeholder="12,400+"
                    value={form.students}
                    onChange={(e) => setForm({ ...form, students: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Courses</label>
                  <input type="number" min="0" placeholder="14"
                    value={form.courses}
                    onChange={(e) => setForm({ ...form, courses: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>

            {msg && (
              <div className={`mt-4 px-4 py-3 rounded-xl text-sm font-medium ${
                msg.type === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
                {msg.text}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-sm transition">
                {saving ? "Saving..." : editTarget ? "Update Instructor" : "Add Instructor"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Delete Instructor?</h2>
            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-slate-800">"{deleteTarget.name}"</span>?
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteTarget(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition">
                Cancel
              </button>
              <button onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}