// src/pages/LandingPage.js
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const LandingPage = () => {
  const { user } = useAuth();

  if (user) {
    return null; // Don't show landing page if user is logged in
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              Take Control of Your{" "}
              <span className="text-gray-800">Finances</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600">
              XpenseMate helps you track spending, manage budgets, and achieve
              financial goals with ease. Start your journey to financial freedom
              today. 🚀
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-gray-800 text-white font-medium rounded-lg shadow-lg hover:bg-gray-700 transform hover:-translate-y-1 transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 bg-white text-gray-800 font-medium rounded-lg shadow-lg hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="mt-16 flex justify-center">
            <img
              className="rounded-xl shadow-2xl ring-1 ring-gray-900/10 w-full max-w-4xl"
              src="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="XpenseMate App Dashboard"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
