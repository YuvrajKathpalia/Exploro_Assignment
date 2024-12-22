import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Adventura</h3>
            <p className="text-sm">
              Discover amazing destinations and create unforgettable memories with our curated travel experiences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white">Contact</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: info@Adventura.com</li>
              <li>Phone: +91 8708181203</li>
              <li>Address: 123 Travel Street, Adventure City</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Adventura. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
