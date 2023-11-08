import { Helmet } from "react-helmet-async";
import Heading3 from "../Shared/Heading3/Heading3";
import MaxWidthSection from "../Shared/MaxWidthSection/MaxWidthSection";
import ContextProvider from "../../Hooks/ContextProvider";
import DashboardBanner from "../Shared/DashboardBanner/DashboardBanner";

const Schedules = () => {
  const { loading, bookings, handleRemoveFromBookings, error } =
    ContextProvider();

  const total = bookings?.map((service) => service?.totalCost);

  console.log(error);
  return (
    <>
      <DashboardBanner />
      <MaxWidthSection>
        <Heading3>My Bookings</Heading3>
        {loading ? (
          "Loading..."
        ) : (
          <section className="grid xl:grid-cols-3 gap-5 p-5 md:p-20">
            <table className="w-full xl:col-span-2">
              <thead className="bg-primary-light h-14 text-black">
                <tr>
                  <th>id</th>
                  <th>Service</th>
                  <th>Destination</th>
                  <th>Pick Up</th>
                  <th>Drop Off</th>
                  <th>Cost</th>
                  <th>
                    {/* <RiDeleteBin5Line className="text-red-600 mx-auto" /> */}
                  </th>
                </tr>
              </thead>
              <tbody className="max-xl:flex-col min-h-[calc(100vh/3)]">
                {bookings?.length ? (
                  bookings?.map((service, idx) => (
                    <tr key={service._id}>
                      <td className="text-center">{service._id}</td>
                      <td className="py-5">
                        <img
                          className="w-20"
                          src={service?.serviceInfo?.img}
                          alt={service?.serviceInfo?.name}
                        />
                      </td>
                      <td className="text-center">{service?.destination}</td>
                      <td className="text-center">
                        {service?.pickUp} {service?.pickUpTime}
                      </td>
                      <td className="text-center">
                        {service?.dropOff} {service?.dropOffTime}
                      </td>
                      <td className="text-center">TK. {total[idx]}</td>
                      <td className="text-center">
                        <button
                          onClick={() => handleRemoveFromBookings(service._id)}
                          className="text-red-600">
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
                        <Heading3>Your Cart Is Empty.</Heading3>
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="bg-primary-light px-5 text-center py-20">
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
        )}

        {/* <PendingSchedules></PendingSchedules> */}
      </MaxWidthSection>

      <Helmet>
        <title>{"SwiftWheels | My Schedules"}</title>
      </Helmet>
    </>
  );
};

export default Schedules;
