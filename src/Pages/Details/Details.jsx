import { Link, useLocation, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";
import MaxWidthSection from "../Shared/MaxWidthSection/MaxWidthSection";
import Heading3 from "../Shared/Heading3/Heading3";
import { Helmet } from "react-helmet-async";
import ContextProvider from "../../Hooks/ContextProvider";
import Swal from "sweetalert2";

const Details = () => {
  const axios = useAxios();
  const [service, setService] = useState({});
  const [services, setServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  // const [countTheBooking, setCountTheBooking] = useState(0);

  const { user, handleAddToBookings, setError, error, loading } =
    ContextProvider();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { id } = useParams();
  const type = queryParams.get("type");

  // console.log(queryParams, type);

  /* the service */
  useEffect(() => {
    axios
      .get(`/services/${id}?type=${type}`)
      .then((res) => setService(...res.data))
      .catch((error) => setError(error.message));
  }, [axios, id, type, setError]);

  /* other services of this provider */
  useEffect(() => {
    axios
      .get(`/same-provider-services/${service?.provider?.email}?id=${id}`)
      .then((res) => setServices(res.data))
      .catch((error) => setError(error.message));
  }, [axios, id, service?.provider?.email, setError]);

  // if (JSON.stringify(service) === "{}") return "Loading...";

  const handleCost = (e) => {
    const duration = parseFloat(e.target.value);

    if (!isNaN(duration) && duration > 0)
      setTotalCost(duration * service.price);
  };

  const handleBookings = (e) => {
    e.preventDefault();

    console.log(service.provider?.email, user?.email);

    if (service.provider?.email === user?.email)
      return Swal.fire({
        title: "What's",
        text: "This is your own service.",
        icon: "error",
      });

    const form = new FormData(e.target);

    const destination = form.get("destination");
    const pickUp = form.get("pick-up-date");
    const pickUpTime = form.get("pick-up-time");
    const dropOff = form.get("drop-off-date");
    const dropOffTime = form.get("drop-off-time");
    const duration = form.get("duration");
    const bookOn = new Date();

    const booking = {
      destination,
      pickUp,
      pickUpTime,
      dropOff,
      dropOffTime,
      duration,
      bookOn,
      count: 1,
      totalCost,
      type: service?.type,
      serviceInfo: {
        name: service?.title,
        img: service?.img,
      },
      Owner: {
        email: user?.email,
        name: user?.displayName || user?.email.split("@")[0],
      },
    };

    handleAddToBookings(booking, id);

    console.log(booking);
  };
  // console.log(service?.specifications);

  return (
    <MaxWidthSection>
      <div className="flex max-md:flex-col max-md:gap-10 items-start">
        <img className="w-full md:flex-1" src={service?.img} alt={service?.title} />
        <div className="card flex-1 mb-10">
          {/* Service Specifications */}
          <Heading3>{service?.title}</Heading3>
          <p className="my-2 text-xl">{service?.description}</p>
          <table className="table min-w-min max-w-full text-xl">
            <thead>
              <tr>
                <th className="text-xl text-black" colSpan={2}>
                  Specifications
                </th>
              </tr>
            </thead>
            <tbody>
              {service?.specifications ? (
                Object.keys(service?.specifications).map((prop, idx) => (
                  <tr key={idx} className="py-2">
                    <td className="min-w-[20px]">{prop}</td>
                    <td className="min-w-[20px] text-end">
                      {service?.specifications[prop]}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  {error ? (
                    <td>{error}</td>
                  ) : (
                    <td>
                      <span className="loading loading-infinity w-40 text-primary"></span>
                    </td>
                  )}
                </tr>
              )}
            </tbody>
          </table>
          <label htmlFor="my_modal_6" className="btn bg-black text-white mt-5">
            Book Now
          </label>
        </div>
      </div>

      <div>
        <Heading3>Service Provider Information</Heading3>
        <div className="my-5 flex items-center gap-10">
          <img
            src={service?.provider?.image}
            alt={service?.provider?.name}
            className="w-20"
          />
          <div className="text-xl">
            <p>
              <span className="font-bold">Name: </span>
              {service?.provider?.name}
            </p>
            <p>
              <span className="font-bold">Location: </span>
              {service?.area}
            </p>
          </div>
        </div>
      </div>
      <hr />
      {/* Provider More Services */}
      <section>
        <div className="my-10">
          {loading ? (
            "Loading.."
          ) : error ? (
            <Heading3>{error}</Heading3>
          ) : services?.length ? (
            <>
              <Heading3>You may also like</Heading3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10 max-w-6xl mx-auto">
                {services.map((service, idx) => {
                  const {
                    _id,
                    img,
                    type,
                    name,
                    area,
                    description,
                    price,
                    statusInfo,
                  } = service;

                  console.log(service);
                  return (
                    <div
                      key={idx}
                      className="card card-compact card-bordered bg-base-100">
                      <figure>
                        <img className="mt-5 rounded-lg" src={img} alt={name} />
                      </figure>
                      <div className="card-body space-y-5 text-gray-500">
                        <h2 className="card-title text-black">{name}</h2>
                        <div>
                          <p>Service Area: {area}</p>
                          <p>Service Description: {description}</p>
                          <p>
                            {" "}
                            {`${
                              statusInfo?.status
                                ? "Service Status:" + statusInfo?.status
                                : ""
                            }`}
                          </p>
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
                            to={`/services/${_id}?type=${
                              type === "bikes" ? "bikes" : "cars"
                            }`}
                            className="btn btn-sm rounded bg-black text-white capitalize">
                            {type === "bikes" ? "Rent Bike" : "Rent Car"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <Heading3>No more services available</Heading3>
          )}
        </div>
      </section>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between items-end">
            <h3 className="font-bold text-lg">{service?.title}</h3>
            <div className="modal-action">
              <label htmlFor="my_modal_6" className="btn">
                X
              </label>
            </div>
          </div>
          <div>
            <img src={service?.img} alt={service.name} className="w-full" />
            <p>Provider: {service?.provider?.email}</p>
            <p>Your: {user?.email}</p>
          </div>
          <form onSubmit={handleBookings} method="dialog" className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Destination</span>
              </label>
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                defaultValue={service?.area}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pick Up</span>
              </label>
              <div>
                <input
                  type="date"
                  name="pick-up-date"
                  placeholder="MM/DD/YYYY"
                  className="input input-bordered"
                  required
                />
                <input
                  type="time"
                  name="pick-up-time"
                  placeholder="12:30 PM"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Drop Off</span>
              </label>
              <div>
                <input
                  type="date"
                  name="drop-off-date"
                  placeholder="MM/DD/YYYY"
                  className="input input-bordered"
                  required
                />
                <input
                  type="time"
                  name="drop-off-time"
                  placeholder="12:30 PM"
                  className="input input-bordered"
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Duration</span>
              </label>

              <div className="flex justify-between">
                <input
                  type="number"
                  name="duration"
                  placeholder="times in Hours"
                  onChange={handleCost}
                  className="input input-bordered"
                  required
                />
                <button className="btn shadow-sm bg-white text-black">
                  ${totalCost}
                </button>
              </div>
            </div>
            <div className="form-control mt-6 modal-action">
              <button className="btn btn-primary">Confirm</button>
            </div>
          </form>
        </div>
      </div>
      <Helmet>
        <title>{`SwiftWheels | ${service?.title}`}</title>
      </Helmet>
    </MaxWidthSection>
  );
};

export default Details;
