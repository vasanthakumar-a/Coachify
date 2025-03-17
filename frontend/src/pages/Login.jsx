import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { Link, Navigate } from "react-router-dom";

export default function LoginPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: step === 2 ? Yup.string().min(6, "Minimum 6 characters").required("Required") : null,
    }),
    onSubmit: async (values) => {
      if (step === 1) {
        // Simulate email/phone verification (or API call)
        setStep(2);
      } else {
        // Login API Call
        try {
          const response = await axiosInstance.post("/auth/login", values);
          const token = response.data.accessToken;
          if (token) {
            dispatch(login(token));
            window.history.back();
          }
        } catch (err) {
          setError(err.response?.data?.error || "Login failed");
        }
      }
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleGoogleLogin = () => {
    window.open("http://localhost:5001/api/auth/google", "_self");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          {step === 1 ? "Enter Email" : "Enter Password"}
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="mt-6" onSubmit={formik.handleSubmit}>
          {step === 1 && (
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...formik.getFieldProps("email")}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...formik.getFieldProps("password")}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder="Enter your password"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            {step === 2 && (
              <><button
                type="button"
                className="text-sm text-blue-500 hover:underline"
                onClick={() => setStep(1)}
              >
                Back
              </button>
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a></>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {step === 1 ? "Next" : "Login"}
          </button>
        </form>

        {/* Social Login Buttons */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Or sign in with</p>
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.3 0 6 .8 8.4 2.3l6.3-6.3C33.8 2.1 29.3.5 24 .5 14.6.5 6.6 5.5 2.3 12.9l7.5 5.8c2.4-7.1 9.2-12.2 16.2-12.2z"/>
                <path fill="#4285F4" d="M46.1 24.5c0-1.4-.1-2.7-.3-4H24v8.3h12.7c-.6 3.1-2.3 5.6-4.8 7.3l7.5 5.8c4.6-4.2 7.3-10.3 7.3-17.4z"/>
                <path fill="#FBBC05" d="M10.5 28.7C9.6 26.5 9 24.1 9 21.5s.6-5 1.5-7.2L2.3 8.5C.9 11.2 0 14.2 0 17.5c0 5.6 1.9 10.8 5.1 14.9l7.4-5.7z"/>
                <path fill="#34A853" d="M24 47.5c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.2 1.5-4.9 2.4-8 2.4-7.1 0-13.1-4.8-15.3-11.2l-7.5 5.8c3.8 7.7 11.8 12.9 20.4 12.9z"/>
              </svg>
              Google
            </button>

            <button
              onClick={()=>{}}
              className="w-full flex items-center justify-center gap-2 bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200"
            >
              Facebook
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
