/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PopularService = (props) => {
  const {
    _id,
    img,
   title,
    description,
    provider,
    price,
  } = props?.bike ? props.bike : props.car;

  return (
    <div className="card card-compact card-bordered bg-base-100">
      <figure>
        <img className="mt-5 rounded-lg" src={img} alt={title} />
      </figure>

      <div className="card-body space-y-5 text-gray-500">
        {/* Service Info */}
        <div>
          <h2 className="card-title text-black">{title}</h2>
          <p>{description}</p>
        </div>

        {/* Provider Info */}
        <div className="flex justify-start items-center gap-5 border rounded p-1">
          <img className="w-16" src={provider?.image} alt={provider?.name} />
          <div>
            <h5 className="text-sm text-black font-semibold">
              Name: {provider.name}
            </h5>
            <p>Email: {provider?.email}</p>
          </div>
        </div>

        {/* Price & Action */}
        <div className="card-actions justify-between items-end">
          <div className="flex flex-col">
            <label htmlFor="price">Per Hours</label>
            <input
              className="text-xl text-black font-bold"
              type="button"
              value={"$" + price}
            />
          </div>
          <Link
            to={`/services/${_id}?type=${props?.bike ? "bikes" : "cars"}`}
            className="btn btn-sm rounded bg-black text-white capitalize">
            details
          </Link>
        </div>
      </div>
    </div>
  );
};

PopularService.propTypes = {
  props: PropTypes.node,
};

export default PopularService;
