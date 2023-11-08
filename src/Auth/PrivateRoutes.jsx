import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import ContextProvider from "../Hooks/ContextProvider";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = ContextProvider();
  const location = useLocation();

  console.log(location);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-warning loading-lg"></span>
      </div>
    );

  if (user) return children;

  return <Navigate state={location.pathname} to="/SignIn" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoutes;
