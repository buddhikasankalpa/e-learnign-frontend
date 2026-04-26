// src/components/AdminRoute.jsx
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const token = localStorage.getItem("token");
    
    if (!token) {
        return <Navigate to="/login" />;
    }
    
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (!payload.isAdmin) {
            return <Navigate to="/" />;
        }
    } catch {
        return <Navigate to="/login" />;
    }
    
    return children;
}