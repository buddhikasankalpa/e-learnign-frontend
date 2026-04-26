import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

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
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 p-6">
            <div className="w-full max-w-6xl bg-[#f4f7fc] border border-blue-100 rounded-xl p-8 shadow-sm">

                <h1 className="text-[#1a365d] font-bold text-xl mb-8">
                    Add New Course
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">

                    <input
                        placeholder="course101"
                        value={courseId}
                        onChange={(e) => setCourseId(e.target.value)}
                        className="border p-2.5 rounded-lg"
                    />

                    <input
                        placeholder="Course Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border p-2.5 rounded-lg"
                    />

                    <input
                        placeholder="Instructor Name"
                        value={instructor}
                        onChange={(e) => setInstructor(e.target.value)}
                        className="border p-2.5 rounded-lg"
                    />

                    <input
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2.5 rounded-lg"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-2.5 rounded-lg"
                    />

                    <input
                        placeholder="Labelled Price"
                        value={labelledPrice}
                        onChange={(e) => setLabelledPrice(e.target.value)}
                        className="border p-2.5 rounded-lg"
                    />

                    <input
                        placeholder="Duration (e.g. 5h 30m)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="border p-2.5 rounded-lg"
                    />

                    {/* SINGLE IMAGE UPLOAD */}
                    <input
                        type="file"
                        accept="image/*"
                        className="border p-2.5 rounded-lg md:col-span-2"
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                        }}
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2.5 rounded-lg md:col-span-3 h-32"
                    />

                    <div className="md:col-span-3 flex justify-between items-center mt-4">

                        <label className="flex gap-2 items-center">
                            <input
                                type="checkbox"
                                checked={isAvailable}
                                onChange={(e) => setIsAvailable(e.target.checked)}
                            />
                            Available
                        </label>

                        <button
                            onClick={handleSubmit}
                            disabled={uploading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                        >
                            {uploading ? "Uploading..." : "Save Course"}
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}