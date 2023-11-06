import PropTypes from "prop-types";

const P = ({ children }) => {
  return <p className="text-lg text-gray-400">{children}</p>;
};

P.propTypes = {
  children: PropTypes.node,
};

// eslint-disable-next-line react-refresh/only-export-components
export default P;
