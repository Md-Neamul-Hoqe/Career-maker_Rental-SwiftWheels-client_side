import PropTypes from "prop-types";

const MaxWidthSection = ({ children }) => {
  return (
    <section className="max-w-6xl mx-auto min-h-[calc(100vh-265px)]">
      {children}
    </section>
  );
};

MaxWidthSection.propTypes = {
  children: PropTypes.node,
};

export default MaxWidthSection;
