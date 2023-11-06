import { useLoaderData } from "react-router-dom";
import bike from "../../images/bg/bike-specification.png";
import car from "../../images/bg/car-specification.png";

const Details = () => {
  const service = useLoaderData();

  return (
    <div>
      <div className="flex">
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
                  placeholder="DD/MM/YYYY"
                  className="input input-bordered"
                  required
                />
                <input
                  type="datetime-local"
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
                  placeholder="DD/MM/YYYY"
                  className="input input-bordered"
                  required
                />
                <input
                  type="datetime-local"
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
              <div>
                <input
                  type="button"
                  name="duration"
                  placeholder="7.75 Hours"
                  className="input input-bordered"
                  required
                />
                <button>{service.price}</button>
              </div>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Book Now</button>
            </div>
          </form>
        </div>
      </div>

      <div className={`bg-[url(${service?.type ? bike : car})]`}>
        <table className="table table-fixed">
          <thead>
            <tr>
              <th colSpan={2}>Specifications</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(service?.specifications).map((prop) => (
              <tr key={service._id} className="py-2">
                <td className="min-w-[20px]">{prop}</td>{" "}
                <td className="min-w-[20px] text-end">
                  {service?.specifications[prop]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Details;
