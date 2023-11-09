import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ContextProvider from "../../../Hooks/ContextProvider";
import Heading3 from "../Heading3/Heading3";
// import useAxios from "../../../Hooks/useAxios";
// import Swal from "sweetalert2";

const Service = (props) => {
  // const axios = useAxios();
  const { user, loading, error } = ContextProvider();

  const { handleServiceStatus } = props;

  const { _id, img, title, area, description, price, statusInfo, provider } =
    props?.bike || props?.car || {};

  console.log(props?.bike || props?.car);

  return (
    <div className="card card-compact card-bordered bg-base-100">
      {loading ? (
        <span className="loading loading-infinity w-40 text-primary"></span>
      ) : typeof provider === "undefined" ? (
        <Heading3>Newark Error or the service is removed</Heading3>
      ) : (
        <>
          <figure>
            <img className="mt-5 rounded-lg" src={img} alt={title} />
          </figure>
          <div className="card-body space-y-5 text-gray-500">
            <h2 className="card-title text-black">{title}</h2>
            <div>
              <p>Service Area: {area}</p>
              <p>Service Description: {description}</p>
              {user?.email === provider?.email ? (
                <select
                  name="status"
                  defaultValue={statusInfo?.status}
                  onChange={() => {
                    handleServiceStatus(
                      props?.bike ? props.bike : props.car,
                      _id
                    );
                  }}>
                  <option value="pending" className="text-warning">
                    Pending
                  </option>
                  <option value="progress" className="text-info">
                    In Progress
                  </option>
                  <option value="completed" className="text-success">
                    Completed
                  </option>
                </select>
              ) : (
                <p>
                  Service Status:{" "}
                  <span
                    className={
                      ("capitalize ",
                      statusInfo?.status === "pending"
                        ? "text-warning"
                        : statusInfo?.status === "progress"
                        ? "text-info"
                        : "text-success")
                    }>
                    {statusInfo?.status}
                  </span>
                </p>
              )}
            </div>

            {/* Provider Info */}
            <div className="flex justify-start items-center gap-5 border rounded p-1">
              <img
                className="w-16"
                src={provider?.image}
                alt={provider?.name}
              />
              <div>
                <h5 className="text-sm text-black font-semibold">
                  Name: {provider.name}
                </h5>
                <p>Email: {provider?.email}</p>
              </div>
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
        </>
      )}
    </div>
  );
};

Service.propTypes = {
  props: PropTypes.node,
};

export default Service;
