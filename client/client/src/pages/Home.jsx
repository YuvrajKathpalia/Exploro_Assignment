import React from 'react';
import land from '../assets/land.webp'; 
import { useNavigate } from 'react-router-dom';

function Home() {

    const navigate = useNavigate(); 

  const handleExploreClick = () => {
    navigate('/trips'); 
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <header 
        className="bg-cover bg-center text-white text-center py-32 px-4 min-h-screen relative" 
        style={{ backgroundImage: `url(${land})` }}
      >
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 py-20"></div>

        <div className="relative z-12 max-w-xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-shadow-md mt-16 ">
            Welcome to Aventura
          </h1>
          <p className="text-lg mb-6">
            Your gateway to unforgettable travel experiences!
          </p>
          <button 
            className="bg-orange-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-orange-400 transition duration-300"
            onClick={handleExploreClick} 
          >
            Explore Trips
          </button>
        </div>
      </header>


      <section className="py-16 px-4 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold mb-6">Why Choose Aventura?</h2>
        <p className="text-lg text-gray-700 mb-8">
          We provide the best deals on unforgettable travel experiences around the world. Whether you're looking for a relaxing beach vacation, a thrilling adventure, or a cultural city escape, we have something for everyone.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
            <p className="text-gray-600">Find amazing travel deals within your budget.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Expertly Curated Trips</h3>
            <p className="text-gray-600">Our team of travel experts handpicks the best destinations for you.</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Flexible Cancellation</h3>
            <p className="text-gray-600">Enjoy peace of mind with our flexible cancellation policies.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-6">What Our Customers Say</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 italic">"TravelHub made planning my vacation so easy! The trip was seamless, and the experience was unforgettable."</p>
            <p className="mt-4 font-semibold text-gray-800">John Doe</p>
            <p className="text-sm text-gray-500">Vacationer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 italic">"I loved how easy it was to book everything online. The trip was everything I hoped for and more!"</p>
            <p className="mt-4 font-semibold text-gray-800">Jane Smith</p>
            <p className="text-sm text-gray-500">Explorer</p>
          </div>
        </div>
      </section>

      
    </div>
  );
}

export default Home;
