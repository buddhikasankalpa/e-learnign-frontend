import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // <-- Added Framer Motion

export default function CheckOutPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const [cart, setCart] = useState(location.state?.cart || []);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (!location.state?.cart) {
            navigate("/courses");
        }
    }, []);

    function getCartTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total;
    }

    async function submitOrder() {
        const token = localStorage.getItem("token");
        if (token == null) {
            toast.error("You must be logged in to place an order");
            navigate("/login");
            return;
        }

        const orderItems = [];
        cart.forEach((item) => {
            orderItems.push({
                courseId: item.courseId,  
                quantity: item.quantity
            });
        });

        axios.post(import.meta.env.VITE_BACKEND_URL + "/orders", {
            name: name,
            address: address,
            phone: phone,
            items: orderItems  
        }, {
            headers: {          
                "Authorization": `Bearer ${token}`
            }
        }).then((response) => {   
            toast.success("Order placed successfully");
            navigate("/orders");
        }).catch((error) => {     
            toast.error("Error placing order");
        });
    }

    // Animation Variants
    const fadeUpVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const fadeLeftVariant = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <div className="pt-24 pb-20 px-8 min-h-screen bg-gray-50 font-sans">
            <div className="max-w-7xl mx-auto">
                
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mb-10"
                >
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Secure Checkout</h1>
                    <p className="text-gray-500 mt-2">Complete your purchase to unlock your courses instantly.</p>
                </motion.div>

                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        
                        {/* Left Column: Billing Information */}
                        <motion.div 
                            variants={fadeUpVariant}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-7 space-y-6"
                        >
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Billing Details</h2>
                                
                                <div className="space-y-5">
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Full Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="px-5 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white text-gray-800"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Billing Address</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            className="px-5 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white text-gray-800"
                                            placeholder="123 Main St, City, Country"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-sm text-gray-700 uppercase tracking-wide">Phone Number</label>
                                        <input
                                            type="text"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="px-5 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-gray-50 focus:bg-white text-gray-800"
                                            placeholder="+94 7X XXX XXXX"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Order Summary */}
                        <motion.div 
                            variants={fadeLeftVariant}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-5"
                        >
                            <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 sticky top-28">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                
                                {/* Cart Items */}
                                <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.map((item) => (
                                        <motion.div 
                                            variants={fadeUpVariant}
                                            key={item.courseId} 
                                            className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 items-center"
                                        >
                                            <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-200">
                                                <img src={item.thumbnail || "https://via.placeholder.com/150"} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-gray-900 text-sm truncate">{item.title}</h3>
                                                <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                                                <p className="font-bold text-blue-600 mt-1">LKR. {(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Divider */}
                                <div className="h-px w-full bg-gray-100 my-6"></div>

                                {/* Total & Submit */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <p className="text-gray-500 font-medium">Total Amount</p>
                                        <h2 className="text-3xl font-black text-gray-900">
                                            LKR. {getCartTotal().toFixed(2)}
                                        </h2>
                                    </div>

                                    <button
                                        className="w-full py-4 bg-blue-600 text-white font-extrabold rounded-2xl text-lg hover:bg-blue-700 hover:scale-[0.98] transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
                                        onClick={submitOrder}
                                    >
                                        Confirm & Pay
                                    </button>

                                    <p className="text-xs text-center text-gray-400 font-medium flex items-center justify-center gap-1">
                                        🔒 Safe and secure checkout
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center bg-white rounded-3xl p-16 shadow-sm border border-gray-100 text-center mt-8 max-w-2xl mx-auto"
                    >
                        <div className="text-6xl mb-6">🛒</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added any courses to your cart yet.</p>
                        <button 
                            onClick={() => navigate("/")} 
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 active:scale-95 transition-all"
                        >
                            Explore Courses
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}