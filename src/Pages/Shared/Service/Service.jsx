import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Service = (props) => {
  const { _id, img, title, area, description, price, status } =
    props?.bike || props?.car;

  console.log(_id, img, title, area, description, price, status);

  return (
    <div className="card card-compact card-bordered bg-base-100">
      <figure>
        <img className="mt-5 rounded-lg" src={img} alt={title} />
      </figure>
      <div className="card-body space-y-5 text-gray-500">
        <h2 className="card-title text-black">{title}</h2>
        <div>
          <p>Service Area: {area}</p>
          <p>Service Description: {description}</p>
          <p>Service Status: {status}</p>
        </div>

        <div className="card-actions justify-between items-end grow">
          <div className="flex flex-col">
            <label htmlFor="price">Per Hours</label>
            <input
              className="text-xl text-black font-bold"
              type="button"
              value={"$" + price}
            />
          </div>
          <Link
            // eslint-disable-next-line react/prop-types
            to={`/services/${_id}?type=${props?.bike ? "bikes" : "cars"}`}
            className="btn btn-sm rounded bg-black text-white capitalize">
            details
          </Link>
        </div>
      </div>
    </div>
  );
};

Service.propTypes = {
  props: PropTypes.node,
};

export default Service;
