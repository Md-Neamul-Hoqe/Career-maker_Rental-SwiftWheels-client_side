import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Service from "../Shared/Service/Service";
import useAxios from "../../Hooks/useAxios";
import useContextProvider from "../../Hooks/useContextProvider";
import Heading3 from "../Shared/Heading3/Heading3";
import Search from "../Shared/Search/Search";
import { Helmet } from "react-helmet-async";

const Cars = () => {
  const axios = useAxios();
  const { loading } = useContextProvider();
  const [dataLoadingError, setDataLoadingError] = useState(null);
  const [cars, setCars] = useState([]);
  const [length, setLength] = useState(6);

  useEffect(() => {
    setDataLoadingError("");
    axios
      .get("/cars")
      .then((res) => {
        setCars(res?.data);
      })
      .catch((error) => setDataLoadingError(error?.message));
  }, [axios, setDataLoadingError]);

  return (
    <>
      <Banner />

      <div className="w-full">
        <Search type="cars" />
      </div>
      <div className="w-full text-center my-5">
        <Heading3> All Cars </Heading3>
      </div>
      <div className="mb-20">
        {!cars?.length || typeof cars === "string" ? (
          <div className="min-h-screen flex justify-center items-center w-full">
            {dataLoadingError ? (
              <Heading3>{dataLoadingError}</Heading3>
            ) : !loading ? (
              <Heading3>No Bike Found</Heading3>
            ) : (
              <span className="loading loading-infinity w-40 text-primary"></span>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 max-w-6xl mx-auto">
              {cars.slice(0, length).map((car) => (
                <Service
                  key={car._id}
                  service={typeof car === "object" ? car : {}}
                />
              ))}
            </div>
            {cars?.length !== length ? (
              <div className="w-full text-center">
                <button
                  onClick={() => setLength(cars?.length)}
                  className={`btn bg-black text-white ${
                    length === cars?.length ? "hidden" : ""
                  }`}>
                  Show All
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
      <Helmet>
        <title>{`SwiftWheels | Services - Cars`}</title>
      </Helmet>
    </>
  );
};

export default Cars;
