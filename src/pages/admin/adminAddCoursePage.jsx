import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";
import { FiX, FiUploadCloud } from "react-icons/fi"; // Added icons

export default function AdminAddCoursePage() {
    const navigate = useNavigate();

    const [courseId, setCourseId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [labelledPrice, setLabelledPrice] = useState("");
    const [file, setFile] = useState(null);
    const [instructor, setInstructor] = useState("");
    const [duration, setDuration] = useState("");
    const [category, setCategory] = useState("");
    const [isAvailable, setIsAvailable] = useState(true);
    const [uploading, setUploading] = useState(false);

    async function handleSubmit() {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You must be logged in as admin");
            navigate("/login");
            return;
        }

        if (courseId === "" || price === "" || category === "") {
            toast.error("Please fill required fields");
            return;
        }

        let thumbnail = "";

        // SINGLE IMAGE UPLOAD
        if (file) {
            setUploading(true);

            try {
                thumbnail = await uploadFile(file);
                setUploading(false);
            } catch (err) {
                toast.error("Error uploading image. Please try again.");
                console.log("Upload error:", err);
                setUploading(false);
                return;
            }
        }

        try {
            await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/courses",
                {
                    courseId,
                    title,
                    description,
                    price,
                    labelledPrice,
                    thumbnail,
                    instructor,
                    duration,
                    category,
                    isAvailable,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            toast.success("Course added successfully");
            navigate("/admin/courses");
        } catch (err) {
            toast.error("Error adding Course. Please try again");
            console.log("RESPONSE:", err.response);
            console.log("Error:", err);
        }
    }

    return (
        <div className="w-full min-h-screen bg-slate-50 p-6 md:p-12 flex justify-center items-start font-sans overflow-y-auto">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 relative">
                
                {/* ── Header & Close Button ── */}
                <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Add New Course</h1>
                        <p className="text-slate-500 text-sm mt-1">Fill in the details below to create a new course.</p>
                    </div>
                    <button 
                        onClick={() => navigate("/admin/courses")}
                        className="p-2.5 bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-all duration-200"
                        title="Close"
                    >
                        <FiX size={22} />
                    </button>
                </div>

                {/* ── Form Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    
                    {/* Course ID */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Course ID <span className="text-red-500">*</span></label>
                        <input
                            placeholder="e.g. CRS-101"
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value)}
                            className="w-full border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Course Title */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Course Title</label>
                        <input
                            placeholder="Enter course title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Category <span className="text-red-500">*</span></label>
                        <input
                            placeholder="e.g. Programming, Design"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Instructor */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Instructor Name</label>
                        <input
                            placeholder="Enter instructor's name"
                            value={instructor}
                            onChange={(e) => setInstructor(e.target.value)}
                            className="w-full border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Price (LKR) <span className="text-red-500">*</span></label>
                        <input
                            type="number"
                            placeholder="0.00"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Labelled Price */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Labelled Price (Optional)</label>
                        <input
                            placeholder="Discounted from"
                            value={labelledPrice}
                            onChange={(e) => setLabelledPrice(e.target.value)}
                            className="w-full border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Duration</label>
                        <input
                            placeholder="e.g. 5h 30m"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="w-full border border-slate-200 bg-slate-50/50 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-semibold text-slate-700">Course Thumbnail</label>
                        <div className="relative border-2 border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-colors rounded-xl p-3 flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-200">
                                <FiUploadCloud className="text-blue-500" size={20} />
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <div className="text-sm text-slate-500">
                                {file ? <span className="font-medium text-slate-800">{file.name}</span> : <span>Click or drag image to upload</span>}
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5 md:col-span-2">
                        <label className="text-sm font-semibold text-slate-700">Course Description</label>
                        <textarea
                            placeholder="Write a detailed description about the course..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full border border-slate-200 bg-slate-50/50 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all min-h-[120px] resize-y"
                        />
                    </div>
                </div>

                {/* ── Footer Actions ── */}
                <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                    
                    {/* Availability Toggle */}
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                className="sr-only"
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                            />
                            <div className={`block w-12 h-7 rounded-full transition-colors ${isAvailable ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${isAvailable ? 'transform translate-x-5' : ''}`}></div>
                        </div>
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                            {isAvailable ? 'Course is Active & Visible' : 'Course is Hidden'}
                        </span>
                    </label>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => navigate("/admin/courses")}
                            className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={uploading}
                            className="flex-1 sm:flex-none px-8 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                        >
                            {uploading ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Uploading...
                                </>
                            ) : (
                                "Save Course"
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}