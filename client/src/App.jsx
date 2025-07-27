import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReviewPage from "./ReviewPage.jsx";
import FeedbackPage from "./FeedbackPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/review" replace />} />

          {/* Review page with optional business parameter */}
          <Route path="/review" element={<ReviewPage />} />

          {/* 404 page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}