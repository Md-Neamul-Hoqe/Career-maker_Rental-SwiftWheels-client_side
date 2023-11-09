import { useEffect, useState } from "react";
import ContextProvider from "../../Hooks/ContextProvider";
import useAxios from "../../Hooks/useAxios";
import Heading3 from "../Shared/Heading3/Heading3";
// import MaxWidthSection from "../Shared/MaxWidthSection";
import { Link } from "react-router-dom";
import MaxWidthSection from "../Shared/MaxWidthSection/MaxWidthSection";
import DashboardBanner from "../Shared/DashboardBanner/DashboardBanner";
import Swal from "sweetalert2";

const MyServices = () => {
  const axios = useAxios();
  const { user, setError, error, loading } = ContextProvider();
  const [services, setServices] = useState([]);

  console.log(`/user/services/${user?.email}`);

  useEffect(() => {
    axios
      .get(`/user/services/${user?.email}`)
      .then((res) => {
        setError("");
        setServices(res?.data);
      })
      .catch((error) => setError(error.message));
  }, [axios, user?.email, setError]);

  const handleDeleteService = (id) => {
    {
      Swal.fire({
        title: "Are you want to replace previous booking?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(`/user/delete-service/${id}?email=${user?.email}`);
          axios
            .delete(`/user/delete-service/${id}?email=${user?.email}`)
            .then((res) => {
              console.log("Delete operation result: ", res.data);

              if (res.data?.deletedCount) {
                /* remove from state */
                const theServices = services.filter(
                  (service) => service._id !== id
                );
                setServices(theServices);

                Swal.fire({
                  title: "Deleted!",
                  text: "Your service is deleted.",
                  icon: "success",
                });
              }
            })
            .catch((error) => setError(error?.message));
        }
      });
    }
  };

  return (
    <>
      <DashboardBanner />
      <MaxWidthSection>
        <Heading3>My Services</Heading3>
        <section className="my-10">
          <table className="w-full">
            <thead className="bg-primary-light h-14 text-black">
              <tr>
                <th>id</th>
                <th>Service</th>
                <th>Area</th>
                <th>Price</th>
                <th>Status</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className="max-xl:flex-col min-h-[calc(100vh/3)]">
              {loading ? (
                <span className="loading loading-infinity w-40 text-primary"></span>
              ) : services?.length ? (
                services.map((service) => (
                  <tr key={service._id}>
                    <td className="text-center">{service._id}</td>
                    {/* <td className="py-5">
                    <img
                      className="w-20"
                      src={service?.img}
                      alt={service?.title}
                    />
                  </td> */}
                    <td className="text-center">
                      <img src={service?.img} alt="service image" />
                    </td>
                    <td className="text-center">{service?.area}</td>
                    <td className="text-center">TK. {service?.price || 0}</td>
                    <td className="text-center">
                      {service?.statusInfo?.status || "Available"}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/update-service/${service._id}`}
                        className="btn bg-black text-white">
                        Edit
                      </Link>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleDeleteService(service?._id)}
                        className=" btn bg-red-50 text-red-600">
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">
                    <div className="border min-h-[calc(100vh/3)] flex items-center justify-center w-full">
                      {error ? (
                        <Heading3>{error}</Heading3>
                      ) : (
                        <Heading3>Share your vehicles to earn money </Heading3>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </MaxWidthSection>
    </>
  );
};

export default MyServices;
