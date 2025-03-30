import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../src/redux/authSlice";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <nav className="bg-blue-500 text-dark shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          MyApp
        </Link>

        {/* Menu Items */}
        <div className="mx-auto flex gap-4 items-center">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <Link to="/appointments" className="hover:underline">
                My Sessions
              </Link>
              <button
                onClick={() => dispatch(logout())}
                className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-xl">☰</button>
      </div>
    </nav>
  );
};

export default Navbar;
