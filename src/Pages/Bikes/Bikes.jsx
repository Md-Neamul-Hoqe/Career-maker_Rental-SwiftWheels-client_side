import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Service from "../Shared/Service/Service";
import useAxios from "../../Hooks/useAxios";
import ContextProvider from "../../Hooks/ContextProvider";
import Heading3 from "../Shared/Heading3/Heading3";

const Bikes = () => {
  const axios = useAxios();
  const { error, loading } = ContextProvider();
  const [bikes, setBikes] = useState([]);

  const [length, setLength] = useState(6);

  useEffect(() => {
    axios
      .get("/bikes")
      .then((res) => setBikes(res.data))
      .catch((error) => console.error(error));
  }, [axios]);

  return (
    <>
      <Banner />

      <div className="my-20">
        {!bikes?.length || typeof bikes === "string" ? (
          <div className="min-h-screen flex justify-center items-center w-full">
            {error ? (
              <Heading3>{error}</Heading3>
            ) : loading ? (
              <span className="loading loading-infinity w-40 text-primary"></span>
            ) : (
              <Heading3>No Data Found</Heading3>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 max-w-6xl mx-auto">
              {bikes.slice(0, length).map((bike, idx) => (
                <Service
                  key={idx}
                  bike={typeof bike === "object" ? bike : {}}
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
    </>
  );
};

export default Bikes;
