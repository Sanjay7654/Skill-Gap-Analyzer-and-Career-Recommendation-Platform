import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Onboarding from "./pages/Onboarding";
import SkillAssessment from "./pages/SkillAssessment";
import Dashboard from "./pages/Dashboard";
import GapAnalysis from "./pages/GapAnalysis";
import Roadmap from "./pages/Roadmap";
import Progress from "./pages/Progress";
import Resources from "./pages/Resources";
import Insights from "./pages/Insights";
import MarketTrends from "./pages/MarketTrends";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { UserProvider } from "./context/UserContext";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-200 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/assessment" element={<SkillAssessment />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/gap/:roleId" element={<GapAnalysis />} />
              <Route path="/roadmap/:roleId" element={<Roadmap />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/market" element={<MarketTrends />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}


export default App;
