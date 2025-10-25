import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import { AuthContext } from "../../Provider/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import signupImage from "../../assets/Mobile login-bro.png";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    if (!imageFile) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`;
      const res = await axios.post(cloudinaryUrl, formData);

      setUploadedImageUrl(res.data.secure_url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
      setUploadedImageUrl("");
    } finally {
      setUploading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (!uploadedImageUrl) {
      toast.error("Please upload a profile image.");
      return;
    }

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters long.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      const msg = "Password must contain at least one uppercase letter.";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (!/[a-z]/.test(password)) {
      const msg = "Password must contain at least one lowercase letter.";
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await updateUser({ displayName: name, photoURL: uploadedImageUrl });
      setUser({ ...user, displayName: name, photoURL: uploadedImageUrl });

      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <>
      <title>SignUp | Rentify Car</title>
      <div className="min-h-screen bg-base-200 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-base-100 rounded-3xl shadow-2xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden"
        >
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -10 }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
            className="flex-1 flex justify-center items-center bg-primary/10 p-10"
          >
            <img src={signupImage} alt="Sign Up" className="w-96 h-96 object-contain" />
          </motion.div>

          <div className="flex-1 p-10">
            <h1 className="text-4xl font-bold text-primary text-center mb-2">
              Create Account
            </h1>
            <p className="text-center text-gray-500 mb-6">
              Sign up to Rentify Car
            </p>

            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="label text-sm font-semibold text-gray-700">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div>
                <label className="label text-sm font-semibold text-gray-700">Profile Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input file-input-bordered w-full"
                  required
                />
                {uploading && <p className="text-sm text-blue-500 mt-1">Uploading image...</p>}
                {uploadedImageUrl && (
                  <img
                    src={uploadedImageUrl}
                    alt="Profile preview"
                    className="w-32 h-32 object-cover mt-2 rounded-full"
                  />
                )}
              </div>

              <div>
                <label className="label text-sm font-semibold text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input input-bordered w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="relative">
                <label className="label text-sm font-semibold text-gray-700">Password</label>
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

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Sign Up"}
              </button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/Login" className="text-primary font-semibold hover:underline">
                  Login
                </Link>
              </div>
            </form>

            <ToastContainer position="top-center" />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SignUp;
