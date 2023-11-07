import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Service from "../Shared/Service/Service";
import { useRouteError } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";

const Bikes = () => {
  const axios = useAxios();
  const error = useRouteError();

  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    axios
      .get("/bikes")
      .then((res) => setBikes(res.data))
      .catch((error) => console.log(error));
  }, [axios]);

  return (
    <>
      <Banner />

      <div className="my-20">
        {!bikes?.length || typeof bikes === "string" ? (
          <div className="min-h-screen flex justify-center items-center w-full">
            <span className="loading loading-infinity w-40 text-primary"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10 max-w-6xl mx-auto">
            {bikes.slice(0, 8).map((bike, idx) => (
              <Service key={idx} bike={typeof bike === "object" ? bike : {}} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Bikes;
