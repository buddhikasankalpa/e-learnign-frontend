import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-2xl font-black text-blue-700 mb-4">Scholarly</h3>
          <p className="text-gray-500 leading-relaxed max-w-sm">
            The intellectual atelier for digital mastery. We curate world-class instruction for the next generation of creative technologists.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-gray-900 uppercase text-sm tracking-widest">Platform</h4>
          <Link to="/about" className="text-gray-500 hover:text-blue-600 transition-colors">About Us</Link>
          <Link to="/categories" className="text-gray-500 hover:text-blue-600 transition-colors">Course Catalog</Link>
          <Link to="/instructors" className="text-gray-500 hover:text-blue-600 transition-colors">Instructors</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-bold text-gray-900 uppercase text-sm tracking-widest">Support</h4>
          <Link to="/terms" className="text-gray-500 hover:text-blue-600 transition-colors">Terms of Service</Link>
          <Link to="/privacy" className="text-gray-500 hover:text-blue-600 transition-colors">Privacy Policy</Link>
          <Link to="/contact" className="text-gray-500 hover:text-blue-600 transition-colors">Contact Support</Link>
        </div>
      </div>

      <div className="border-t border-gray-100 pt-8 text-center">
        <p className="text-xs text-gray-400 uppercase tracking-widest">
          © 2024 SCHOLARLY ATELIER. CULTIVATING DIGITAL CRAFT.
        </p>
      </div>
    </footer>
  );
}