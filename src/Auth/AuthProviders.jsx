import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import auth from "./firebase.config";
import useAxios from "../Hooks/useAxios";
export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const axios = useAxios();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* set products in the cart associated to the id in the localStorage cart */
  const [bookings, setBookings] = useState([]);

  console.log(bookings);

  /* Get bookings */
  useEffect(() => {
    if (user?.email)
      axios
        .get(`/bookings/${user?.email}`)
        .then((res) => {
          setError("");
          console.log("Bookings: ", res?.data);
          setBookings(res?.data);
        })
        .catch((error) => setError(error.message));
  }, [axios, user?.email, setBookings]);

  /* Check services available now */
  useEffect(() => {
    const ids = bookings.map((booking) => booking._id);
    if (user?.email)
      axios
        .post(`/services`, { ids })
        .then((res) => {
          setError("");

          const serverIds = res.data.map((booking) => booking._id);
          const newIds = ids.filter((id) => !serverIds.includes(id));

          if (newIds.length) {
            Swal.fire(
              `Services become unavailable. Please remove your bookings of id: ${newIds}`
            );
          }
        })
        .catch((error) => setError(error.message));
  }, [axios, user?.email, setBookings, bookings]);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);

    console.log("Logging Out");
    signOut(auth).then((res) => {
      if (!res) {
        axios
          .post("/user/logout", res)
          .then((response) => {
            if (response?.data?.success)
              return Swal.fire({
                title: "Log out successfully.",
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
              });
          })
          .catch((error) => setError(error.message));
      }
    });

    // return () => loggingOut();
  };

  const signInGoogle = () => {
    setLoading(true);

    const googleProvider = new GoogleAuthProvider();

    const googlePopup = signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);

        setError("");

        Swal.fire({
          title: "User created successfully.(Firebase)",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });

        axios
          .post("/auth/jwt", { email: result?.user?.email })
          .then((res) => {
            setError("");
            console.log("Google Sign in: ", res?.data);
            // if (res?.data?.success) {
            //   location?.state ? navigate(location?.state) : navigate("/");
            // }
          })
          .catch((error) => setError(error.message));
      })
      .catch((error) => setError(error.message));

    return () => googlePopup();
  };

  /* onAuthStateChanged */
  useEffect(() => {
    const userState = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      console.log("current user: ", currentUser);

      setLoading(false);
    });

    return () => {
      userState();
    };
  }, []);

  const handleRemoveFromBookings = (id) => {
    const theBooking = bookings.find((booking) => booking._id === id);
    if (!theBooking)
      return Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Not booked yet",
      });

    const newBookings = bookings.filter((booking) => booking._id !== id);

    setBookings(newBookings);

    axios
      .delete(`/user/cancel-booking/${id}?email=${user?.email}`)
      .then((res) => {
        if (res?.data.deletedCount) {
          const statusInfo = {
            status: "available",
            income: null,
            schedule: null,
          };

          axios
            .patch(`/update-service/${id}?type=${theBooking?.type}`, statusInfo)
            .then((res) => {
              console.log(res.data);
              res.data?.modifiedCount && Swal.fire("Deleted successfully.");
            })
            .catch((error) => console.error(error));
        }
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Something wrong!",
          text: error.message,
        })
      );
  };

  const handleAddToBookings = (booking, id) => {
    const bookingIndexInBookings = bookings?.findIndex(
      (aBooking) => aBooking._id === id
    );

    if (bookingIndexInBookings > -1) {
      Swal.fire({
        title: "Are you want to replace previous booking?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, replace it!",
      }).then((result) => {
        if (result.isConfirmed) {
          /* store the booking in state */
          const newBookings = bookings.filter((booking) => booking._id === id);
          setBookings([...newBookings, booking]);

          /* For database */
          axios
            .patch(`/update-booking/${id}`, booking)
            .then((res) => {
              /* Update provider schedule */
              if (res?.data?.modifiedCount || res?.data?.insertedId) {
                const statusInfo = {
                  status: "pending",
                  income: booking?.totalCost,
                  schedule: booking?.pickUp,
                };

                axios
                  .patch(
                    `/update-service/${id}?type=${booking?.type}`,
                    statusInfo
                  )
                  .then((res) => console.log(res.data))
                  .catch((error) => console.error(error));
              }

              Swal.fire({
                title: "Updated!",
                text: "Your booking is updated.",
                icon: "success",
              });
            })
            .catch((error) => console.error(error.message));
        }
      });
    } else {
      /* For database */
      booking.status = "pending";

      axios
        .post(`/book-service?id=${id}`, booking)
        .then((res) => {
          console.log(res?.data);
          if (res?.data?.insertedId || res?.data?.index > -1) {
            const statusInfo = {
              status: "Pending",
              income: booking?.totalCost,
              schedule: booking?.pickUp,
            };
            axios
              .patch(`/update-service/${id}?type=${booking?.type}`, {
                statusInfo,
              })
              .then((res) => {
                console.log(res.data);
                if (res.data?.modifiedCount) {
                  /* store the booking in state */
                  console.log("New bookings...", bookings.length);
                  booking._id = id;
                  setBookings([...bookings, booking]);
                }
              })
              .catch((error) => setError(error?.message));
          }

          Swal.fire({
            icon: "success",
            title: "Booked",
            text: "Booking Successful",
          });
        })
        .catch((error) => console.error(error.message));
    }
  };

  const authInfo = {
    user,
    signIn,
    setUser,
    createUser,
    signInGoogle,
    loading,
    setLoading,
    error,
    setError,
    logOut,
    handleAddToBookings,
    handleRemoveFromBookings,
    bookings,
    setBookings,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProviders.propTypes = {
  children: PropTypes.node,
};
export default AuthProviders;
