import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 

export default function UserData() {
  const [user, setUser] = useState(null);
  // state of dropdown open/close
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token != null) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/users/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

  // Default image generated using the user's first name
  const defaultImage = `https://ui-avatars.com/api/?name=${user?.firstName || 'User'}&background=2563eb&color=fff&rounded=true`;

  return (
    <>
      {user ? (
        <div className="flex flex-row items-center relative">
          <img referrerPolicy="no-referrer"
            src={user.image || defaultImage} 
            onError={(e) => { e.target.src = defaultImage; }} // Fallback if image link is broken
            className="w-[42px] h-[42px] rounded-full object-cover border-2 border-blue-100 shadow-sm cursor-pointer" 
            alt="User profile"
            onClick={() => setIsOpen(!isOpen)} 
          />
          
          <div className="relative ml-2">
            {/* name and arrow */}
            <div 
              className="flex items-center text-slate-700 font-semibold cursor-pointer select-none hover:text-blue-600 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {user.firstName}
              <svg 
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>

            {/* Dropdown Menu*/}
            {isOpen && (
              <div className="absolute right-0 top-full mt-3 w-40 bg-white border border-slate-100 rounded-xl shadow-lg py-2 z-50">
                <button 
                  className="block w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => {
                    window.location.href = "/orders";
                    setIsOpen(false);
                  }}
                >
                  My Courses
                </button>
                <button 
                  className="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <Link to="/login" className="text-slate-600 hover:text-blue-600 font-bold text-base transition-all">
            Login
          </Link>
          <Link to="/register" className="bg-blue-600 text-white px-7 py-2.5 rounded-xl font-bold text-base hover:bg-blue-700 transition-all duration-200 shadow-sm">
            Sign Up
          </Link>
        </div>
      )}
    </>
  );
}