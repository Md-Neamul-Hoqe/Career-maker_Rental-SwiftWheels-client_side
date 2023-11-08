import { useEffect, useState } from "react";
import ContextProvider from "../../Hooks/ContextProvider";
import useAxios from "../../Hooks/useAxios";
import Heading3 from "../Shared/Heading3/Heading3";
// import MaxWidthSection from "../Shared/MaxWidthSection";
import { Link } from "react-router-dom";
import MaxWidthSection from "../Shared/MaxWidthSection/MaxWidthSection";
import DashboardBanner from "../Shared/DashboardBanner/DashboardBanner";

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
        setServices(res.data);
      })
      .catch((error) => setError(error.message));
  }, [axios, user?.email, setError]);

  console.log(services);
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
                <th>Pick Up</th>
                <th>Income</th>
                <th>Status</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody className="max-xl:flex-col min-h-[calc(100vh/3)]">
              {loading ? (
                "Loading..."
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
                      {service?.statusInfo?.schedule || "Not Booked"}
                    </td>
                    <td className="text-center">
                      TK. {service?.statusInfo?.income || 0}
                    </td>
                    <td className="text-center">
                      {service?.statusInfo?.status || "Available"}
                    </td>
                    <td className="text-center">
                      <Link
                        to={`/update-service/${service._id}?type=${service?.type}`}
                        className="btn bg-black text-white">
                        Edit
                      </Link>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => {
                          axios.delete(
                            `/user/delete-service/${service._id}?type=${service.type}&email=${user.email}`
                          );
                        }}
                        className=" btn bg-red-50 text-red-600">
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="border min-h-[calc(100vh/3)] text-center">
                    {error ? (
                      <Heading3>{error}</Heading3>
                    ) : (
                      <Heading3>Your Service Is Empty.</Heading3>
                    )}
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
