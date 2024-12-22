import React, { useState } from 'react';
import { Menu, X, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get user from Redux state
  const { user } = useSelector((state) => state.auth);

  const navigation = [
    { name: 'Home', href: '/', onClick: () => navigate('/') },
    { name: 'Trips', href: '/trips', onClick: () => navigate('/trips') },
  ];

  // Add organizer-specific navigation items
  const organizerNavigation = user?.role === 'organizer' ? [
    { name: 'Add Trip', href: '/add-trip', onClick: () => navigate('/add-trip') },
    { name: 'My Trips', href: '/my-trips', onClick: () => navigate('/my-trips') },
  ] : [];

  const allNavigation = [...navigation, ...organizerNavigation];

  const handleLoginClick = () => {
    navigate('/login');
    setIsOpen(false);
  };

  const handleRegisterClick = () => {
    navigate('/register');
    setIsOpen(false);
  };
  
  const handleHomeClick = () => {
    navigate('/');
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowDropdown(false);
    setIsOpen(false);
  };

  const handleDashboard = () => {
    navigate(user?.role === 'organizer' ? '/organizer-dashboard' : '/dashboard');
    setShowDropdown(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800">
      <div className="mx-11 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <button className="text-white text-3xl mr-3 font-bold" onClick={handleHomeClick}>
              Adventura
            </button>
          </div>

          {/*  (Desktop) */}
          <div className="hidden sm:flex sm:space-x-8 ml-10">
            {allNavigation.map((item) => (
              <button
                key={item.name}
                onClick={item.onClick}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-5 rounded-md text-lg font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden sm:flex items-center ml-auto space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
                >
                  <UserCircle className="h-6 w-6" />
                  <span>{user.name}</span>
                </button>
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                    <button
                      onClick={handleDashboard}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-5 py-2 rounded-md text-lg font-medium"
                >
                  Login
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md text-lg font-medium"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile button*/}
          <div className="flex items-center sm:hidden ml-auto">
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
            {allNavigation.map((item) => (
              <button
                key={item.name}
                onClick={item.onClick}
                className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </button>
            ))}
            {user ? (
              <>
                <button
                  onClick={handleDashboard}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </button>
                <button
                  onClick={handleRegisterClick}
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