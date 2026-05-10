import { useState } from "react";
import { getCart, addToCart } from "../utils/cart";
import { BsTrash } from "react-icons/bs"; // Changed icon to a Trash bin for "Remove"
import { Link, useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion"; 

export default function CartPage() {
    const [cart, setCart] = useState(getCart());
    const navigate = useNavigate();

    // Adapted this function to act as a "Remove from Cart" by passing negative quantity
    const handleRemoveItem = (item) => {
        addToCart(item, -item.quantity);
        setCart(getCart());
    };

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
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mb-10"
                >
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Ready to Learn?</h1>
                    <p className="text-gray-500 mt-2">
                        {cart.length > 0 ? `${cart.length} Course${cart.length > 1 ? 's' : ''} in Cart` : "Your cart is waiting to be filled with knowledge."}
                    </p>
                </motion.div>

                {cart.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        
                        {/* Left Column: Course Items */}
                        <motion.div 
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-8 space-y-6"
                        >
                            {cart.map((item) => (
                                <motion.div 
                                    variants={fadeUpVariant}
                                    key={item.courseId} 
                                    className="w-full bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 transition-all hover:shadow-md"
                                >
                                    {/* Course Thumbnail (Now aspect-video for e-learning standard) */}
                                    <div className="w-full sm:w-48 aspect-video shrink-0 rounded-xl overflow-hidden bg-gray-100">
                                        <img 
                                            src={item.thumbnail || "https://via.placeholder.com/640x360"} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>

                                    {/* Course Details */}
                                    <div className="flex flex-col flex-1 text-center sm:text-left justify-center">
                                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h2>
                                        <p className="text-sm text-gray-500 font-medium mb-1">
                                            By {item.instructor || "Expert Instructor"}
                                        </p>
                                        <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                                            <span className="text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-600 px-2 py-1 rounded-md">
                                                Digital Course
                                            </span>
                                        </div>
                                    </div>

                                    {/* Price & Remove Action */}
                                    <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-center gap-4 sm:border-l sm:border-gray-100 sm:pl-6 min-w-[120px]">
                                        <p className="text-2xl font-black text-gray-900">
                                            LKR. {item.price.toFixed(2)}
                                        </p>
                                        <button 
                                            onClick={() => handleRemoveItem(item)}
                                            className="text-sm text-red-500 hover:text-red-600 font-semibold flex items-center gap-2 transition-colors active:scale-95"
                                        >
                                            <BsTrash className="text-lg" />
                                            <span>Remove</span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Right Column: Order Summary for E-Learning */}
                        <motion.div 
                            variants={fadeLeftVariant}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-4"
                        >
                            <div className="bg-white p-8 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 sticky top-28">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Total</h2>
                                
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <h2 className="text-4xl font-black text-blue-600">
                                            LKR. {cart.reduce((acc, cv) => acc + (cv.price * cv.quantity), 0).toFixed(2)}
                                        </h2>
                                    </div>

                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                        <Link 
                                            to="/checkout"
                                            state={{ cart }}
                                            className="w-full flex justify-center py-4 bg-blue-600 text-white font-extrabold rounded-2xl text-lg hover:bg-blue-700 hover:scale-[0.98] transition-all shadow-lg shadow-blue-600/30"
                                        >
                                            Checkout
                                        </Link>
                                    </div>

                                    {/* E-Learning Specific Trust Badges */}
                                    <ul className="space-y-3 pt-4">
                                        {[
                                            "Full Lifetime Access", 
                                            "Access on mobile and desktop", 
                                            "Certificate of completion",
                                            "Secure Payment Processing"
                                        ].map(feature => (
                                            <li key={feature} className="flex items-center gap-3 text-sm font-medium text-gray-500">
                                                <span className="text-blue-500 text-lg leading-none">✓</span>{feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                ) : (
                    /* Empty Cart State */
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center bg-white rounded-3xl p-16 shadow-sm border border-gray-100 text-center mt-8 max-w-2xl mx-auto"
                    >
                        <div className="text-6xl mb-6">🎓</div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to start learning?</h2>
                        <p className="text-gray-500 mb-8">You haven't added any courses to your cart yet.</p>
                        <button 
                            onClick={() => navigate("/")} 
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-md hover:bg-blue-700 active:scale-95 transition-all"
                        >
                            Browse Courses
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
}