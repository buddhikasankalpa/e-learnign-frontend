import { Link, useNavigate } from "react-router-dom";
import UserData from "./userData";
import { useState } from "react";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (value) => {
    if (value.trim() === "") {
      navigate("/categories");
    } else {
      navigate(`/categories?search=${encodeURIComponent(value)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  const handleIconClick = () => {
    handleSearch(query);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 flex justify-between items-center px-8 h-20">
      <div className="flex items-center gap-12">
        <div className="flex items-center">
          <Link to="/" className="text-3xl font-black text-blue-700 tracking-tight">
            Scholarly
          </Link>
        </div>

        <div className="hidden md:flex gap-8 items-center">
          <Link to="/categories" className="text-slate-600 hover:text-blue-600 font-bold text-base transition-all">Categories</Link>
          <Link to="/myLearning" className="text-slate-600 hover:text-blue-600 font-bold text-base transition-all">My Learning</Link>
          <Link to="/instructors" className="text-slate-600 hover:text-blue-600 font-bold text-base transition-all">Instructors</Link>
        </div>
      </div>

      <div className="flex items-center gap-6">

        {/* Search Box */}
        <div className="hidden lg:flex items-center bg-gray-100/80 px-4 py-3 rounded-full border border-gray-200/50 hover:bg-gray-100 transition-colors gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleIconClick}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            className="bg-transparent border-none outline-none text-base w-56 text-gray-700 placeholder-gray-400"
            placeholder="Search for craft..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>

        {/* Cart */}
        <div className="flex items-center gap-5 text-slate-600">
          <Link to="/cart" className="hover:text-blue-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </Link>
        </div>

        <div className="h-6 w-px bg-gray-200"></div>

        <div className="flex items-center">
          <UserData />
        </div>
      </div>
    </nav>
  );
}