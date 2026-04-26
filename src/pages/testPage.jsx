// import { useState } from "react";
// import uploadFile from "../utils/mediaUpload";

// export default function Test() {

//   const [file, setFile] = useState(null);

//   async function handleUpload() {
//     const url = await uploadFile(file);
//     console.log(url);
//   }

//   return (
//     <div className="w-full h-full flex justify-center items-center gap-4">
      
//       <input
//         type="file"
//         onChange={(e) => {
//           setFile(e.target.files[0]);
//         }}
//       />

//       <button
//         className="bg-red-900 px-10 py-2 rounded-md text-white "
//         onClick={handleUpload}
//       >
//         Upload
//       </button>

//     </div>
//   );
// }


import { useState } from "react";
import uploadVideo from "../utils/videoUpload";

export default function Test() {

  const [file, setFile] = useState(null);

  async function handleUpload() {
    const url = await uploadVideo(file);
    console.log(url);
  }

  return (
    <div className="w-full h-full flex justify-center items-center gap-4">
      
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />

      <button
        className="bg-red-900 px-10 py-2 rounded-md text-white "
        onClick={handleUpload}
      >
        Upload
      </button>

    </div>
  );
}


// import { useState } from "react";
// import { getCart, addToCart } from "../utils/cart";
// import { BsChevronUp } from "react-icons/bs";
// import { useLocation } from "react-router-dom";

// export default function CheckOutPage() {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [cart, setCart] = useState(location.state);

//     if(location.state == null){
//         navigate("/course");
//     }

//     function getCartTotal(){
//         let total = 0;
//         cart.forEach(item)=>{
//             total += item.price * item.quantity
//         }
//     }
//     return total;

//     const handleUpdateQuantity = (item, amount) => {
//         addToCart(item, amount);
//         setCart(getCart()); // Refresh UI
//     };

//     return (
//         <div className="pt-24 px-8 flex flex-col items-center gap-4 min-h-screen bg-gray-50">
//             <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            
//             {cart.length > 0 ? (
//                 <>
//                     {cart.map((item, index) => (
//                         <div key={item.courseId} className="w-full lg:w-[60%] h-[150px] rounded-xl overflow-hidden shadow-sm border bg-white flex justify-between">
//                             <img src={item.thumbnail} alt={item.title} className="h-full aspect-square object-cover" />

//                             <div className="flex flex-col justify-center flex-1 pl-6">
//                                 <h1 className="text-lg font-bold text-slate-800">{item.title}</h1>
//                                 <p className="text-blue-600 font-semibold">LKR. {item.price.toFixed(2)}</p>
//                             </div>

//                             <div className="h-full flex items-center gap-6 pr-8">
//                                 <div className="flex flex-col items-center gap-1">
//                                     <BsChevronUp className="text-xl cursor-pointer hover:text-blue-600" 
//                                     onClick={()=>{
//                                         const copiedCart = [...cart]
//                                         compiedCard[index].quantity += 1
//                                         setCart(copiedCard)
//                                     }} />
//                                     <span className="text-lg font-bold">{item.quantity}</span>
//                                     <BsChevronUp className="text-xl cursor-pointer hover:text-blue-600 rotate-180" 
//                                     onClick={()=>{
//                                         const copiedCart = [...cart]
//                                         copiedCard[index].quantity = 1
//                                         if(copiedCard[index].quantity < 1){
//                                             copiedCard.splice(index, 1)
//                                         }
//                                         setCart(copiedCart)
//                                     }} />
//                                 </div>
//                                 <div className="w-[120px] text-right font-bold text-slate-700">
//                                     LKR. {(item.price * item.quantity).toFixed(2)}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}

//                     <div className="w-full lg:w-[60%] flex justify-end p-6 bg-white rounded-xl shadow-sm border mt-4">
//                         <button className="self-center ml-4 px-6 py-3 rounder bg-blue-400 transition">
//                         Order Now
//                         </button>
//                         <span className="pr-4 text-x1 font-bold w-[150px] text-right">
//                           LKR. {getCartTotal().toFixed(2)}
//                         </span>

//                         <div className="text-right">
//                             <p className="text-gray-500">Total Amount:</p>
//                             <h2 className="text-3xl font-black text-blue-700">
//                                 LKR. {cart.reduce((acc, cv) => acc + (cv.price * cv.quantity), 0).toFixed(2)}
//                             </h2>
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <div className="text-center mt-20">
//                     <h2 className="text-2xl text-gray-400">Your cart is empty</h2>
//                     <button onClick={() => window.history.back()} className="mt-4 text-blue-600 font-bold underline">Go Back</button>
//                 </div>
//             )}
//         </div>
//     );
// }





// import { useState } from "react";
// import { getCart, addToCart } from "../utils/cart";
// import { BsChevronUp } from "react-icons/bs";

// export default function CartPage() {
//     const [cart, setCart] = useState(getCart());

//     const handleUpdateQuantity = (item, amount) => {
//         addToCart(item, amount);
//         setCart(getCart()); // Refresh UI
//     };

//     return (
//         <div className="pt-24 px-8 flex flex-col items-center gap-4 min-h-screen bg-gray-50">
//             <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            
//             {cart.length > 0 ? (
//                 <>
//                     {cart.map((item) => (
//                         <div key={item.courseId} className="w-full lg:w-[60%] h-[150px] rounded-xl overflow-hidden shadow-sm border bg-white flex justify-between">
//                             <img src={item.thumbnail} alt={item.title} className="h-full aspect-square object-cover" />

//                             <div className="flex flex-col justify-center flex-1 pl-6">
//                                 <h1 className="text-lg font-bold text-slate-800">{item.title}</h1>
//                                 <p className="text-blue-600 font-semibold">LKR. {item.price.toFixed(2)}</p>
//                             </div>

//                             <div className="h-full flex items-center gap-6 pr-8">
//                                 <div className="flex flex-col items-center gap-1">
//                                     <BsChevronUp className="text-xl cursor-pointer hover:text-blue-600" onClick={() => handleUpdateQuantity(item, 1)} />
//                                     <span className="text-lg font-bold">{item.quantity}</span>
//                                     <BsChevronUp className="text-xl cursor-pointer hover:text-blue-600 rotate-180" onClick={() => handleUpdateQuantity(item, -1)} />
//                                 </div>
//                                 <div className="w-[120px] text-right font-bold text-slate-700">
//                                     LKR. {(item.price * item.quantity).toFixed(2)}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}

//                     <div className="w-full lg:w-[60%] flex justify-end p-6 bg-white rounded-xl shadow-sm border mt-4">
//                         <div className="text-right">
//                             <p className="text-gray-500">Total Amount:</p>
//                             <h2 className="text-3xl font-black text-blue-700">
//                                 LKR. {cart.reduce((acc, cv) => acc + (cv.price * cv.quantity), 0).toFixed(2)}
//                             </h2>
//                         </div>
//                     </div>
//                 </>
//             ) : (
//                 <div className="text-center mt-20">
//                     <h2 className="text-2xl text-gray-400">Your cart is empty</h2>
//                     <button onClick={() => window.history.back()} className="mt-4 text-blue-600 font-bold underline">Go Back</button>
//                 </div>
//             )}
//         </div>
//     );
// }







// import { Routes, Route, Link } from 'react-router-dom';
// import { MdDashboard } from "react-icons/md";
// import { IoCalendarClear } from "react-icons/io5";
// import { BiSolidVideos } from "react-icons/bi";
// import { FaUsers } from "react-icons/fa";
// import { GiTeacher } from "react-icons/gi";
// import { FaBookOpenReader } from "react-icons/fa6";

// import AdminCoursePage from "./admin/adminCoursePage";
// import AdminAddCoursePage from './admin/adminAddCoursePage';
// import AdminUpdateCoursePage from './admin/adminUpdateCoursePage';
// import AdminOrdersPage from './admin/adminOrdersPage';
// import { useEffect } from 'react';
// import Loader from '../components/loader';

// export default function Admin() {

//   const [user, setUser] = useEffect(null);

//   useEffect{()=>{
//     const token = localStorage.getItem("token");
//     if(token == null){
//       window.location: `Bearer ${token}`,
//     },
//   }).then((response)=>{
//     if(response.data.role == "admin"){
//       setUser(response.data);

//     }else{
//       window.location.href = "/";
//     }
//   }).catch(()=>{
//     window.location.href = "/login";
//   })
// },[]}



//   return (
//     <div className="w-screen h-screen bg-[#ac1d1d] flex">
//       {user?
//       <>
//       <div className="h-full w-[300px] bg-[#0F172A] flex flex-col">
//         <div className="w-[300px] h-[40px] bg-[#0F172A] text-[#60A5FA] border-b-2 border-[#ffffff]/50 flex items-center justify-center">
//           Scholarly
//         </div>
//         <div className="h-full w-[300px] bg-[#0F172A] flex flex-col">
//           <Link className="h-[50px] my-2 flex items-center gap-3 px-4 text-white bg-[#1E293B] hover:bg-blue-500 rounded-lg transition" to="/admin/">
//             <MdDashboard size={20} /> Dashboard
//           </Link>
//           <Link className="h-[50px] my-2 flex items-center gap-3 px-4 text-white bg-[#1E293B] hover:bg-blue-500 rounded-lg transition" to="/admin/courses">
//             <IoCalendarClear size={20} /> Courses
//           </Link>
//           <Link className="h-[50px] my-2 flex items-center gap-3 px-4 text-white bg-[#1E293B] hover:bg-blue-500 rounded-lg transition" to="/admin/videos">
//             <BiSolidVideos size={20} /> Videos
//           </Link>
//           <Link className="h-[50px] my-2 flex items-center gap-3 px-4 text-white bg-[#1E293B] hover:bg-blue-500 rounded-lg transition" to="/admin/users">
//             <FaUsers size={20} /> Users
//           </Link>
//           <Link className="h-[50px] my-2 flex items-center gap-3 px-4 text-white bg-[#1E293B] hover:bg-blue-500 rounded-lg transition" to="/admin/teachers">
//             <GiTeacher size={20} /> Teachers
//           </Link>
//           <Link className="h-[50px] my-2 flex items-center gap-3 px-4 text-white bg-[#1E293B] hover:bg-blue-500 rounded-lg transition" to="/admin/enrollments">
//             <FaBookOpenReader size={20} /> Enrollments
//           </Link>
//         </div>
//       </div>
      
        
//       {/* This is my Route box */}
//       <div className="h-full w-[calc(100%-300px)] bg-[#F9FAFB]">
//         <Routes>
//           <Route path="/" element={<AdminOrdersPage />} />
//           <Route path="/courses" element={<AdminCoursePage />} />
//           <Route path="/update-course" element={<AdminUpdateCoursePage />} />
//           <Route path="/videos" element={<h1>Videos Page</h1>} />
//           <Route path="/users" element={<h1>Users Page</h1>} />
//           <Route path="/teachers" element={<h1>Teachers Page</h1>} />
//           <Route path="/enrollments" element={<h1>Enrollments Page</h1>} />
//           <Route path="/add-course" element={<AdminAddCoursePage />} />
//         </Routes>
//       </div>
//       </>:
//       <Loader/>
//     </div>
//   );
// }