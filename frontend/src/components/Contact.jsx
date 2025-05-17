import React, { useState, useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State for form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendClick = () => {
    alert("Thank you for your message! We will get back to you soon.");

    // Clear form fields after alert is closed
    setFormData({
      fullName: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="p-10 max-w-10xl mx-auto border shadow-lg mt-16 bg-slate-200">
      <h1 className="text-3xl font-bold text-green-600">Send Message</h1>

      <h4 className="mt-6">Full Name</h4>
      <input
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full p-3 border border-green-500 hover:bg-slate-300 outline-blue-400 rounded-md"
        placeholder="Enter Your Full name"
      />

      <h4 className="mt-6">Email</h4>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 border border-green-500 hover:bg-slate-300 outline-blue-400 rounded-md"
        placeholder=" Enter Your Email"
      />

      <h4 className="mt-6">Type your Message...</h4>
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        className="w-full p-3 border border-green-500 hover:bg-slate-300 outline-blue-400 rounded-md"
        placeholder=" Type Message"
        rows="5"
      ></textarea>

      <button
        onClick={handleSendClick}
        className="bg-blue-600 text-white px-6 py-3 rounded-md mt-6 hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
}
