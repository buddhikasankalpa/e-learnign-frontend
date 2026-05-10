import { useEffect, useState } from "react";
import axios from "axios";
import uploadFile from "../../utils/videoUpload"; // Supabase Videos bucket

const BACKEND = import.meta.env.VITE_BACKEND_URL;

const emptyForm = {
  videoId: "",
  courseId: "",
  title: "",
  videoUrl: "",
  duration: "",
  order: 1,
  isPreview: false,
};

export default function AdminVideosPage() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [coursesLoaded, setCoursesLoaded] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editVideo, setEditVideo] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [msg, setMsg] = useState(null);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  // ── Fetch courses ──────────────────────────────────────────────
  useEffect(() => {
    axios
      .get(BACKEND + "/courses", { headers })
      .then((res) => {
        setCourses(res.data);
        setCoursesLoaded(true);
      })
      .catch(() => setCoursesLoaded(true));
  }, []);

  // ── Fetch videos when course selected ─────────────────────────
  function selectCourse(course) {
    setSelectedCourse(course);
    setVideosLoaded(false);
    setVideos([]);
    setMsg(null);
    axios
      .get(BACKEND + "/course-videos/course/" + course.courseId, { headers })
      .then((res) => {
        setVideos(res.data);
        setVideosLoaded(true);
      })
      .catch(() => setVideosLoaded(true));
  }

  function refreshVideos() {
    if (!selectedCourse) return;
    axios
      .get(BACKEND + "/course-videos/course/" + selectedCourse.courseId, { headers })
      .then((res) => setVideos(res.data))
      .catch(() => {});
  }

  // ── Open add form ──────────────────────────────────────────────
  function openAdd() {
    setForm({ ...emptyForm, courseId: selectedCourse?.courseId || "" });
    setEditVideo(null);
    setVideoFile(null);
    setMsg(null);
    setShowForm(true);
  }

  // ── Open edit form ─────────────────────────────────────────────
  function openEdit(v) {
    setForm({
      videoId: v.videoId,
      courseId: v.courseId,
      title: v.title,
      videoUrl: v.videoUrl,
      duration: v.duration,
      order: v.order,
      isPreview: v.isPreview,
    });
    setEditVideo(v);
    setVideoFile(null);
    setMsg(null);
    setShowForm(true);
  }

  // ── Save (add or update) ───────────────────────────────────────
  async function handleSave() {
    setSaving(true);
    setMsg(null);

    let videoUrl = form.videoUrl;

    // Upload new video file if selected
    if (videoFile) {
      setUploading(true);
      try {
        videoUrl = await uploadFile(videoFile);
        setUploading(false);
      } catch (err) {
        setMsg({ type: "error", text: "Video upload failed. Please try again." });
        setUploading(false);
        setSaving(false);
        return;
      }
    }

    try {
      if (editVideo) {
        const { videoId, ...updateData } = form;
        await axios.put(
          BACKEND + "/course-videos/" + editVideo.videoId,
          { ...updateData, videoUrl },
          { headers }
        );
        setMsg({ type: "success", text: "Video updated successfully!" });
      } else {
        await axios.post(BACKEND + "/course-videos", { ...form, videoUrl }, { headers });
        setMsg({ type: "success", text: "Video added successfully!" });
      }
      setShowForm(false);
      refreshVideos();
    } catch (e) {
      setMsg({ type: "error", text: e.response?.data?.message || "Error saving video." });
    } finally {
      setSaving(false);
    }
  }

  // ── Delete ─────────────────────────────────────────────────────
  async function handleDelete() {
    try {
      await axios.delete(BACKEND + "/course-videos/" + deleteTarget.videoId, { headers });
      setMsg({ type: "success", text: "Video deleted." });
      setDeleteTarget(null);
      refreshVideos();
    } catch {
      setMsg({ type: "error", text: "Failed to delete video." });
      setDeleteTarget(null);
    }
  }

  // ══════════════════════════════════════════════════════════════
  return (
    <div className="w-full min-h-screen bg-[#f8fafc] font-sans flex">

      {/* ── Left Panel: Courses List ─────────────────────────── */}
      <div className="w-72 min-h-screen bg-white border-r border-slate-200 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-100">
          <h2 className="text-base font-extrabold text-slate-800">Courses</h2>
          <p className="text-xs text-slate-400 mt-0.5">Select a course to manage videos</p>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          {!coursesLoaded ? (
            <p className="text-xs text-slate-400 px-5 py-4">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-xs text-slate-400 px-5 py-4">No courses found.</p>
          ) : (
            courses.map((c) => (
              <button
                key={c.courseId}
                onClick={() => selectCourse(c)}
                className={`w-full text-left px-5 py-3.5 flex items-center gap-3 transition-colors border-l-2 ${
                  selectedCourse?.courseId === c.courseId
                    ? "bg-blue-50 border-l-blue-600 text-blue-700"
                    : "border-l-transparent hover:bg-slate-50 text-slate-700"
                }`}
              >
                {c.thumbnail ? (
                  <img
                    src={c.thumbnail}
                    alt={c.title}
                    className="w-10 h-10 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="text-blue-600 text-xs font-bold">
                      {c.title?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate leading-snug">{c.title}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{c.courseId}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── Right Panel: Videos ──────────────────────────────── */}
      <div className="flex-1 p-6 lg:p-10 flex flex-col">

        {!selectedCourse ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-3xl">🎬</span>
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-1">Select a Course</h3>
            <p className="text-sm text-slate-400 max-w-xs">
              Choose a course from the left panel to view and manage its videos.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                  {selectedCourse.title}
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                  Video Management &nbsp;·&nbsp;
                  <span className="font-mono">{selectedCourse.courseId}</span>
                </p>
              </div>
              <button
                onClick={openAdd}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow"
              >
                + Add Video
              </button>
            </div>

            {/* Global message */}
            {msg && (
              <div
                className={`mb-5 px-4 py-3 rounded-xl text-sm font-medium ${
                  msg.type === "success"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-red-50 text-red-600 border border-red-100"
                }`}
              >
                {msg.text}
              </div>
            )}

            {/* Videos table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex-1">
              {!videosLoaded ? (
                <div className="py-20 text-center text-slate-400 text-sm">Loading videos...</div>
              ) : videos.length === 0 ? (
                <div className="py-20 text-center">
                  <p className="text-slate-400 text-sm mb-3">No videos yet for this course.</p>
                  <button
                    onClick={openAdd}
                    className="bg-blue-600 text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-blue-700 transition"
                  >
                    + Add First Video
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">Video ID</th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">Title</th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">Duration</th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">Order</th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase">Preview</th>
                        <th className="px-5 py-4 text-xs font-bold text-slate-500 uppercase text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {videos.map((v) => (
                        <tr key={v.videoId} className="hover:bg-blue-50/30 transition-colors">
                          <td className="px-5 py-4">
                            <span className="font-mono text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                              {v.videoId}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              {/* Video icon placeholder */}
                              <div className="w-14 h-10 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
                                <span className="text-slate-400 text-lg">🎥</span>
                              </div>
                              <span className="font-semibold text-slate-800 max-w-[220px] truncate">
                                {v.title}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-slate-600">{v.duration}</td>
                          <td className="px-5 py-4 text-slate-600">{v.order}</td>
                          <td className="px-5 py-4">
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                                v.isPreview
                                  ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                  : "bg-slate-100 text-slate-500 border-slate-200"
                              }`}
                            >
                              {v.isPreview ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => openEdit(v)}
                                className="text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setDeleteTarget(v)}
                                className="text-xs font-bold bg-red-50 text-red-500 hover:bg-red-100 px-3 py-1.5 rounded-lg transition"
                              >
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
          </>
        )}
      </div>

      {/* ══ Add / Edit Modal ════════════════════════════════════ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">
                {editVideo ? "Edit Video" : "Add New Video"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-slate-400 hover:text-slate-600 text-2xl font-bold leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              {/* Video ID */}
              {!editVideo ? (
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Video ID *</label>
                  <input
                    type="text"
                    placeholder="e.g. VID001"
                    value={form.videoId}
                    onChange={(e) => setForm({ ...form, videoId: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Video ID</label>
                  <div className="w-full border border-slate-100 bg-slate-50 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-400 flex items-center justify-between">
                    <span>{editVideo.videoId}</span>
                    <span className="text-xs bg-slate-200 text-slate-500 px-2 py-0.5 rounded font-sans">read-only</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    To update the Video ID, delete the current one and add a new one.
                  </p>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Introduction to React"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Video File Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  Video File *{editVideo && " (leave empty to keep existing)"}
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0] || null)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                />

                {/* Preview: newly selected file */}
                {videoFile && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-slate-100 bg-black">
                    <video
                      src={URL.createObjectURL(videoFile)}
                      controls
                      className="w-full max-h-48 object-contain"
                    />
                  </div>
                )}

                {/* Preview: existing uploaded video (edit mode, no new file chosen) */}
                {!videoFile && editVideo && form.videoUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-slate-100 bg-black">
                    <video
                      src={form.videoUrl}
                      controls
                      className="w-full max-h-48 object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Duration *</label>
                <input
                  type="text"
                  placeholder="e.g. 12:35"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Order */}
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Order *</label>
                <input
                  type="number"
                  min="1"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 1 })}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Is Preview */}
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-xl">
                <input
                  type="checkbox"
                  id="isPreview"
                  checked={form.isPreview}
                  onChange={(e) => setForm({ ...form, isPreview: e.target.checked })}
                  className="w-4 h-4 accent-blue-600"
                />
                <label htmlFor="isPreview" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Free Preview{" "}
                  <span className="text-slate-400 font-normal">(non-enrolled users can watch)</span>
                </label>
              </div>
            </div>

            {/* Modal message */}
            {msg && (
              <div
                className={`mt-4 px-4 py-3 rounded-xl text-sm font-medium ${
                  msg.type === "success"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-600"
                }`}
              >
                {msg.text}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold py-2.5 rounded-xl text-sm transition"
              >
                {uploading ? "Uploading..." : saving ? "Saving..." : editVideo ? "Update Video" : "Add Video"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ Delete Confirm Modal ═════════════════════════════════ */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Delete Video?</h2>
            <p className="text-sm text-slate-500 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-800">"{deleteTarget.title}"</span>? This
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl text-sm transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}