import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link, useNavigate, useLocation} from "react-router-dom";
import Loader from "../../components/loader";
import CourseDeleteButton from "../../components/courseDeleteButton";


export default function AdminCoursePage() {
  const [course, setProducts] = useState([]);
  const [loaded, setloaded] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();


  useEffect(() => {
    if(!loaded){
      axios
      .get(import.meta.env.VITE_BACKEND_URL + "/courses")
      .then((response) => {
          console.log(response.data);
          setProducts(response.data);
          setloaded(true);
      });
    }
    
  }, [loaded]);
  

  return (
    <div className="w-full min-h-screen bg-gray-50 p-8 flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Admin Courses</h1>

        <Link
          to="/admin/add-course"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
        >
          <BiPlus size={20} />
          Add Course
        </Link>
      </div>

      {/* Table Container */}
      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200/60">

        {loaded ? (
          <table className="w-full text-sm text-left border-collapse">

            {/* Table Head */}
            <thead className="border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Thumbnail</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Course ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Labelled Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {course.map((item) => {
                return (
                  <tr
                    key={item.courseId}
                    className="hover:bg-blue-50/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={item.thumbnail || "/default-course.png"}
                        className="w-[60px] h-[60px] object-cover rounded-lg border border-slate-100"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {item.courseId}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-800">{item.title}</td>

                    <td className="px-6 py-4 max-w-[200px] truncate text-slate-500 text-sm">
                      {item.description}
                    </td>

                    <td className="px-6 py-4 text-blue-600 font-semibold">
                      ${item.price}
                    </td>

                    <td className="px-6 py-4 line-through text-slate-400">
                      {item.labelledPrice}
                    </td>

                    <td className="px-6 py-4 text-slate-600">{item.instructor}</td>

                    <td className="px-6 py-4 text-slate-600">{item.duration}</td>

                    <td className="px-6 py-4 text-slate-600">{item.category}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          item.isAvailable
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                            : "bg-red-50 text-red-500 border-red-100"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${item.isAvailable ? "bg-emerald-500" : "bg-red-500"}`} />
                        {item.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition"
                          onClick={() => navigate("/admin/update-course", { state: item })}
                        >
                          Edit
                        </button>
                        <CourseDeleteButton courseId={item.courseId} reload={() => { setloaded(false) }} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        ) : (
          <div className="py-20 flex justify-center">
            <Loader />
          </div>
        )}
      </div>

    </div>
  );
}
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { BiPlus } from "react-icons/bi";
// import { Link, useNavigate, useLocation} from "react-router-dom";
// import Loader from "../../components/loader";
// import CourseDeleteButton from "../../components/courseDeleteButton";


// export default function AdminCoursePage() {
//   const [course, setProducts] = useState([]);
//   const [loaded, setloaded] = useState(false);
//   const navigate = useNavigate()
//   const location = useLocation();


//   useEffect(() => {
//     if(!loaded){
//       axios
//       .get(import.meta.env.VITE_BACKEND_URL + "/courses")
//       .then((response) => {
//           console.log(response.data);
//           setProducts(response.data);
//           setloaded(true);
//       });
//     }
    
//   }, [loaded]);
  

//   return (
//     <div className="w-full min-h-screen bg-gray-50 p-8 flex flex-col">

//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Admin Courses</h1>

//         <Link
//           to="/admin/add-course"
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
//         >
//           <BiPlus size={20} />
//           Add Course
//         </Link>
//       </div>

//       {/* Table Container */}
//       <div className="w-full overflow-x-auto bg-white rounded-xl shadow-md">

//         {loaded? <table className="w-full text-sm text-left">

//           {/* Table Head */}
//           <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
//             <tr>
//               <th className="px-4 py-3">Thumbnail</th>
//               <th className="px-4 py-3">Course ID</th>
//               <th className="px-4 py-3">Title</th>
//               <th className="px-4 py-3">Description</th>
//               <th className="px-4 py-3">Price</th>
//               <th className="px-4 py-3">Labelled Price</th>
//               <th className="px-4 py-3">Instructor</th>
//               <th className="px-4 py-3">Duration</th>
//               <th className="px-4 py-3">Category</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           {/* Table Body */}
//           <tbody>
//             {course.map((item) => {
//               return (
//                 <tr
//                   key={item.courseId}
//                   className="border-b hover:bg-gray-50 transition"
//                 >
//                   <td className="px-4 py-3">
//                     <img
//                       src={item.thumbnail || "/default-course.png"}
//                       className="w-[70px] h-[70px] object-cover rounded-lg border"
//                     />
//                   </td>

//                   <td className="px-4 py-3 font-medium">{item.courseId}</td>

//                   <td className="px-4 py-3">{item.title}</td>

//                   <td className="px-4 py-3 max-w-[200px] truncate">
//                     {item.description}
//                   </td>

//                   <td className="px-4 py-3 text-blue-600 font-semibold">
//                     ${item.price}
//                   </td>

//                   <td className="px-4 py-3 line-through text-gray-400">
//                     {item.labelledPrice}
//                   </td>

//                   <td className="px-4 py-3">{item.instructor}</td>

//                   <td className="px-4 py-3">{item.duration}</td>

//                   <td className="px-4 py-3">{item.category}</td>

//                   <td className="px-4 py-3">
//                     <span
//                       className={`px-2 py-1 text-xs rounded-full ${
//                         item.isAvailable
//                           ? "bg-green-100 text-green-600"
//                           : "bg-red-100 text-red-600"
//                       }`}
//                     >
//                       {item.isAvailable ? "Available" : "Unavailable"}
//                     </span>
//                   </td>

//                   {/* Actions */}
//                   <td className="align-middle">
//                     <div className="flex items-center justify-center gap-2">
                    

//                     <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
//                     onClick={()=>{
//                       navigate("/admin/update-course", {state: item});
//                     }}
                    
//                     >
//                       Edit
//                     </button>

//                     <CourseDeleteButton courseId={item.courseId} reload={()=>{setloaded(false)}}/>
//                     </div>  
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>

//         </table>:<Loader/>}
//       </div>

//     </div>
//   );
// }