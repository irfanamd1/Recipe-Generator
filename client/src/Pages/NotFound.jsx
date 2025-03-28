import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <h1 className="text-5xl font-bold text-red-500 mb-2">404</h1>
      <p className="text-lg text-center mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-5 py-2 bg-black text-white rounded-md text-lg hover:bg-gray-700 hover:text-white transition"
      >
        ⮘ &nbsp;Go Back
      </Link>
    </div>
  );
}
