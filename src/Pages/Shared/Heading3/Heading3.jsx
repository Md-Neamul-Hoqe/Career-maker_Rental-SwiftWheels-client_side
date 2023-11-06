import PropTypes from "prop-types";

const Heading3 = ({ children }) => {
  return <h3 className="text-4xl text-black font-semibold">{children}</h3>;
};

Heading3.propTypes = {
  children: PropTypes.node,
};

export default Heading3;
