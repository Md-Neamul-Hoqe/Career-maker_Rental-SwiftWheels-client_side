import Heading3 from "../Shared/Heading3/Heading3";
import ContextProvider from "../../Hooks/ContextProvider";
import useAxios from "../../Hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AddService = () => {
  const axios = useAxios();
  const { user } = ContextProvider();

  const handleAddProduct = (e) => {
    e.preventDefault();

    let allFieldsFilled = true;

    const form = new FormData(e.target);

    // console.log(form);

    // console.log(allFieldsFilled);
    // Loop through the FormData entries
    form.forEach((value) => {
      if (value.trim() === "") {
        allFieldsFilled = false;
        // setAllFieldsFilled(false);
      }
    });

    if (!allFieldsFilled) {
      return new Swal({
        icon: "warning",
        text: "Please fill all the fields",
        title: "warning",
      });
    }

    // console.log(allFieldsFilled);
    // return;

    const type = form.get("type");
    const title = form.get("title");
    const status = form.get("status");
    const price = form.get("price");
    const img = form.get("img");
    const area = form.get("area");
    const specifications = form.get("specifications");
    const description = form.get("description");

    // console.log(typeof specifications);
    if (typeof specifications !== "string") {
      return Swal({
        icon: "warning",
        text: "Please fill the specification field with proper information",
        title: "warning",
      });
    }

    // if (!user?.displayName) alert("Enter Your Name");

    const car = {
      title,
      price,
      statusInfo: { status, income: null, schedule: null },
      img,
      type,
      area,
      description,
      specifications: JSON.parse(specifications),
      provider: {
        name: user?.displayName ? user.displayName : user?.email?.split("@")[0],
        email: user?.email,
        image: user?.photoURL
          ? user.photoURL
          : "https://i.ibb.co/7vx2MGG/user-1.png",
      },
    };

    allFieldsFilled && mutation.mutate(car);
    // setCar(car);
  };

  const mutation = useMutation({
    mutationFn: (car) => {
      return axios.post("/create-service", car);
    },
  });

  // https://i.ibb.co/ggs11Mp/service-bike.png
  mutation.isSuccess &&
    new Swal({
      icon: "success",
      text: "Service Added successfully",
      title: "success",
    });

  mutation.isError && new Swal({ title: mutation.error.message });
  return (
    <div>
      <section>
        <div className="card w-full border mb-24">
          <form
            onSubmit={handleAddProduct}
            className="card-body flex-col gap-6 bg-form-bg md:p-24">
            <Heading3>Add A Service</Heading3>
            <div className="max-md:flex-col flex justify-between gap-6">
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
                  defaultValue="Urban Explorer"
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
                  defaultValue="200"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="max-md:flex-col flex justify-between gap-6">
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
                  defaultValue="Available"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control flex-1">
                <label className="label">
                  <span className="label-text font-semibold text-xl text-black">
                    Service Type
                  </span>
                </label>
                <select
                  name="type"
                  defaultValue={"bikes"}
                  className="select select-bordered">
                  <option value="bikes">Bike</option>
                  <option value="cars">Car</option>
                </select>
              </div>
            </div>
            <div className="max-md:flex-col flex justify-between gap-6">
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
                  defaultValue={`{"seats": 2,"fuel": "Petrol","frontBrake": "Disc","gearBox": "6-Speed","horsepower": "29 HP","engine": "4-Stroke, Twin-Cylinder","stroke": "4.6 inches","overallMileage": "48 mpg"}`}
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
                  defaultValue="Dhaka city"
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="max-md:flex-col flex justify-between gap-6">
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
                  defaultValue={"https://i.ibb.co/ggs11Mp/service-bike.png"}
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
                  defaultValue="Unique service. The description of this service here."
                  placeholder="Your Message"></textarea>
              </div>
            </div>
            <div className="form-control mt-6">
              {mutation.isPending ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <>
                  <button
                    className={`btn btn-lg leading-8 btn-block text-white font-semibold text-[30px] bg-black`}>
                    Add Product
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddService;
