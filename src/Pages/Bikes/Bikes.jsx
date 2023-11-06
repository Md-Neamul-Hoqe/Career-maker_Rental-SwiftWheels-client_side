import axios from "axios";
import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Service from "../Shared/Service/Service";
import { useRouteError } from "react-router-dom";

const Bikes = () => {
  const error = useRouteError();

  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    axios
      .get("/bikes.json")
      .then((res) => setBikes(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Banner />
      Bikes Showcase : {bikes.length}
      {!bikes?.length || typeof bikes === "string" ? (
        <div className="min-h-screen flex justify-center items-center w-full">
          <span className="loading loading-infinity w-40 text-primary"></span>
          {typeof bikes === "string" && (
            <>
              <br />
              <details className="text-white text-sm w-full">
                <summary>For Developers:</summary>
                <div>
                  <p>{error?.error?.message}</p>
                </div>
              </details>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10 max-w-6xl mx-auto">
          {bikes.slice(0, 8).map((bike, idx) => (
            <Service key={idx} bike={typeof bike === "object" ? bike : {}} />
          ))}
        </div>
      )}
    </>
  );
};

export default Bikes;
