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
  // const [theme, setTheme] = useState(false);
  // const [deletedId, setDeletedId] = useState(0);

  /* set products in the cart associated to the id in the localStorage cart */
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`/bookings/${user?.email}`)
      .then((res) => setBookings(res.data))
      .catch((error) => setError(error.message));
  }, [axios, user?.email]);

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
      if (!res)
        Swal.fire({
          title: "Log out successfully.",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
    });

    // return () => loggingOut();
  };

  const signInGoogle = () => {
    setLoading(true);

    const googleProvider = new GoogleAuthProvider();

    const googlePopup = signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);

        Swal.fire({
          title: "User created successfully.(Firebase)",
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });
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

  /* Get Cart from DB */
  // useEffect(() => {
  //   fetch(`https://mahogany-furniture-server.vercel.app/cart`)
  //     .then((res) => res.json())
  //     .then((cartDB) => {
  //       if (typeof cartDB === "object" && cartDB.length)
  //         setCart([
  //           ...cartDB.filter((product) => product.email === user?.email),
  //         ]);
  //     })
  //     .catch((error) => console.error(error));
  // }, [user?.email]);

  // const handleRemoveFromCart = (id, count) => {
  //   if (!count)
  //     Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         /* Remove from DB */
  //         // fetch(`https://mahogany-furniture-server.vercel.app/cart/${id}`, {
  //         //   method: "DELETE",
  //         // })
  //         //   .then((res) => res.json())
  //         //   .then((data) => {
  //         //     // console.log(data);
  //         //     if (data.deletedCount) {
  //         //       // visual cart remove
  //         //       const remainingCart = cart.filter(
  //         //         (product) => product._id !== id
  //         //       );
  //         //       setCart(remainingCart);
  //         //       // remove from LS
  //         //       // removeFromLS(id);
  //         //       Swal.fire(
  //         //         "Deleted!",
  //         //         "The product is removed from cart successfully.",
  //         //         "success"
  //         //       );
  //         //     }
  //         //   });
  //       }
  //     });
  // };

  const handleRemoveFromBookings = (id) => {
    const index = bookings.findIndex((booking) => booking._id === id);
    if (index > -1) {
      bookings.splice(index - 1, 1);
      // console.log(newBookings, bookings);
      setBookings(bookings);
    }
    console.log(index);

    axios
      .delete(`/user/cancel-booking/${id}?email=${user?.email}`)
      .then(
        (res) => res.data.deletedCount && Swal.fire("Deleted successfully.")
      )
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Something wrong!",
          text: error.message,
        })
      );
  };

  const handleAddToBookings = (booking, id) => {
    const bookingInState = bookings?.filter((aBooking) => aBooking._id === id);
    const index = bookings.indexOf(bookingInState);

    console.log(bookingInState);

    if (bookingInState.length) {
      Swal.fire({
        title: "Are you want to replace previous booking?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          /* store the booking in state */
          const newBookings = booking.splice(index - 1, 1);
          setBookings([...newBookings, booking]);

          /* For database */
          axios
            .patch(`/book-service/${id}`, booking)
            .then(() =>
              Swal.fire({
                title: "Updated!",
                text: "Your booking is updated.",
                icon: "success",
              })
            )
            .catch((error) => console.error(error.message));
        }
      });
    } else {
      /* store the booking in state */
      setBookings([...bookings, booking]);
      console.log("New bookings...", bookings.length);

      /* For database */
      axios
        .post(`/book-service?id=${id}`, booking)
        .then(
          (res) =>
            res?.status &&
            Swal.fire({
              icon: "success",
              title: "Booked",
              text: "Booking Successful",
            })
        )
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
