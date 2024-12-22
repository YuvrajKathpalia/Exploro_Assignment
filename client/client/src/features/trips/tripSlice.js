import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api'; 

const initialState = {
  trips: [],
  trip: null,
  organizerTrips: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all trips
export const getTrips = createAsyncThunk('trips/getAll', async (_, thunkAPI) => {
  try {
    const response = await api.get('/trips'); // Base URL handled in api.js
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch trips';
    return thunkAPI.rejectWithValue(message);
  }
});

// Get single trip
export const getTrip = createAsyncThunk('trips/getTrip', async (id, thunkAPI) => {
  try {
    const response = await api.get(`/trips/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch trip';
    return thunkAPI.rejectWithValue(message);
  }
});

// Create new trip (organizer only)
export const createTrip = createAsyncThunk('trips/create', async (tripData, thunkAPI) => {
  try {
    const response = await api.post('/trips', tripData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to create trip';
    return thunkAPI.rejectWithValue(message);
  }
});

// Update trip (organizer only)
export const updateTrip = createAsyncThunk('trips/update', async ({ id, tripData }, thunkAPI) => {
  try {
    const response = await api.put(`/trips/${id}`, tripData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to update trip';
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete trip (organizer only)
export const deleteTrip = createAsyncThunk('trips/delete', async (id, thunkAPI) => {
  try {
    const response = await api.delete(`/trips/${id}`);
    return { id, message: response.data.message };
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to delete trip';
    return thunkAPI.rejectWithValue(message);
  }
});

// Get organizer's trips
export const getOrganizerTrips = createAsyncThunk('trips/getOrganizerTrips', async (_, thunkAPI) => {
  try {
    const response = await api.get('/trips/organizer');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Failed to fetch organizer trips';
    return thunkAPI.rejectWithValue(message);
  }
});

const tripSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    reset: (state) => {
      state.trips = [];
      state.trip = null;
      state.organizerTrips = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
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
        state.trips = state.trips.map((trip) =>
          trip._id === action.payload._id ? action.payload : trip
        );
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
        state.trips = state.trips.filter((trip) => trip._id !== action.payload.id);
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
