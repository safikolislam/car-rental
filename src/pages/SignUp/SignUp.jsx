import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';


import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from '../../Provider/AuthProvider';

const SignUp = () => {
   const navigate = useNavigate();
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;

    if (password.length < 6) {
      const msg = "Password must be at least 6 characters long.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!uppercaseRegex.test(password)) {
      const msg = "Password must contain at least one uppercase letter.";
      setError(msg);
      toast.error(msg);
      return;
    }
    if (!lowercaseRegex.test(password)) {
      const msg = "Password must contain at least one lowercase letter.";
      setError(msg);
      toast.error(msg);
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        updateUser({ displayName: name, photoURL: photo })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
            toast.success("Account created successfully!");
             navigate('/');
          })
          .catch((error) => {
            console.log(error);
            toast.error("Failed to update profile.");
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        toast.error(errorMessage);
      });
  };

  return (
    <>
      <title>SignUp | CB</title>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col mt-20">
          <h1 className="text-5xl font-bold text-center mb-10">SignUp!</h1>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <fieldset className="fieldset">
                <label className="label">Name</label>
                <input name="name" type="text" className="input" placeholder="Your Name" required />
                
                <label className="label">Photo URL</label>
                <input name="photo" type="text" className="input" placeholder="Your photo URL" required />
                
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

                <div><a className="link link-hover">Forgot password?</a></div>
                
                {error && <p className="text-red-400 text-xs">{error}</p>}
                
                <button type="submit" className="btn btn-neutral mt-4">SignUp</button>
                
                <p>
                  Already Have An Account? Go to <Link to="/Login" className="text-red-500">Login</Link> page
                </p>
              </fieldset>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;