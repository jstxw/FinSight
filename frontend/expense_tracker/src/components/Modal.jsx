import React from "react";

const Modal = ({ children, isOpen, onClose, title }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-2xl mx-auto p-4">
        <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 p-4 md:p-5 rounded-t">
            <h3
              id="modal-title"
              className="text-lg font-semibold text-black dark:text-gray-100"
            >
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              aria-label="Close modal"
            >
              <svg
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                aria-hidden="true"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1l6 6m0 0l6-6m-6 6l6 6m-6-6l-6 6"
                />
              </svg>
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 md:p-5 space-y-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
