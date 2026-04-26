import { useState } from "react";
import { getCart, addToCart } from "../utils/cart";
import { BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom"; 

export default function CartPage() {
    const [cart, setCart] = useState(getCart());

    const handleUpdateQuantity = (item, amount) => {
        addToCart(item, amount);
        setCart(getCart());
    };

    return (
        <div className="pt-24 px-8 flex flex-col items-center gap-4 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Course Cart</h1>
            
            {cart.length > 0 ? (
                <>
                    {cart.map((item) => (
                        <div key={item.courseId} className="w-full lg:w-[60%] h-[150px] rounded-xl overflow-hidden shadow-sm border bg-white flex justify-between">
                            <img src={item.thumbnail} alt={item.title} className="h-full aspect-square object-cover" />

                            <div className="flex flex-col justify-center flex-1 pl-6">
                                <h1 className="text-lg font-bold text-slate-800">{item.title}</h1>
                                <p className="text-blue-600 font-semibold">LKR. {item.price.toFixed(2)}</p>
                            </div>

                            <div className="h-full flex items-center gap-6 pr-8">
                                <div className="flex flex-col items-center gap-1">
                                    <BsChevronUp className="text-xl cursor-pointer hover:text-blue-600" onClick={() => handleUpdateQuantity(item, 1)} />
                                    <span className="text-lg font-bold">{item.quantity}</span>
                                    <BsChevronUp className="text-xl cursor-pointer hover:text-blue-600 rotate-180" onClick={() => handleUpdateQuantity(item, -1)} />
                                </div>
                                <div className="w-[120px] text-right font-bold text-slate-700">
                                    LKR. {(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="w-full lg:w-[60%] flex justify-between items-center p-6 bg-white rounded-xl shadow-sm border mt-4">
                        {/* Checkout Button */}
                        <Link 
                            to="/checkout"
                            state={{ cart }}
                            className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
                        >
                            Checkout
                        </Link>

                        <div className="text-right">
                            <p className="text-gray-500">Total Amount:</p>
                            <h2 className="text-3xl font-black text-blue-700">
                                LKR. {cart.reduce((acc, cv) => acc + (cv.price * cv.quantity), 0).toFixed(2)}
                            </h2>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center mt-20">
                    <h2 className="text-2xl text-gray-400">Your cart is empty</h2>
                    <button onClick={() => window.history.back()} className="mt-4 text-blue-600 font-bold underline">Go Back</button>
                </div>
            )}
        </div>
    );
}