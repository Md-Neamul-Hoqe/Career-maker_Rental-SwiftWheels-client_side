import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import ContextProvider from "./ContextProvider";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = ContextProvider();

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner text-warning loading-lg"></span>
      </div>
    );

  if (user) return children;

  return <Navigate to="/SignIn" />;
};

PrivateRoutes.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoutes;
