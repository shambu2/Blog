import React, { useState } from "react";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-start space-x-4">
        {/* Add button */}
        <button className="flex-shrink-0 w-12 h-12 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-gray-400 transition-colors mt-2">
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>

        {/* Content area */}
        <div className="flex-1">
          {/* Title input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-4xl font-light text-gray-800 placeholder-gray-400 border-none outline-none resize-none mb-4"
            style={{ fontFamily: "Georgia, serif" }}
          />

          {/* Content textarea */}
          <textarea
            placeholder="Tell your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full text-xl text-gray-700 placeholder-gray-400 border-none outline-none resize-none min-h-96"
            style={{ fontFamily: "Georgia, serif" }}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPost;
