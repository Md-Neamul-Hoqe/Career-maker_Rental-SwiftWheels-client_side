import { Helmet } from "react-helmet-async";
import Heading3 from "../Shared/Heading3/Heading3";
import MaxWidthSection from "../Shared/MaxWidthSection/MaxWidthSection";
import ContextProvider from "../../Hooks/ContextProvider";
import DashboardBanner from "../Shared/DashboardBanner/DashboardBanner";
import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";
import Service from "../Shared/Service/Service";
import Swal from "sweetalert2";

const Schedules = () => {
  const { user, loading, bookings, handleRemoveFromBookings, error } =
    ContextProvider();

  const total = bookings?.map((booking) => booking?.totalCost);

  // console.log(error);

  const axios = useAxios();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(`/user/services/${user?.email}`)
      .then((res) => {
        setServices(
          res?.data?.filter((service) => service?.statusInfo?.income !== null)
        );
      })
      .catch((error) => console.error(error?.message));
  }, [axios, user?.email]);

  const handleServiceStatus = (service, id) => {
    const selected = document.getElementsByName("status")[0];

    // console.log(service);

    // console.log(service?.statusInfo, selected.value);

    // if (res?.data?.modifiedCount || res?.data?.insertedId) {
    const statusInfo = {
      status: selected.value,
      income: service?.statusInfo?.income,
      schedule: service?.statusInfo?.pickUp,
    };

    axios
      .patch(`/update-service/${id}?type=${service?.type}`, { statusInfo })
      .then((res) => {
        // console.log(res.data);
        if (res.data?.modifiedCount) {
          services.map((service) => {
            if (service._id === id)
              return (service.statusInfo.status = selected.value);
          });

          Swal.fire({
            title: "Updated!",
            text: "Your service status is updated.",
            icon: "success",
          });
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <DashboardBanner />
      <MaxWidthSection>
        <Heading3>My Bookings</Heading3>

        <section className="grid xl:grid-cols-3 gap-5 py-5 md:py-20 overflow-x-auto">
          <table className="w-full xl:col-span-2 table table-xl border">
            <thead className="bg-primary-light h-14 text-black">
              <tr>
                <th>id</th>
                <th>Service</th>
                <th>Destination</th>
                <th>Pick Up</th>
                <th>Drop Off</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="min-h-[calc(100vh/3)]">
              {bookings?.length ? (
                bookings?.map((booking, idx) => (
                  <tr key={booking._id}>
                    <td className="text-center">{idx + 1}</td>
                    <td className="py-5">
                      <img
                        className="w-20"
                        src={booking?.serviceInfo?.img}
                        alt={booking?.serviceInfo?.name}
                      />
                    </td>
                    <td className="text-center">{booking?.destination}</td>
                    <td className="text-center">
                      {booking?.pickUp} {booking?.pickUpTime}
                    </td>
                    <td className="text-center">
                      {booking?.dropOff} {booking?.dropOffTime}
                    </td>
                    <td className="text-center">TK. {total[idx]}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleRemoveFromBookings(booking._id)}
                        className="btn bg-red-50 text-red-600">
                        delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="border min-h-[calc(100vh/3)] text-center">
                    {loading ? (
                      <span className="loading loading-infinity w-40 text-primary"></span>
                    ) : error ? (
                      <Heading3>{error}</Heading3>
                    ) : (
                      <Heading3>Your Cart Is Empty.</Heading3>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="bg-primary-light px-5 text-center py-20 border rounded-lg min-w-[350px] mx-auto">
            <h5 className="whitespace-nowrap">Cart Totals</h5>
            {/* <h5>
        Subtotal <span className="text-body">price</span>
      </h5> */}
            <h5 className="flex justify-between items-center lg:px-10 my-10">
              Total
              <span className="text-primary">
                TK. {total?.reduce((total, current) => total + current, 0)}
              </span>
            </h5>
            <button className="btn btn-outline text-black capitalize btn-lg xl:btn-wide">
              Check Out
            </button>
          </div>
        </section>

        <Heading3>My Service Status</Heading3>
        <section className="my-10">
          {!services?.length || typeof services === "string" ? (
            <div className="min-h-[calc(100vh/3)] flex justify-center items-center w-full">
              {error ? (
                <Heading3>{error}</Heading3>
              ) : loading ? (
                <span className="loading loading-infinity w-40 text-primary"></span>
              ) : (
                <Heading3>No Schedule Found</Heading3>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 max-w-6xl mx-auto">
                {services.slice(0, length).map((bike, idx) => (
                  <Service
                    key={idx}
                    bike={typeof bike === "object" ? bike : {}}
                    handleServiceStatus={handleServiceStatus}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </MaxWidthSection>

      <Helmet>
        <title>{"SwiftWheels | My Schedules"}</title>
      </Helmet>
    </>
  );
};

export default Schedules;
