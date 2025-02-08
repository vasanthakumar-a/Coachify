// import axios from "axios";

const Auth = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5001/api/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button onClick={handleGoogleLogin} className="px-4 py-2 bg-blue-500 text-white">
        Login with Google
      </button>
    </div>
  );
};

export default Auth;
