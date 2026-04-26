import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

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

    return (
        <div className="pt-24 px-8 flex flex-col items-center gap-4 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold mb-6">Course Cart</h1>

            {cart.length > 0 ? (
                <>
                    {cart.map((item, index) => (
                        <div key={item.courseId} className="w-full lg:w-[60%] h-[150px] rounded-xl overflow-hidden shadow-sm border bg-white flex justify-between">
                            <img src={item.thumbnail} alt={item.title} className="h-full aspect-square object-cover" />

                            <div className="flex flex-col justify-center flex-1 pl-6">
                                <h1 className="text-lg font-bold text-slate-800">{item.title}</h1>
                                <p className="text-blue-600 font-semibold">LKR. {item.price.toFixed(2)}</p>
                            </div>

                            <div className="h-full flex items-center gap-6 pr-8">
                                <div className="w-[120px] text-right font-bold text-slate-700">
                                    LKR. {(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Form section */}
                    <div className="w-full lg:w-[60%] rounded-xl overflow-hidden shadow-md p-6 bg-white flex flex-col gap-4 my-2">
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="px-4 py-3 rounded border-2 border-gray-200 focus:border-blue-400 outline-none"
                                placeholder="Your full name"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-gray-700">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="px-4 py-3 rounded border-2 border-gray-200 focus:border-blue-400 outline-none"
                                placeholder="Your address"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-semibold text-gray-700">Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="px-4 py-3 rounded border-2 border-gray-200 focus:border-blue-400 outline-none"
                                placeholder="Your phone number"
                            />
                        </div>
                    </div>

                    <div className="w-full lg:w-[60%] flex justify-between items-center p-6 bg-white rounded-xl shadow-sm border mt-2">
                        <button
                            className="px-6 py-3 rounded bg-blue-500 text-white font-bold hover:bg-blue-600 transition"
                            onClick={submitOrder}
                        >
                            Order Now
                        </button>

                        <div className="text-right">
                            <p className="text-gray-500">Total Amount:</p>
                            <h2 className="text-3xl font-black text-blue-700">
                                LKR. {getCartTotal().toFixed(2)}
                            </h2>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center mt-20">
                    <h2 className="text-2xl text-gray-400">Your cart is empty</h2>
                    <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 font-bold underline">Go Back</button>
                </div>
            )}
        </div>
    );
}