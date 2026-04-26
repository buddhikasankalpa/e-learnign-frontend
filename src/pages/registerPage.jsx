import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function register() {
      if (firstName.trim() === "") {
        toast.error("First name is required");
        return;
      }
      if (lastName.trim() === "") {
        toast.error("Last name is required");
        return;
      }
      if (email.trim() === "") {
        toast.error("Email is required");
        return;
      }
      if (password.trim() === "") {
        toast.error("Password is required");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      setIsLoading(true);

      try{
        await axios.post(import.meta.env.VITE_BACKEND_URL + "/users",{
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email : email.trim(),
          password : password.trim(),
        });

        navigate("/login");
        toast.success("Registration successful!");

      } catch(err){
        toast.error("Registration failed! Please check your data and try again.");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      
      <div className="flex w-full max-w-5xl min-h-[700px] bg-white rounded-2xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden md:flex w-1/2 bg-blue-600 flex-col justify-between p-12 text-white">
          
          <div className="text-2xl font-black tracking-wide">
            Scholarly
          </div>

          <div>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">
              Master your <br/>digital craft.
            </h1>
            <p className="text-blue-100 text-lg pr-8">
              Join a community of artisans and thinkers in a space designed for deep, uninterrupted learning.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-xl border border-white/20 backdrop-blur-sm w-fit">
            <p className="font-bold text-sm">4.9/5 from 2,000+ Students</p>
            <p className="text-xs text-blue-100 mt-1">
              Highly rated for curriculum depth.
            </p>
          </div>

        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">

          <div className="w-full max-w-sm">

             {/* Toggle Login/SignUp */}
             <div className="flex justify-center mb-8">
              <div className="bg-gray-100 rounded-full p-1 flex w-56">
                <Link to="/login" className="w-1/2 text-center py-2 rounded-full text-sm font-bold text-gray-500 hover:text-gray-700 transition">
                  Login
                </Link>
                <Link to="/register" className="w-1/2 text-center py-2 rounded-full bg-white shadow-sm text-sm font-bold text-blue-600">
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Header */}
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-center text-gray-500 mb-6 text-sm">
              Join thousands of learners today.
            </p>

            {/* Full Name (First & Last side by side) */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Full Name</label>
              <div className="flex gap-3">
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
                />
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
              />
            </div>

            {/* Password & Confirm Side by Side */}
            <div className="mb-6 flex gap-3">
              <div className="w-1/2">
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm tracking-widest"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Confirm</label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm tracking-widest"
                />
              </div>
            </div>

            {/* Button */}
            <button className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30"
              onClick={register}>
              Create Account
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold hover:underline cursor-pointer">
                Sign In
              </Link>
            </p>
          </div>

        </div>

      </div>
      {isLoading && <Loader />}
    </div>
  );
}