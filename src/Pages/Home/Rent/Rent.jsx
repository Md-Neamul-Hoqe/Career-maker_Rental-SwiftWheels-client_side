import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import MaxWidthSection from "../../../components/MaxWidthSection";
import Heading3 from "../../Shared/Heading3/Heading3";
import P from "../../Shared/P/P";

const Rent = ({ props }) => {
  const title = props?.car ? props.car.title : props.bike.title;
  const para = props?.car ? props.car.para : props.bike.para;
  const img = props.img;

  return (
    <MaxWidthSection>
      <div
        className={`${
          props?.car ? "" : "flex-row-reverse"
        } flex gap-5 py-10 min-h-[470px] items-center`}>
        <div className="space-y-5 flex-1">
          <Heading3>{title}</Heading3>

          <div className="flex gap-4">
            <span className="text-gray-400 text-sm bg-gray-100 border px-3 py-1 rounded-sm uppercase">
              luxury
            </span>
            <span className="text-gray-400 text-sm bg-gray-100 border px-3 py-1 rounded-sm uppercase">
              comfort
            </span>
            <span className="text-gray-400 text-sm bg-gray-100 border px-3 py-1 rounded-sm uppercase">
              prestige
            </span>
          </div>

          <P>{para}</P>

          <Link
            to={`${props?.car ? "/rent-car" : "/rent-bike"}`}
            className="btn btn-sm bg-black text-white capitalize">
            {props?.car ? "Rent Car" : "Rent Bike"} <FiArrowUpRight />
          </Link>
        </div>

        <figure className="flex-1">
          <img src={img} alt={title} className="w-full" />
        </figure>
      </div>
    </MaxWidthSection>
  );
};

Rent.propTypes = {
  props: PropTypes.object,
};

export default Rent;
