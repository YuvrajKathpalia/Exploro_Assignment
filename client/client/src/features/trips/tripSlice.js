import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  trips: [],
  trip: null,
  organizerTrips: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const getTrips = createAsyncThunk(
    'trips/getAll',
    async (_, thunkAPI) => {
      try {
        const response = await axios.get('http://localhost:1000/api/trips');  // Ensure this URL is correct
        return response.data;
      } catch (error) {
        const message = error.response?.data?.message || error.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  
// Get single trip
export const getTrip = createAsyncThunk(
  'trips/getTrip',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`http://localhost:1000/api/trips/${id}`);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new trip (organizer only)
export const createTrip = createAsyncThunk(
  'trips/create',
  async (tripData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post('http://localhost:1000/api/trips', tripData, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update trip (organizer only)
export const updateTrip = createAsyncThunk(
  'trips/update',
  async ({ id, tripData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(`http://localhost:1000/api/trips/${id}`, tripData, config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete trip (organizer only)
export const deleteTrip = createAsyncThunk(
  'trips/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(`http://localhost:1000/api/trips/${id}`, config);
      return { id, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get organizer's trips
export const getOrganizerTrips = createAsyncThunk(
  'trips/getOrganizerTrips',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://localhost:1000/api/trips/organizer', config);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get all trips
      .addCase(getTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trips = action.payload;
      })
      .addCase(getTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get single trip
      .addCase(getTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trip = action.payload;
      })
      .addCase(getTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Create trip
      .addCase(createTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trips.push(action.payload);
      })
      .addCase(createTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update trip
      .addCase(updateTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trips = state.trips.map(trip => 
          trip._id === action.payload._id ? action.payload : trip
        );
        state.trip = action.payload;
      })
      .addCase(updateTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete trip
      .addCase(deleteTrip.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTrip.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trips = state.trips.filter(trip => trip._id !== action.payload.id);
      })
      .addCase(deleteTrip.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get organizer trips
      .addCase(getOrganizerTrips.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrganizerTrips.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.organizerTrips = action.payload;
      })
      .addCase(getOrganizerTrips.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tripSlice.actions;
export default tripSlice.reducer;