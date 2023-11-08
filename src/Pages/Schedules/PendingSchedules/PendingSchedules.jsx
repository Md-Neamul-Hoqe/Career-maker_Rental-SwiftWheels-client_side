import { useEffect, useState } from "react";
import ContextProvider from "../../Hooks/ContextProvider";
import Heading3 from "../Shared/Heading3/Heading3";
import useAxios from "../../Hooks/useAxios";

const PendingSchedules = () => {
  const axios = useAxios();
  const { user } = ContextProvider();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`/user/services/${user?.email}`)
      .then((res) => {
        setServices(
          res?.data?.filter(
            (service) => service?.statusInfo?.status !== "Available"
          )
        );
      })
      .catch((error) => console.error(error?.message));
  }, [axios, user?.email]);

  //   useEffect(() => {

  //     );
  //   }, [services]);
  //   const total = bookings?.map((service) => service?.totalCost);
  //   console.log(total);
  return (
    <>
      <Heading3>My Service Status</Heading3>
      <section className="my-10">
        <table className="w-full">
          <thead className="bg-primary-light h-14 text-black">
            <tr>
              <th>id</th>
              <th>Pick Up</th>
              <th>Income</th>
              <th>Status</th>
              <th>
                {/* <RiDeleteBin5Line className="text-red-600 mx-auto" /> */}
              </th>
            </tr>
          </thead>
          <tbody className="max-xl:flex-col min-h-[calc(100vh/3)]">
            {services?.length ? (
              services.map((service) =>
                service?.statusInfo?.income ? (
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
                      <button
                        onClick={() => {
                          axios.delete(
                            `/user/delete-service/${service._id}?type=${service.type}&email=${user.email}`
                          );
                        }}
                        className="text-red-600">
                        delete
                      </button>
                    </td>
                  </tr>
                ) : null
              )
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border min-h-[calc(100vh/3)] text-center">
                  <Heading3>Your Service Is Empty.</Heading3>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default PendingSchedules;
