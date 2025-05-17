import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SummaryAd from "../components/SummaryAd";
import ResumeUpload from "../components/ResumeUpload";

const Dashboard = () => {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [activeTab, setActiveTab] = useState("mock"); // 'mock' or 'learning'
  const navigate = useNavigate();

  const handleResumeUpload = () => {
    setResumeUploaded(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 mt-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center">AI-Powered Interview Practice Platform</h1>
      <p className="text-gray-600 mt-2 text-center">
        Master your interview skills with personalized AI feedback
      </p>

      {/* Summary Ad */}
      <div className="mt-6 w-full max-w-4xl px-4">
        <SummaryAd />
      </div>

      {/* Tabs */}
      <div className="mt-8 w-full max-w-3xl px-4">
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setActiveTab("mock")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "mock"
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-700"
            }`}
          >
            Mock Interviews
          </button>
          <button
            onClick={() => setActiveTab("learning")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              activeTab === "learning"
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-300 text-gray-700"
            }`}
          >
            Learning Courses
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center hover:bg-slate-100 cursor-pointer group">
          {activeTab === "mock" ? (
            <div onClick={() => navigate("/Mockinterview")}>
              <img src="/MockInterviewIcon.jpg" alt="Mock Interview Icon" className="w-12 h-12 mx-auto" />
              <h2 className="text-lg font-semibold mt-4">Mock Interviews</h2>
              <p className="text-gray-600 mt-2">
                Practice with our AI interviewer across aptitude, technical, and HR rounds
              </p>
              <div className="absolute bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Take a mock interview
              </div>
            </div>
          ) : (
            <div onClick={() => navigate("/LearningCourses")}>
              <img src="/LearningCourses.jpg" alt="Learning Courses" className="w-12 h-12 mx-auto" />
              <h2 className="text-lg font-semibold mt-4">Learning Courses</h2>
              <p className="text-gray-600 mt-2">
                Access comprehensive courses to improve your skills
              </p>
              <div className="absolute bottom-full mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
                Explore learning courses
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Resume Upload or Start Button */}
      <div className="mt-10 w-full max-w-md px-4">
        {!resumeUploaded ? (
          <ResumeUpload onUpload={handleResumeUpload} />
        ) : (
          <button
            className="bg-blue-600 text-white text-lg font-medium px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition-all w-full relative group"
            onClick={() => navigate("/start-interview")}
          >
            Start Your Interview
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity">
              Begin AI interview session
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
