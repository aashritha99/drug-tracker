import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-8 px-4 mt-12 border-t border-gray-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Brand */}
        <div>
          <h1 className="text-xl font-semibold tracking-wide">DrugTrack</h1>
          <p className="mt-2 text-sm text-gray-600">
            Ensuring transparency and safety across the pharmaceutical supply chain.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-md font-medium mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li><a href="/" className="hover:text-teal-600 transition">Home</a></li>
            <li><a href="/dashboard" className="hover:text-teal-600 transition">Dashboard</a></li>
            <li><a href="/about" className="hover:text-teal-600 transition">About</a></li>
            <li><a href="/contact" className="hover:text-teal-600 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-md font-medium mb-2">Contact Us</h2>
          <p className="text-sm">Email: <a href="mailto:support@drugtrack.com" className="hover:text-teal-600">support@drugtrack.com</a></p>
          <p className="text-sm mt-1">Phone: +91 98765 43210</p>
          <div className="flex space-x-4 mt-3 text-sm">
            <a href="#" className="hover:text-teal-600 transition">LinkedIn</a>
            <a href="#" className="hover:text-teal-600 transition">GitHub</a>
          </div>
        </div>

      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} DrugTrack. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
