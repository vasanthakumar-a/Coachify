import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, googleLogin } from "../store/authSlice";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button type="submit">Login</button>
      </form>
      <button onClick={googleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
