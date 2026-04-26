import {Route, Routes, Navigate} from 'react-router-dom'
import './App.css'
import HomePage from './pages/homepage'
import AdminPage from './pages/adminpage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import TestPage from './pages/testPage'
import ForgetPassword from './pages/forgotPasswordPage'
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google'

function isAdmin() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.isAdmin === true;
  } catch {
    return false;
  }
}

function AdminRoute({ children }) {
  return isAdmin() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <GoogleOAuthProvider clientId="874229958487-1o5a99ijvvvniqhqfohdq27oceqlq0u9.apps.googleusercontent.com">
      <div className="min-h-screen w-full bg-[#FFFFFF] overflow-x-hidden">  
        <Toaster position='top-right'/>
        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path='/admin/*' element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/test' element={<TestPage />} />
          <Route path="/forgot-password" element={<ForgetPassword/>}/>
        </Routes>
      </div>
    </GoogleOAuthProvider>
  )
}

export default App