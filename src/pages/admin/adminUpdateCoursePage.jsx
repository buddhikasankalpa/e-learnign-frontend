import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function AdminUpdateCoursePage() {
    const navigate = useNavigate();
    const location = useLocation();
    const item = location.state;

    const [courseId] = useState(location.state.courseId);
    const [title, setTitle] = useState(location.state.title);
    const [description, setDescription] = useState(location.state.description);
    const [price, setPrice] = useState(location.state.price);
    const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
    const [files, setFiles] = useState([]);
    const [instructor, setInstructor] = useState(location.state.instructor);
    const [duration, setDuration] = useState(location.state.duration);
    const [category, setCategory] = useState(location.state.category);
    const [isAvailable, setIsAvailable] = useState(location.state.isAvailable);
    const [uploading, setUploading] = useState(false);

    async function handleSubmit() {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You must be logged in as admin");
            navigate("/login");
            return;
        }

        if (price === "" || category === "") {
            toast.error("Please fill required fields");
            return;
        }

        try {
            setUploading(true);

            let thumbnail = item.thumbnail;

            if (files.length > 0) {
                const imagePromises = [];

                for (let i = 0; i < files.length; i++) {
                    const promise = uploadFile(files[i]);
                    imagePromises.push(promise);
                }

                const images = await Promise.all(imagePromises).catch((err) => {
                    toast.error("Error uploading image. Try again.");
                    console.log(err);
                    return [];
                });

                if (images.length > 0) {
                    thumbnail = images[0];
                }
            }

            await axios.put(
                import.meta.env.VITE_BACKEND_URL + "/courses/" + courseId,
                {
                    title: title,
                    description: description,
                    price: price,
                    labelledPrice: labelledPrice,
                    thumbnail: thumbnail || item.thumbnail,
                    instructor: instructor,
                    duration: duration,
                    category: category,
                    isAvailable: isAvailable,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );

            toast.success("Course updated successfully");
            navigate("/admin/courses");

        } catch (err) {
            toast.error("Error updating Course. Please try again");
            console.log(err);
        } finally {
            setUploading(false);
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-50 p-6">
            <div className="w-full max-w-6xl bg-[#f4f7fc] border border-blue-100 rounded-xl p-8 shadow-sm">

                <h1 className="text-[#1a365d] font-bold text-xl mb-8">
                    Update Course
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-6">

                    <input
                        value={courseId}
                        disabled
                        className="border p-2.5 rounded-lg bg-gray-100 text-gray-400"
                    />

                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2.5 rounded-lg" />
                    <input value={instructor} onChange={(e) => setInstructor(e.target.value)} className="border p-2.5 rounded-lg" />

                    <input value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2.5 rounded-lg" />
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2.5 rounded-lg" />
                    <input value={labelledPrice} onChange={(e) => setLabelledPrice(e.target.value)} className="border p-2.5 rounded-lg" />

                    <input value={duration} onChange={(e) => setDuration(e.target.value)} className="border p-2.5 rounded-lg" />

                    <div className="md:col-span-2 flex items-center gap-4">
                        {item?.thumbnail && (
                            <img src={item.thumbnail} className="w-16 h-16 object-cover rounded-lg border" />
                        )}
                        <input
                            type="file"
                            multiple
                            className="border p-2.5 rounded-lg w-full"
                            onChange={(e) => setFiles(e.target.files)}
                        />
                    </div>

                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2.5 rounded-lg md:col-span-3 h-32" />

                    <div className="md:col-span-3 flex justify-between items-center mt-4">
                        <label className="flex gap-2 items-center">
                            <input type="checkbox" checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />
                            Available
                        </label>

                        <button
                            onClick={handleSubmit}
                            disabled={uploading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                        >
                            {uploading ? "Uploading..." : "Update Course"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}