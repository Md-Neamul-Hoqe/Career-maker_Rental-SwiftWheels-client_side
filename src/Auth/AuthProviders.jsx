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
import axios from "axios";
export const AuthContext = createContext();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* set products in the cart associated to the id in the database */
  const [bookings, setBookings] = useState([]);

  // console.log(bookings);

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

    // console.log("Logging Out");
    signOut(auth).then((res) => {
      console.log(res);
      if (!res) {
        axios
          .post("/user/logout", res)
          .then((response) => {
            if (response?.data?.success) {
              return Swal.fire({
                title: "Log out successfully.",
                showClass: {
                  popup: "animate__animated animate__fadeInDown",
                },
                hideClass: {
                  popup: "animate__animated animate__fadeOutUp",
                },
              });
            }
          })
          .catch((error) => {
            console.log(error.message);
            return setError(error.message);
          });
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
          .then(() => {
            setError("");
            // console.log("Google Sign in: ", res?.data);
            // if (res?.data?.success) {
            //   location?.state ? navigate(location?.state) : navigate("/");
            // }
          })
          .catch((error) => {
            console.log(error.message);
            return setError(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
        return setError(error.message);
      });

    return () => googlePopup();
  };

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
              // console.log(res?.data);
              res?.data?.modifiedCount && Swal.fire("Deleted successfully.");
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
        title: "Are you want to update the booking?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, update it!",
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
                  .then((res) => {
                    // console.log(res?.data);
                    res?.data?.modifiedCount &&
                      Swal.fire({
                        title: "Updated!",
                        text: "Your booking is updated.",
                        icon: "success",
                      });
                  })
                  .catch((error) => console.error(error));
              }
            })
            .catch((error) => console.error(error.message));
        }
      });
    } else {
      /* For database */
      booking.status = "pending";
      setError("");
      axios
        .post(`/book-service?id=${id}`, booking)
        .then((res) => {
          // console.log(res?.data);
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
                // console.log(res?.data);
                if (res?.data?.modifiedCount) {
                  /* store the booking in state */
                  // console.log("New bookings...", bookings.length);
                  booking._id = id;
                  setBookings([...bookings, booking]);
                }
              })
              .catch((error) => setError(error?.message));

            return Swal.fire({
              icon: "success",
              title: "Booked",
              text: "Booking Successful",
            });
          }

          console.log(res?.data);
        })
        .catch((error) => console.error(error.message));
    }
  };

  /* onAuthStateChanged */
  useEffect(() => {
    const userState = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // console.log("current user: ", currentUser);
      // if (!currentUser) signOut();

      setLoading(false);
    });

    return () => {
      return userState();
    };
  }, []);

  /* Get bookings */
  useEffect(() => {
    if (user?.email) {
      setError("");
      axios
        .get(`/bookings/${user?.email}`)
        .then((res) => {
          // console.log("Bookings: ", res?.data);
          const userBookings = res?.data;
          return setBookings(userBookings ? userBookings : []);
        })
        .catch((error) => {
          // console.log(error);
          return setError(error.message);
        });
    }
  }, [user?.email, setBookings]);

  /* Check services available now */
  useEffect(() => {
    if (user?.email && bookings?.length) {
      const ids = bookings?.map((booking) => booking._id);
      axios
        .post(`/services`, { ids })
        .then((res) => {
          setError("");

          console.log(res);

          const serverIds = res?.data.map((booking) => booking._id);
          const newIds = ids.filter((id) => !serverIds.includes(id));

          if (newIds?.length) {
            Swal.fire(
              `Services become unavailable. Please remove your bookings of id: ${newIds}`
            );
          }
        })
        .catch((error) => {
          console.log(error?.message);
          return setError(error?.message);
        });
    }
  }, [user?.email, setBookings, bookings]);

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
