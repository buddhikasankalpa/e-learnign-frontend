import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CourseDeleteButton({ courseId, reload }) {
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);

      const token = localStorage.getItem("token");

      await axios.delete(
        import.meta.env.VITE_BACKEND_URL + "/courses/" + courseId,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Product Deleted Successfully");

      setIsDeleting(false);
      setIsMessageOpen(false);

      reload(); // refresh table
    } catch (err) {
      console.log(err);
      toast.error("Product Delete failed");
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-400 transition"
        onClick={() => setIsMessageOpen(true)}
      >
        Delete
      </button>

      {isMessageOpen && (
        <div className="w-screen h-screen fixed top-0 left-0 bg-black/55 flex items-center justify-center">
          <div className="w-[400px] bg-white rounded-2xl p-6 relative flex flex-col items-center justify-center">

            <button
              className="w-10 h-10 bg-red-600 text-white rounded-full font-bold cursor-pointer hover:bg-red-800 absolute right-[-15px] top-[-15px]"
              onClick={() => setIsMessageOpen(false)}
            >
              X
            </button>

            <h1 className="text-xl mb-6 text-center">
              Are you sure you want to delete course <b>{courseId}</b>?
            </h1>

            <div className="flex gap-5">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                disabled={isDeleting}
                onClick={handleDelete}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>

              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={() => setIsMessageOpen(false)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}