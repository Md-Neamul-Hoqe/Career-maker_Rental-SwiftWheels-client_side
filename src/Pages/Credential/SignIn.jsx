import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import ContextProvider from "../../Hooks/ContextProvider";
import useAxios from "../../Hooks/useAxios";

const SignIn = () => {
  const axios = useAxios();
  const { user, setUser, error, setError, signIn, signInGoogle } =
    ContextProvider();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setError("");

    console.log(location);

    const form = e.target;
    const email = form.email.value;
    // const photo = Form.get("photo");
    const password = form.password.value;

    signIn(email, password)
      .then((res) => {
        /* User logged in successfully */
        setError("");
        setUser(res.user);

        console.log(res.user);

        /* show popup after redirect to another page */
        setTimeout(() => {
          Swal.fire({
            title: "User signed in successfully.",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }, 2000);

          axios
            .post("/auth/jwt", { email: res?.user?.email })
            .then((res) => {
              setError("");
              console.log(res.data);
              if (res.data.success) {
                location?.state ? navigate(location?.state) : navigate("/");
              }
            })
            .catch((error) => setError(error.message));
        /* navigate after login */

        /* Update user information to database */
        // axios
        //   .patch("/users", user)
        //   .then((res) => {

        //     if (res.data.modifiedCount) {
        //       setTimeout(() => {
        //         console.log("User info updated in database successfully.");
        //       }, 2500);
        //     }
        //   });
      })
      .catch((error) => {
        return setError(error.message);
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="card w-full max-w-xl my-10 bg-base-100">
        <form onSubmit={handleSignIn} className="card-body">
          <h4 className="text-2xl text-center text-dark font-semibold">
            Sign in to your account
          </h4>
          <hr className="my-5 text-light" />
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-primary capitalize text-white">
              Sign In
            </button>
          </div>

          {/* go to register page */}
          <div className="text-center pt-7">
            <span>Don&apos;t have an account?</span>
            <Link to="/signUp" className="link link-hover text-primary ps-2">
              Sign Up A New Account
            </Link>
          </div>

          <div className="divider">OR</div>
          <Link
            onClick={() => {
              signInGoogle();
              setTimeout(() => {
                user &&
                  Swal.fire({
                    title: "Your are logged in successfully.",
                    showClass: {
                      popup: "animate__animated animate__fadeInDown",
                    },
                    hideClass: {
                      popup: "animate__animated animate__fadeOutUp",
                    },
                  });
              }, 3000);
            }}
            className="flex justify-center items-center w-full border rounded-2xl py-3 text-3xl">
            <FcGoogle className="text-2xl" />{" "}
            <span className="text-xl ms-3 font-semibold capitalize">
              Sign in with google
            </span>
          </Link>

          {error && (
            <div>
              <p className="text-red-800 bg-red-300 p-3 rounded-lg">{error}</p>
            </div>
          )}
        </form>
      </div>

      <Helmet>
        <title>{"SwiftWheels | Sign In"}</title>
      </Helmet>
    </div>
  );
};

export default SignIn;
