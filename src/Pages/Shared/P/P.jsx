import PropTypes from "prop-types";

const P = ({ children }) => {
  return <p className="text-lg text-gray-500">{children}</p>;
};

P.propTypes = {
  children: PropTypes.node,
};

export default P;
