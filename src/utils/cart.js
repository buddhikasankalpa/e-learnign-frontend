import { toast } from 'react-hot-toast'; 

function getCartKey() {
    const token = localStorage.getItem("token");
    if (!token) return "cart_guest";
    
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return `cart_${payload.email}`;
    } catch {
        return "cart_guest";
    }
}

export function getCart() { 
    const cartString = localStorage.getItem(getCartKey());
    if (cartString == null) {
        localStorage.setItem(getCartKey(), "[]");
        return [];
    } else {
        return JSON.parse(cartString);
    }
}

export function addToCart(course, quantity) {
    const cart = getCart();
    const index = cart.findIndex((item) => item.courseId === course.courseId);

    if (index === -1) {
        if (quantity > 0) {
            cart.push({
                courseId: course.courseId,
                title: course.title,
                description: course.description,
                price: course.price,
                labelledPrice: course.labelledPrice,
                thumbnail: course.thumbnail,
                instructor: course.instructor,
                quantity: quantity 
            });
            toast.success(`${course.title} added to cart`);
        }
    } else {
        const newQty = cart[index].quantity + quantity;
        if (newQty <= 0) {
            cart.splice(index, 1);
            toast.success(`${course.title} removed from cart`);
        } else {
            cart[index].quantity = newQty;
            toast.success(`Updated quantity: ${newQty}`);
        }
    }

    localStorage.setItem(getCartKey(), JSON.stringify(cart));
}

export function emptyCart() {
    localStorage.setItem(getCartKey(), "[]");
}