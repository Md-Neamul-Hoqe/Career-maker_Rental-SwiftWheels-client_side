import { useEffect, useState } from "react";
import { Link, useRouteError } from "react-router-dom";
import Heading3 from "../../Shared/Heading3/Heading3";
import MaxWidthSection from "../../Shared/MaxWidthSection/MaxWidthSection";
import PopularService from "./PopularService";
import useAxios from "../../../Hooks/useAxios";

const Popular = () => {
  const axios = useAxios();
  const error = useRouteError();

  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    axios
      .get("/popular-services?type=bikes")
      .then((res) => setBikes(res.data))
      .catch((error) => console.log(error));
  }, [axios]);

  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("/popular-services?type=cars")
      .then((res) => setCars(res.data))
      .catch((error) => console.log(error));
  }, [axios]);

  return (
    <MaxWidthSection>
      <Heading3>Popular Bikes</Heading3>
      {!bikes?.length || typeof bikes === "string" ? (
        <div className="min-h-screen flex justify-center items-center w-full">
          <span className="loading loading-infinity w-40 text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10 max-w-6xl mx-auto">
          {bikes.slice(0, 8).map((bike, idx) => (
            <PopularService
              key={idx}
              bike={typeof bike === "object" ? bike : {}}
            />
          ))}
        </div>
      )}

      <div className="w-full flex justify-center">
        <Link className="btn bg-black text-white" to="/rent-bike">
          Show More Bikes
        </Link>
      </div>

      <Heading3>Popular Cars</Heading3>
      {!cars?.length || typeof cars === "string" ? (
        <div className="min-h-screen flex justify-center items-center w-full">
          <span className="loading loading-infinity w-40 text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10 max-w-6xl mx-auto">
          {cars.slice(0, 8).map((car, idx) => (
            <PopularService
              key={idx}
              car={typeof car === "object" ? car : {}}
            />
          ))}
        </div>
      )}

      <div className="w-full flex justify-center">
        <Link className="btn bg-black text-white" to="/rent-car">
          Show More Cars
        </Link>
      </div>
    </MaxWidthSection>
  );
};

export default Popular;
