import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import Login from "./Login";
import Dashboard from "./Dashboard.jsx";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
