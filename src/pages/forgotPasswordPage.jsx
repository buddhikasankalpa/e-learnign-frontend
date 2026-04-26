import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ForgetPasswordPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function resetPassword() {
    if (newPassword !== confirmPassword) {
      toast.error("password do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/validate-otp", {
        email: email,
        otp: otp,
        newPassword: newPassword,
      });
      toast.success("Password reset successful");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
      toast.error("Error resetting password. Try again later.");
      setLoading(false);
    }
  }

  async function sendOtp() {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setLoading(true);
    try {
      await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email);
      toast.success("OTP sent to your email");
      setLoading(false);
      setOtpSent(true);
    } catch (err) {
      console.log(err);
      toast.error("Error sending OTP. Try again later");
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100">
      {loading && <Loader />}

      {otpSent ? (
        <div className="w-[400px] h-auto flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Enter OTP and New Password</h2>
          
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-blue-500"
            value={otp} 
            onChange={(e) => setOtp(e.target.value)}
            autoComplete="off" 
          />

          <input
            type="password"
            placeholder="Enter New Password"
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            onClick={resetPassword}
            className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition-all"
          >
            Reset Password
          </button>
        </div>
      ) : (
        <div className="w-[400px] h-[400px] flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 mb-6 border border-gray-300 rounded focus:outline-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            onClick={sendOtp}
            className="w-full bg-blue-600 text-white p-2 rounded font-semibold hover:bg-blue-700 transition-all"
          >
            Send OTP
          </button>
        </div>
      )}
    </div>
  );
}