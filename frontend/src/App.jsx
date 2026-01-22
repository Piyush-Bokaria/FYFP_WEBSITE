
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from "@/components/pages/LandingPage";
import { AdminLogin } from "@/components/pages/AdminLogin";
import { AdminDashboard } from "@/components/pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
