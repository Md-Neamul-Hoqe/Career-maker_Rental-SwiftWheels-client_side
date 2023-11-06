import axios from "axios";
import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Service from "../Shared/Service/Service";

const Cars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("/cars.json")
      .then((res) => setCars(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <Banner />
      Cars Showcase : {cars.length}
      {!cars?.length || typeof cars === "string" ? (
        <div className="min-h-screen flex justify-center items-center w-full">
          <span className="loading loading-infinity w-40 text-primary"></span>
          {typeof cars === "string" && (
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
          {cars.slice(0, 8).map((car, idx) => (
            <Service key={idx} car={typeof car === "object" ? car : {}} />
          ))}
        </div>
      )}
    </>
  );
};

export default Cars;
