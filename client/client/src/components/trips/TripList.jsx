import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TripCard from './TripCard';
import { getTrips } from '../../features/trips/tripSlice';

const TripList = () => {
  const dispatch = useDispatch();
  
  
  const { trips, loading, isError, message } = useSelector(state => state.trips);

  useEffect(() => {
    dispatch(getTrips());
  }, [dispatch]);


  console.log('Trips state:', trips);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

 
  if (isError) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {message}</span>
      </div>
    );
  }

  // No trips available state
  if (!Array.isArray(trips) || !trips.length) {
    return (
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
        <strong className="font-bold">No trips available.</strong>
        <span className="block sm:inline"> Check back later for new travel opportunities!</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {trips.map((trip) => (
        <TripCard key={trip._id} trip={trip} />
      ))}
    </div>
  );
};

export default TripList;
