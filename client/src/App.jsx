// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast"; // Import the Toaster

import ProtectedRoute from "./component/layout/ProtectedRoute";
import Navbar from "./component/layout/Navbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Add the Toaster component here */}
        <Toaster
          position="top-right"
          toastOptions={{
            // Define default options
            duration: 5000,
            style: {
              background: "#333",
              color: "#fff",
            },
            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
            error: {
              duration: 5000,
            },
          }}
        />

        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<ConditionalRedirect />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

// Helper component to redirect logged-in users
function ConditionalRedirect() {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <LandingPage />;
}

export default App;
