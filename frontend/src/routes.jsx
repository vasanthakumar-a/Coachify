import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoachDetail from "./pages/CoachDetail";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import Appointments from "./pages/Appointments";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "../components/Navbar";
import ProtectedRoute from "./providers/ProtectedRoute";


const AppRoutes = () => {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={
          <Login />
        } />
        <Route path="/signup" element={<Register />} />
        <Route path="/coach/:id" element={
          <CoachDetail />
        } />
        <Route path="/book/:coachId" element={
            <Booking />
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/appointments" element={
          <ProtectedRoute>
            <Appointments />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes