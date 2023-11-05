import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import MaxWidthSection from "../../../components/MaxWidthSection";

const Rent = ({ props }) => {
  const title = props?.car ? props.car.title : props.bike.title;
  const para = props?.car ? props.car.para : props.bike.para;
  const align = props.align;
  const img = props.img;

  return (
    <MaxWidthSection>
      <div
        className={`${
          props?.car ? "" : "flex-row-reverse"
        } flex gap-5 py-10 min-h-[470px] items-center`}>
        <div className="space-y-5 flex-1">
          <h3 className="text-4xl text-black font-semibold">{title}</h3>
          <p>{para}</p>
          <Link
            to={`${props?.car ? "/rent-car" : "/rent-bike"}`}
            className="btn btn-sm bg-black text-white capitalize">
            {props?.car ? "Rent Car" : "Rent Bike"} <FiArrowUpRight />
          </Link>
        </div>
        <figure className="flex-1">
          <img src={img} alt={title} className="w-full"/>
        </figure>
      </div>
    </MaxWidthSection>
  );
};

Rent.propTypes = {
  props: PropTypes.object,
};

export default Rent;
