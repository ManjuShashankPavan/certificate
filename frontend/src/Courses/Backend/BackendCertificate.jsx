import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useEffect } from 'react';

const BackendCertificate = ({
studentName = "John Doe",
}) => {
 useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

const certificateRef = useRef(null);

const handleDownload = () => {
html2canvas(certificateRef.current, { scale: 2 }).then((canvas) => {
const imgData = canvas.toDataURL('image/png');
const pdf = new jsPDF('landscape', 'pt', 'a4');
const width = pdf.internal.pageSize.getWidth();
const height = pdf.internal.pageSize.getHeight();
pdf.addImage(imgData, 'PNG', 0, 0, width, height);
pdf.save(`${studentName}_certificate.pdf`);
});
};

return ( <div className="flex flex-col items-center justify-center py-10 px-4 bg-gradient-to-tr from-gray-100 to-gray-300 min-h-screen">

  {/* Certificate */}
  <div
    ref={certificateRef}
    className="w-[1000px] h-[700px] mt-20 bg-white rounded-xl border-4 border-blue-500 shadow-2xl p-10 relative flex flex-col items-center justify-center"
    style={{ fontFamily: "'Georgia', serif" }}
  >
    {/* Watermark or Background Logo */}
    <img
      src="SpeaQ.png"
      alt="Logo"
      className="absolute top-10 left-10 w-24 opacity-80"
    />

    {/* Title */}
    <h1 className="text-5xl font-extrabold text-blue-700 mb-2">
      Certificate of Completion
    </h1>
    <p className="text-lg text-gray-700 mb-4 italic">
      This certificate is proudly presented to
    </p>

    {/* Student Name */}
    <h2 className="text-4xl font-semibold text-gray-900 underline decoration-blue-400 decoration-2 mb-2">
      {studentName}
    </h2>

    {/* Course Name */}
    <p className="text-lg text-gray-800 mt-2 mb-4">
      For successfully completing the course
    </p>
    <h3 className="text-2xl font-medium text-blue-800 mb-6">
      Backend Development
    </h3>

    {/* Message */}
    <p className="text-base text-gray-600 text-center px-10 mb-12">
      We recognize your dedication, learning, and passion demonstrated during this program.
      Congratulations and best wishes for your future endeavors!
    </p>

    {/* Footer with Signature and Date */}
    <div className="absolute bottom-10 left-0 right-0 px-16 flex justify-between items-end">
      <div className="text-center">
        <div className="border-t border-gray-500 w-48 mx-auto mb-2"></div>
        <p className="text-sm text-gray-700">Instructor Signature</p>
      </div>
      <div className="text-center">
        <p className="text-sm mb-1 text-gray-700">{new Date().toLocaleDateString()}</p>
        <p className="text-sm text-gray-700">Date</p>
      </div>
    </div>

    {/* Optional: QR Code or Serial Number */}
    <div className="absolute bottom-10 right-10 text-xs text-gray-400">
      Cert-ID: #{Math.floor(100000 + Math.random() * 900000)}
    </div>
  </div>
   <div className="mb-6 mt-20 flex gap-4">
    {/* Download Button */}
    <button
      onClick={handleDownload}
      className="px-6 py-3 bg-blue-700 text-white text-lg rounded-full shadow-lg hover:bg-blue-800 transition duration-300"
    >
      Download Certificate
    </button>

  </div>
</div>

);
};

export default BackendCertificate;