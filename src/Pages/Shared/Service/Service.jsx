import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Service = (props) => {
  console.log(props);

  const {
    _id,
    img,
    name,
    area,
    description,
    provider,
    price,
    status,
    specifications,
  } = props?.bike || props?.car;

  // console.log(
  //   img,
  //   name,
  //   area,
  //   description,
  //   provider,
  //   price,
  //   status,
  //   specifications
  // );

  return (
    <div className="card card-compact card-bordered bg-base-100">
      <figure>
        <img className="mt-5 rounded-lg" src={img} alt={name} />
      </figure>
      <div className="card-body space-y-5 text-gray-500">
        <h2 className="card-title text-black">{name}</h2>
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
            to={`/services/:${_id}`}
            className="btn btn-sm rounded bg-black text-white capitalize">
            {props?.bike ? "Rent Bike" : "Rent Car"}
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
