import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTrip } from '../../features/trips/tripSlice';

const TripDetails = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { trip, isLoading, isError, message } = useSelector(state => state.trips);

  useEffect(() => {
    dispatch(getTrip(id)); // Fetch the trip details by ID
  }, [dispatch, id]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="spinner-border text-primary" role="status"></div>
    </div>
  );

  if (isError) return (
    <div className="text-red-600 text-center mt-10 h-screen flex justify-center items-center">
      {message}
    </div>
  );

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-r from-orange-400 via-yellow-400 to-red-500">
      <div className="w-full max-w-6xl p-8 bg-white rounded-lg shadow-lg">
        {trip && (
          <div>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">{trip.title}</h1>
            <p className="text-lg text-center text-gray-600 mb-6">{trip.location}</p>

            <div className="mb-6">
              <p className="text-gray-800 text-lg mb-4"><strong>Description:</strong> {trip.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-gray-800"><strong>Start Date:</strong> {new Date(trip.startDate).toLocaleDateString()}</p>
                  <p className="text-gray-800"><strong>End Date:</strong> {new Date(trip.endDate).toLocaleDateString()}</p>
                  <p className="text-gray-800"><strong>Price:</strong> ${trip.price}</p>
                  <p className="text-gray-800"><strong>Available Slots:</strong> {trip.availableSlots}</p>
                </div>

                <div className="space-y-4">
                  {trip.images && trip.images.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">Images:</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {trip.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Trip image ${index + 1}`}
                            className="w-full h-40 object-cover rounded-lg shadow-md"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="px-6 py-3 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition duration-300">
                Book Trip
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripDetails;
