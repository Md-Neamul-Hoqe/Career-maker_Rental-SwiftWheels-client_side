import PropTypes from "prop-types";

const MaxWidthSection = ({ children }) => {
  return (
    <section className="max-w-6xl mx-auto">
      {children}
    </section>
  );
};

MaxWidthSection.propTypes = {
  children: PropTypes.node,
};

export default MaxWidthSection;
