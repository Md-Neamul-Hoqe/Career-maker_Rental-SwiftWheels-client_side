import { Link, useLocation, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import bike from "../../images/bg/bike-specification.png";
import car from "../../images/bg/car-specification.png";
import { useEffect, useState } from "react";
import MaxWidthSection from "../Shared/MaxWidthSection/MaxWidthSection";
import Heading3 from "../Shared/Heading3/Heading3";
import Service from "../Shared/Service/Service";

const Details = () => {
  const axios = useAxios();
  const [service, setService] = useState({});
  const [services, setServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

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
      .catch((error) => console.log(error));
  }, [axios, id, type]);

  /* other services of this provider */
  useEffect(() => {
    axios
      .get(`/same-provider-services/${service?.provider?.email}?id=${id}`)
      .then((res) => setServices(res.data))
      .catch((error) => console.error(error));
  }, [axios, id, service?.provider?.email]);

  const handleCost = (e) => {
    const duration = parseFloat(e.target.value);

    if (!isNaN(duration) && duration > 0)
      setTotalCost(duration * service.price);
  };

  // console.log(service?.specifications);

  return (
    <MaxWidthSection>
      <div className="flex max-lg:flex-col items-start">
        <img className="flex-1" src={service?.img} alt={service?.name} />
        <div className="card flex-1">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location"
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
            <div className="form-control mt-6">
              <button className="btn btn-primary">Book Now</button>
            </div>
          </form>
        </div>
      </div>

      {/* Service Specifications */}
      <div className={`bg-[url(${service?.type ? bike : car})]`}>
        <table className="table table-fixed max-w-sm">
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
                <td>Loading...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <hr />

      <section>
        <div className="my-10">
          {services?.length ? (
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
                    status,
                  } = service;

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
            ""
          )}
        </div>
      </section>
    </MaxWidthSection>
  );
};

export default Details;

// {services.map((service, idx) => {

//   service?.type === "bikes" ? (
//     <>
//       {console.log(service.type)}
//       <Service bike={service} key={idx}></Service>
//     </>
//   ) : (
//     <>
//       {console.log(service.type)}
//       <Service car={service} key={idx}></Service>
//     </>
//   );
// })}
