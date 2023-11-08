import Heading3 from "../Shared/Heading3/Heading3";
import ContextProvider from "../../Hooks/ContextProvider";
import useAxios from "../../Hooks/useAxios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UpdateService = () => {
  const [service, setService] = useState({});
  const { id } = useParams();
  const axios = useAxios();
  const { user, error, setError } = ContextProvider();

  useEffect(() => {
    axios
      .get(`/services/${id}`)
      .then((res) => setService(...res.data))
      .catch((error) => setError(error.message));
  }, [axios, id, setError]);

  const handleUpdateService = (e) => {
    e.preventDefault();

    const form = e.target;

    const type = form?.type?.value;
    const title = form?.title?.value;
    const statusInfo = form?.status?.value;
    const price = form?.price?.value;
    const img = form?.img?.value;
    const area = form?.area?.value;
    const specifications = form?.specifications?.value;
    const description = form?.description?.value;

    console.log(title, price, description);

    const car = {
      title,
      price,
      statusInfo,
      img,
      type,
      area,
      description,
      specifications: JSON.parse(specifications),
      provider: {
        name: user?.displayName ? user.displayName : user?.email.split("@")[0],
        email: user.email,
        image: user?.photoURL
          ? user.photoURL
          : "https://i.ibb.co/7vx2MGG/user-1.png",
      },
    };

    console.log(id, service?.type);

    axios
      .patch(`/update-service/${id}?type=${service?.type}`, car)
      .then(
        (res) => res.data.modifiedCount && Swal.fire("Updated successfully.")
      )
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  };

  return (
    <div>
      {/* <Banner
        bannerInfo={{ heading: "Add Product", breadcrumb: "Add product" }}
      /> */}

      <section>
        <div className="card w-full border mb-24">
          {error ? (
            <Heading3>{error}</Heading3>
          ) : (
            <form
              onSubmit={handleUpdateService}
              className="card-body flex-col gap-6 bg-form-bg p-24">
              <Heading3>Update: {service?.title}</Heading3>
              <div className="flex justify-between gap-6">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-semibold text-xl text-black">
                      Service Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Service Name"
                    name="title"
                    defaultValue={service?.title}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-semibold text-xl text-black">
                      Service Price
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="$200"
                    name="price"
                    defaultValue={service?.price}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-6">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-semibold text-xl text-black">
                      Status
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Service Status"
                    name="status"
                    defaultValue={
                      JSON.stringify(service?.statusInfo) || "Available"
                    }
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-semibold text-xl text-black">
                      Service Type
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Service Type"
                    name="type"
                    defaultValue={service?.type}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-6">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-semibold text-xl text-black">
                      Specifications
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="specifications"
                    name="specifications"
                    defaultValue={JSON.stringify(service?.specifications)}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-semibold text-xl text-black">
                      Service Area
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Service Area"
                    name="area"
                    defaultValue={service?.area}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              <div className="flex justify-between gap-6">
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-semibold text-xl text-black">
                      Service Photo
                    </span>
                  </label>
                  <input
                    type="url"
                    placeholder="Service Photo URL"
                    name="img"
                    defaultValue={service?.img}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control flex-1">
                  <label className="label">
                    <span className="label-text font-semibold text-xl text-black">
                      Service Description
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered"
                    name="description"
                    defaultValue={service?.description}
                    placeholder="Your Message"></textarea>
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-lg leading-8 btn-block text-white font-semibold text-[30px] bg-red-600 border-red-600">
                  Update Service
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default UpdateService;
