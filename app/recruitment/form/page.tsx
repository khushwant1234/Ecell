import React from 'react';

export default function RecruitmentClosed() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          
          {/* Main Message */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-600 mb-6 leading-tight">
            Recruitments have been closed
          </h1>
          
          <p className="text-xl sm:text-2xl text-blue-600 mb-8 leading-relaxed">
            You'll hear back on the results soon
          </p>
          
          {/* Contact Info */}
          <div className="border border-blue-200 rounded-lg p-6 sm:p-8">
            <p className="text-blue-600 text-lg mb-4">
              If you think this is wrong, mail us at
            </p>
            <a 
              href="mailto:ecell@snu.edu.in"
              className="text-blue-600 hover:text-blue-800 font-semibold underline"
            >
              ecell@snu.edu.in
            </a>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-blue-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-blue-600 text-sm">
            © 2025 E-Cell SNU. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
