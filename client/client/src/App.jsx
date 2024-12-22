import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TripList from './components/trips/TripList';
import TripDetails from './components/trips/TripDetails';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/trips" element={<TripList />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;