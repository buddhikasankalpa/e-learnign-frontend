import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../components/loader";
import { getCart, addToCart } from "../utils/cart"; 

export default function ProductOverview() {
  const params = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    axios
      .get(`${backendUrl}/courses/${params.courseId}`)
      .then((response) => {
        setCourse(response.data);
        setStatus("success");
      })
      .catch((error) => {
        console.error("API Error:", error);
        toast.error("Course not found");
        setStatus("error");
      });
  }, [params.courseId]);

  return (
    <div className="w-full min-h-screen bg-white">
      {status === "loading" && (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {status === "error" && (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-gray-800">Oops! Course Not Found</h1>
          <p className="text-gray-500 mt-2">Please try again.</p>
        </div>
      )}

      {status === "success" && course && (
        <main className="pt-24 pb-20 px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            <section className="space-y-4">
              <nav className="flex gap-2 text-sm text-gray-500">
                <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate("/")}>Course Catalog</span>
                <span>/</span>
                <span className="hover:text-blue-600 cursor-pointer">{course.category || "General"}</span>
                <span>/</span>
                <span className="text-gray-900 truncate max-w-[200px] inline-block align-bottom font-medium">{course.title}</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-500 leading-relaxed">
                {course.description || "Learn from the best and master your skills with our professional curriculum."}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-1 bg-orange-50 px-3 py-1 rounded-full">
                  <span className="font-bold text-orange-600">⭐ 4.9</span>
                  <span className="text-xs text-orange-500 ml-1">(2.4k ratings)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                   <span>👨‍🏫 By {course.instructor || "Expert Instructor"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                  <span>👥 12,450 students enrolled</span>
                </div>
              </div>
            </section>

            <section className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gray-100 border border-gray-100">
              <img 
                src={course.thumbnail || "https://via.placeholder.com/1280x720"} 
                alt={course.title} 
                className="w-full h-full object-cover"
              />
            </section>

            <section className="bg-gray-50 p-8 rounded-3xl space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Comprehensive understanding of core concepts.",
                  "Hands-on experience with real-world projects.",
                  "Mastering industry-standard tools and techniques.",
                  "Developing a professional mindset and workflow.",
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-blue-600 font-bold">✓</span>
                    <p className="text-gray-600 text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
                <span className="text-sm text-gray-500 font-semibold">{course.duration || "12h 45m"} total length</span>
              </div>
              <div className="space-y-4">
                {["Getting Started", "Foundations & Basics", "Advanced Techniques"].map((section, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="p-6 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <h3 className="font-bold text-gray-800">{section}</h3>
                      <span className="text-xs text-gray-500 font-bold uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-lg">Module {i + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="text-4xl font-black text-gray-900">LKR. {course.price}</span>
                    {course.labelledPrice && (
                      <>
                        <span className="text-gray-400 line-through text-lg">LKR. {course.labelledPrice}</span>
                        <span className="text-orange-600 font-bold text-sm bg-orange-50 px-2 py-1 rounded-lg ml-auto">
                          {Math.round(((course.labelledPrice - course.price) / course.labelledPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <div className="space-y-3">
                    <button
                      className="w-full py-4 bg-blue-600 text-white font-extrabold rounded-2xl text-lg hover:bg-blue-700 hover:scale-[0.98] transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                      onClick={() => {
                          navigate("/checkout", {
                            state: {
                              cart: [{          
                                courseId: course.courseId,
                                title: course.title,
                                description: course.description,
                                price: course.price,
                                labelledPrice: course.labelledPrice,
                                thumbnail: course.thumbnail,
                                instructor: course.instructor,
                                duration: course.duration,
                                category: course.category,
                                isAvailable: course.isAvailable,
                                quantity: 1    
                              }]
                            }
                          });
                        }}
                    >
                      Buy Now
                    </button>
                    <button 
                      className="w-full py-4 bg-gray-50 text-gray-900 font-bold rounded-2xl border border-gray-200 hover:bg-gray-100 transition-all active:scale-95 cursor-pointer"
                      onClick={() => addToCart(course, 1)}
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-gray-100">
                    <p className="font-bold text-xs uppercase tracking-widest text-gray-400">This course includes:</p>
                    <ul className="space-y-3">
                      {[
                        "Lifetime access to content", 
                        "Professional resources", 
                        "Access on mobile and desktop", 
                        "Certificate of completion"
                      ].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                          <span className="text-blue-500 text-lg leading-none">✓</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          
        </main>
      )}
    </div>
  );
}