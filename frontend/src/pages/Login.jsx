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
