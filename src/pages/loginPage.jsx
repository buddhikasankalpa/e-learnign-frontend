import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { GrGoogle } from "react-icons/gr";
import { useGoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
        setIsLoading(true);
        axios.post(import.meta.env.VITE_BACKEND_URL + "/users/google-login", {
            token: response.access_token,
        }).then((res) => {
            localStorage.setItem("token", res.data.token);
            if (res.data.isAdmin == true) {  
                navigate("/admin");
            } else {
                navigate("/");
            }
            toast.success("Login successful!");
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            toast.error("Google login failed!");
            setIsLoading(false);
        });
    },
    onError: () => { toast.error("Google Login Failed"); },
    onNonOAuthError: () => { toast.error("Google Login Failed"); },
  });

  async function login(){
      setIsLoading(true)
      try{
        const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login",{
        email : email,
        password : password,
      });

      localStorage.setItem("token", res.data.token)

      if (res.data.isAdmin == true) {
        navigate("/admin");
      } else {
        navigate("/");       
      }

      toast.success("Login successful! Welcome back.");
      setIsLoading(false)

      } catch(err){
        toast.error("Login failed! Please check your credentials and try again.");
        console.log(err);
        setIsLoading(false)
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
            <div className="flex justify-center mb-10">
              <div className="bg-gray-100 rounded-full p-1 flex w-56">
                <Link to="/login" className="w-1/2 text-center py-2 rounded-full bg-white shadow-sm text-sm font-bold text-blue-600">
                  Login
                </Link>
                <Link to="/register" className="w-1/2 text-center py-2 rounded-full text-sm font-bold text-gray-500 hover:text-gray-700 transition">
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Header */}
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-gray-500 mb-8 text-sm">
              Please enter your details.
            </p>

            {/* Email */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                <Link href="#" className="text-xs font-bold text-blue-600 hover:underline"
                to = "/forgot-password"
                >Forgot?</Link>
              </div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm tracking-widest"
              />
            </div>

            {/* Button */}
            <button 
              className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              onClick={login}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign In to Scholarly"}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Or continue with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {/* Social Logins - Only Google Now */}
            <button 
              className="w-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-bold transition text-sm border border-gray-100 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              onClick={googleLogin}
              disabled={isLoading}
            >
              <GrGoogle className="mr-2 text-lg text-blue-600"/> Google
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-8">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-bold hover:underline cursor-pointer">
                Create an Account
              </Link>
            </p>
          </div>

        </div>

      </div>
      {isLoading && <Loader />}
    </div>
  );
}