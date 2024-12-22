import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = null; 

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Trips', href: '#' },
  ];

  return (
    <nav className="bg-gray-800">
      <div className="mx-11 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16  items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <a href="#" className="text-white text-3xl mr-3 font-bold">
              Adventura
            </a>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden sm:flex sm:space-x-8 ml-10">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md text-lg font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden sm:flex items-center ml-auto space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {}}
                  className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  <span>{user.name}</span>
                </button>
                {/* Dropdown Menu */}
                <div className="hidden group-hover:block absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Dashboard
                  </a>
                  <button
                    onClick={() => {}}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-5 py-2 rounded-md text-lg font-medium"
                >
                  Login
                </button>
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md text-lg font-medium"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:bg-gray-700 hover:text-white p-2 rounded-md"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ))}
            {!user && (
              <>
                <button
                  className="w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </button>
                <button
                  className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-base font-medium"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
