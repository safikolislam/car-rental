import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { auth, AuthContext } from "../../Provider/AuthProvider";
import loginImage from "../../assets/Mobile login-bro.png";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    signIn(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message || "Login failed.");
        setError(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in with Google!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <title>Log in | Rentify Car</title>

      <div className="min-h-screen bg-base-200 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-base-100 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row items-center overflow-hidden"
        >
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -10 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="flex-1 flex justify-center items-center bg-primary/10 p-10"
          >
            <img src={loginImage} alt="Login" className="w-96 h-96 object-contain" />
          </motion.div>

          <div className="flex-1 p-10">
            <h1 className="text-4xl font-bold text-primary mb-2 text-center">
              Welcome Back
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Login to your Rentify Car account
            </p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="label text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="relative">
                <label className="label text-sm font-semibold text-gray-700">
                  Password
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-9 right-4 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {error && <p className="text-error text-xs mt-1">{error}</p>}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn btn-primary w-full text-white"
              >
                Login
              </motion.button>

              <div className="text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link to="/SignUp" className="text-primary font-semibold hover:underline">
                  Sign up
                </Link>
              </div>

              <div className="divider text-gray-400">OR</div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleGoogleSignIn}
                type="button"
                className="btn btn-outline btn-secondary w-full flex items-center justify-center gap-2"
              >
                <FcGoogle size={28} /> Log in with Google
              </motion.button>
            </form>

            <ToastContainer position="top-center" />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;



