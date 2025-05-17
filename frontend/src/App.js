import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./lib/supabase";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignInPopup from "./components/SignInPopup";
import SignUpPopup from "./components/SignUpPopup";
import ResumeUpload from "./components/ResumeUpload";

import IntroPage from "./pages/IntroPage";
import Dashboard from "./pages/Dashboard";

import ContactUs from "./components/ContactUs";
import Contact from "./components/Contact";
import About from "./components/About";
import FAQs from "./components/FAQs";
import TandP from "./components/TandP";
import Support from "./components/Support";
import Careers from "./components/Careers";
import Mockinterview from "./components/Mockinterview";
import Certificate from "./components/Certificate";

import LearningCourses from "./Courses/LearningCourses";
import Frontend from "./Courses/Frontend/Frontend";
import FrontendCertificate from "./Courses/Frontend/FrontendCertificate";
import Java from "./Courses/Backend/Java";
import BackendCertificate from "./Courses/Backend/BackendCertificate";

import AptitudeHome from "./Aptitude/AptitudeHome";
import AptitudeTestPage from "./Aptitude/AptitudeTestPage";

import TechnicalInterview from "./TechnicalInterview/page";
import HrInterviewPage from "./HrInterview/page";

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const resumeUploadRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar
          setShowSignIn={setShowSignIn}
          setShowSignUp={setShowSignUp}
          triggerResumeUpload={() => resumeUploadRef.current?.()}
        />

        <div className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<IntroPage setShowSignIn={setShowSignIn} />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/About" element={<About />} />
            <Route path="/FAQs" element={<FAQs />} />
            <Route path="/TandP" element={<TandP />} />
            <Route path="/Careers" element={<Careers />} />
            <Route path="/Support" element={<Support />} />
            <Route path="/Mockinterview" element={<Mockinterview />} />

            {/* Protected Routes */}
            <Route path="/Certificate" element={user ? <Certificate /> : <Navigate to="/" />} />
            <Route path="/FrontendCertificate" element={user ? <FrontendCertificate /> : <Navigate to="/" />} />
            <Route path="/BackendCertificate" element={user ? <BackendCertificate /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/upload" element={user ? <ResumeUpload resumeUploadRef={resumeUploadRef} /> : <Navigate to="/" />} />

            {/* Learning Courses */}
            <Route path="/LearningCourses" element={<LearningCourses />} />
            <Route path="/Frontend" element={<Frontend />} />
            <Route path="/Java" element={<Java />} />

            {/* Aptitude */}
            <Route path="/aptitude-test" element={<AptitudeHome />} />
            <Route path="/aptitude-test/:level" element={<AptitudeTestPage />} />

            {/* Interviews */}
            <Route path="/TechnicalInterview" element={<TechnicalInterview />} />
            <Route path="/HrInterview" element={<HrInterviewPage />} />
          </Routes>
        </div>

        <Footer />

        {showSignIn && <SignInPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />}
        {showSignUp && <SignUpPopup setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp} />}
      </div>
    </Router>
  );
}
