import axios from "axios";
import Heading3 from "../Shared/Heading3/Heading3";
import ContextProvider from "../../Auth/ContextProvider";

const AddService = () => {
  const { user } = ContextProvider();

  const handleAddProduct = (e) => {
    e.preventDefault();

    const form = e.target;

    const type = form.type.value;
    const title = form.title.value;
    const status = form.status.value;
    const price = form.price.value;
    const img = form.img.value;
    const area = form.area.value;
    const specifications = form.specifications.value;
    const description = form.description.value;

    console.log(title, price, description);
    if (typeof specifications !== "object") return;

    if (!user?.displayName) alert("Enter Your Name");
    if (!user?.displayName) alert("Enter Your Name");

    const car = {
      title,
      price,
      status,
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

    axios
      .post("http://localhost:5000/services", car)
      .then((res) => console.log(res.data));

    // fetch("http://localhost:5000/services", {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify(car),
    // })
    //   .then((res) => res.json())
    //   .then(console.log);
  };

  return (
    <div>
      {/* <Banner
        bannerInfo={{ heading: "Add Product", breadcrumb: "Add product" }}
      /> */}

      <section>
        <div className="card w-full border mb-24">
          <form
            onSubmit={handleAddProduct}
            className="card-body flex-col gap-6 bg-form-bg p-24">
            <Heading3>Add A Service</Heading3>
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
                <input
                  type="text"
                  placeholder="Service Type"
                  name="type"
                  defaultValue="Bike"
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
              <button className="btn btn-lg leading-8 btn-block text-white font-semibold text-[30px] bg-red-600 border-red-600">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddService;
