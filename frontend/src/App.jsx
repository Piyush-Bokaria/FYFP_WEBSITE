
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from "@/components/pages/LandingPage";
import { AdminLogin } from "@/components/pages/AdminLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
