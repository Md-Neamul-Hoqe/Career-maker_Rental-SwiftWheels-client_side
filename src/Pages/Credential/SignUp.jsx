import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import useContextProvider from "../../Hooks/useContextProvider";
import useAxios from "../../Hooks/useAxios";

import { motion } from "framer-motion";
import { useState } from "react";

const SignUp = () => {
  const { createUser, error, setError, signInGoogle } = useContextProvider();

  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };

  const navigate = useNavigate();

  const axios = useAxios();
  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const Form = new FormData(e.currentTarget);
    const email = Form.get("email");
    const password = Form.get("password");
    // const name = Form.get("name");
    // const photo = Form.get("photo");
    const check = isOn;

    /* Verifications */
    if (!check) {
      return setError("Please check our Terms & Conditions.");
    } else if (password.length < 6)
      return setError("Give a password with minimum 6 characters long.");
    else if (!/[A-Z]/.test(password))
      return setError("Please use at lease a uppercase character.");
    else if (!/[^a-zA-Z0-9]/.test(password))
      return setError("Please use at least a special character.");

    createUser(email, password)
      .then(() => {
        e.target.reset();
        setError("");

        // const createdAt = res.user?.metadata?.creationTime;

        // console.log(name, email, password, createdAt);

        /* store data to the database */
        // const user = { name, email, createdAt };

        setTimeout(() => {
          Swal.fire({
            title: "Your new account created successfully.",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }, 2000);

        axios
          .post("/auth/jwt", { email })
          .then((res) => {
            setError("");
            // console.log(res?.data);
            if (res?.data?.success) {
              location?.state ? navigate(location?.state) : navigate("/");
            }
          })
          .catch((error)=>{
            console.log(error.message);
            return setError(error.message);
          });
      })
      .catch((error)=>{
            console.log(error.message);
            return setError(error.message);
          });
  };

  return (
    <section>
      <div className="hero min-h-screen bg-base-200">
        <div className="card w-full max-w-xl my-10">
          <form onSubmit={handleRegister} className="card-body bg-base-100">
            <h2 className="text-2xl text-center text-dark font-semibold">
              Register a new account
            </h2>
            <hr className="my-5 text-light" />
            <div className="form-control">
              <label className="label">
                <span className="label-text max-md:text-white font-semibold">
                  Your Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered bg-light mt-4 mb-6"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text max-md:text-white font-semibold">
                  Email Address
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="input input-bordered bg-light mt-4 mb-6"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text max-md:text-white font-semibold">
                  Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered bg-light mt-4 mb-6"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text max-md:text-white font-semibold">
                  Your Photo URL
                </span>
              </label>
              <input
                type="url"
                name="url"
                placeholder="Enter your photo URL"
                className="input input-bordered bg-light mt-4 mb-6"
                required
              />
            </div>
            <div className="form-control mt-6 flex flex-row gap-2 text-base">
              <div className="switch" data-isOn={isOn} onClick={toggleSwitch}>
                <motion.div className="handle" layout transition={spring} />
              </div>
              {/* <input
                type="checkbox"
                name="check"
                className="toggle toggle-warning"
                required
              /> */}
              <span className=" text-gray">Accept Terms & Conditions</span>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-primary text-white capitalize w-full">
                Register
              </button>
            </div>

            <div className="form-control mt-6 flex md:flex-row md:gap-2 text-base">
              Already have an account?{" "}
              <Link className="text-primary font-bold" to="/signIn">
                Sign In
              </Link>
            </div>

            <div className="divider">OR</div>
            <Link
              onClick={signInGoogle}
              className="flex justify-center items-center w-full border rounded-2xl py-3 text-3xl">
              <FcGoogle className="text-2xl" />{" "}
              <span className="text-xl ms-3 font-semibold capitalize">
                Sign in with google
              </span>
            </Link>
            {error ? (
              <p className="text-red-800 bg-red-300 p-3 rounded-lg">
                {JSON.stringify(error)}
              </p>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
      <Helmet>
        <title>{"SwiftWheels | Sign Up"}</title>
      </Helmet>
    </section>
  );
};

export default SignUp;
