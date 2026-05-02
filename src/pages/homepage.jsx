import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import LoginPage from "./loginPage";
import RegisterPage from "./registerPage";
import CoursePage from "./coursePage";
import CartPage from "./cart";
import CourseOverview from "./courseOverview";
import CheckOutPage from "./checkoutPage";
import OrdersPage from "./ordersPage";
import CourseCategoriesPage from "./CourseCategoriesPage";
import MyLearningPage from "./myLearningPage"
import Footer from "../components/Footer";
import CourseVideos from "./courseVideos";
import NotFound from "../components/NotFound";
import InstructorsPage from "./instructorsPage"
import AboutUsPage from "./AboutUsPage";
import TermsServicePage from "./TermsService";
import PrivacyPolicyPage from "./PrivacyPolicyPage";
import ContactSupportPage from "./ContactSupportPage";

export default function Homepage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-white">
      <Header />
      <main className="flex-grow pt-20">
        <div className="w-full">
          <Routes>
            <Route path="/" element={<CoursePage />} />
            <Route path="/categories" element={<CourseCategoriesPage />} />
            <Route path="/myLearning" element={<MyLearningPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/overview/:courseId" element={<CourseOverview />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/*" element={<NotFound />} />
            <Route path="/course/:courseId" element={<CourseVideos/>}/>
            <Route path="/instructors" element={<InstructorsPage />} />
            <Route path="/about" element={<AboutUsPage />}/>
            <Route path="/terms" element={<TermsServicePage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/contact" element={<ContactSupportPage/>} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}