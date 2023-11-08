import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Service from "../Shared/Service/Service";
import useAxios from "../../Hooks/useAxios";

const Cars = () => {
  const axios = useAxios();
  const [cars, setCars] = useState([]);
  const [length, setLength] = useState(6);

  useEffect(() => {
    axios
      .get("/cars")
      .then((res) => setCars(res.data))
      .catch((error) => console.error(error));
  }, [axios]);

  return (
    <>
      <Banner />

      <div className="my-20">
        {!cars?.length || typeof cars === "string" ? (
          <div className="min-h-screen flex justify-center items-center w-full">
            <span className="loading loading-infinity w-40 text-primary"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10 max-w-6xl mx-auto">
              {cars.slice(0, length).map((car, idx) => (
                <Service key={idx} car={typeof car === "object" ? car : {}} />
              ))}
            </div>
            <div className="w-full text-center">
              <button
                onClick={() => setLength(cars?.length)}
                className={`btn bg-black text-white ${
                  length === cars?.length ? "hidden" : ""
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

export default Cars;
