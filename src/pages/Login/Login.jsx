import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, AuthContext } from '../../Provider/AuthProvider';

const Login = () => {
  const [error, setError] = useState('');
   const navigate = useNavigate();
  const { signIn, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters long.";
      toast.error(msg);
      setError(msg);
      return;
    }

    if (!/[A-Z]/.test(password)) {
      const msg = "Password must contain at least one uppercase letter.";
      toast.error(msg);
      setError(msg);
      return;
    }

    if (!/[a-z]/.test(password)) {
      const msg = "Password must contain at least one lowercase letter.";
      toast.error(msg);
      setError(msg);
      return;
    }

    signIn(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful!");
        navigate('/');
      })
      .catch((error) => {
        const errMsg = error.message || "Login failed.";
        toast.error(errMsg);
        setError(errMsg);
      });
  };

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
        toast.success("Logged in with Google!");
         navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
    <title>Log in |Rentify Car</title>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col mt-20">
          <h1 className="text-5xl font-bold text-center mb-10">Login now!</h1>
          <div className="card w-full max-w-sm shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <fieldset>
                <label className="label">Email</label>
                <input name="email" type="email" className="input" placeholder="Email" required />

                <div className="relative">
                  <label className="label">Password</label>
                  <input
                    name="password"
                    className="input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-8 right-6"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {error && <p className="text-red-400 text-xs">{error}</p>}
                <button type="submit" className="btn mt-4 btn-neutral w-full">Login</button>

                <p>
                  Don't Have An Account?Go to <Link to="/SignUp" className="text-red-500">SignUp</Link>Page
                </p>

                <h2 className="font-bold text-center my-2">OR</h2>

                <button onClick={handleGoogleSignIn} type="button" className="btn btn-outline btn-secondary w-full">
                  <FcGoogle size={30} /> Login with Google
                </button>
              </fieldset>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;