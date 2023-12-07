import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Service from "../Shared/Service/Service";
import useAxios from "../../Hooks/useAxios";
import useContextProvider from "../../Hooks/useContextProvider";
import Heading3 from "../Shared/Heading3/Heading3";
import Search from "../Shared/Search/Search";
import { Helmet } from "react-helmet-async";

const Bikes = () => {
  const axios = useAxios();
  const { loading } = useContextProvider();
  const [dataLoadingError, setDataLoadingError] = useState(null);
  const [bikes, setBikes] = useState([]);

  const [length, setLength] = useState(6);

  useEffect(() => {
    setDataLoadingError("");
    axios
      .get("/bikes")
      .then((res) => setBikes(res?.data))
      .catch((error) => setDataLoadingError(error));
  }, [axios, setDataLoadingError]);

  return (
    <>
      <Banner />

      <div className="w-full">
        <Search type="bikes" />
      </div>

      <div className="w-full text-center my-5">
        <Heading3> All Bikes </Heading3>
      </div>
      <div className="mb-20">
        {!bikes?.length || typeof bikes === "string" ? (
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
              {bikes.slice(0, length).map((bike) => (
                <Service
                  key={bike._id}
                  service={typeof bike === "object" ? bike : {}}
                />
              ))}
            </div>
            <div className="w-full text-center">
              <button
                onClick={() => setLength(bikes?.length)}
                className={`btn bg-black text-white ${
                  length === bikes?.length ? "hidden" : ""
                }`}>
                Show All
              </button>
            </div>
          </>
        )}
      </div>
      <Helmet>
        <title>{`SwiftWheels | Services - Bikes`}</title>
      </Helmet>
    </>
  );
};

export default Bikes;
