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
export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [theme, setTheme] = useState(false);
  const [deletedId, setDeletedId] = useState(0);

  /* set products in the cart associated to the id in the localStorage cart */
  const [cart, setCart] = useState([]);

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
      .catch((error) => setError(error));

    return () => googlePopup();
  };

  /* onAuthStateChanged */
  useEffect(() => {
    const userState = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      console.log('current user: ',currentUser);

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

  const handleRemoveFromCart = (id, purchase) => {
    if (!purchase)
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          /* Remove from DB */
          // fetch(`https://mahogany-furniture-server.vercel.app/cart/${id}`, {
          //   method: "DELETE",
          // })
          //   .then((res) => res.json())
          //   .then((data) => {
          //     // console.log(data);
          //     if (data.deletedCount) {
          //       // visual cart remove
          //       const remainingCart = cart.filter(
          //         (product) => product._id !== id
          //       );
          //       setCart(remainingCart);
          //       // remove from LS
          //       // removeFromLS(id);
          //       Swal.fire(
          //         "Deleted!",
          //         "The product is removed from cart successfully.",
          //         "success"
          //       );
          //     }
          //   });
        }
      });
  };

  const handleAddToCart = (product, purchase = null) => {
    /* Set Bottle To The State */

    const newCart = [...cart];

    const productInCart = cart.find((e) => e._id === product._id);

    const idxOfTheProduct = cart.indexOf(productInCart);

    // console.log(idxOfTheProduct);

    if (idxOfTheProduct !== -1) {
      if (!purchase) {
        product.purchase = cart[idxOfTheProduct]?.purchase + 1;
        cart[idxOfTheProduct].purchase += 1;
      } else {
        product.purchase = purchase;
        cart[idxOfTheProduct].purchase = purchase;
      }

      // fetch(
      //   `https://mahogany-furniture-server.vercel.app/cart/${product._id}`,
      //   {
      //     method: "PATCH",
      //     headers: {
      //       "content-type": "application/json",
      //     },
      //     body: JSON.stringify(product),
      //   }
      // )
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.modifiedCount || data.upsertedCount)
      //       Swal.fire({
      //         title: `You selected ${product.purchase} pics of the product successfully.`,

      //         showClass: {
      //           popup: "animate__animated animate__fadeInDown",
      //         },

      //         hideClass: {
      //           popup: "animate__animated animate__fadeOutUp",
      //         },
      //       });
      //   });
    } else {
      /* for local state */
      // const newProductInCart = {
      //   title: product.title,
      //   price: product.price.new,
      //   quantity: product.quantity,
      // };
      product.purchase = purchase ? purchase : 1;
      product.email = user?.email;

      newCart.push(product);
      setCart(newCart);

      /* For database */
      // fetch(`https://mahogany-furniture-server.vercel.app/cart`, {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(product),
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data.acknowledged)
      //       Swal.fire({
      //         title: "The product added to your cart successfully.",
      //         showClass: {
      //           popup: "animate__animated animate__fadeInDown",
      //         },
      //         hideClass: {
      //           popup: "animate__animated animate__fadeOutUp",
      //         },
      //       });
      //   });
    }

    /* Set product id to the LS */
    // addToLS(product._id);

    // product._id &&
    //   Swal.fire({
    //     title: "The product added to the cart successfully.",
    //     showClass: {
    //       popup: "animate__animated animate__fadeInDown",
    //     },
    //     hideClass: {
    //       popup: "animate__animated animate__fadeOutUp",
    //     },
    //   });
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
    deletedId,
    setDeletedId,
    cart,
    setCart,
    handleRemoveFromCart,
    handleAddToCart,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProviders.propTypes = {
  children: PropTypes.node,
};
export default AuthProviders;
