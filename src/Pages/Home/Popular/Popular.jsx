import { useEffect, useState } from "react";
import { useRouteError } from "react-router-dom";
import Heading3 from "../../Shared/Heading3/Heading3";
import axios from "axios";
import Service from "../../Shared/Service/Service";
import MaxWidthSection from "../../Shared/MaxWidthSection/MaxWidthSection";

const Popular = () => {
  const error = useRouteError();

  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    axios
      .get("/bikes.json")
      .then((res) => setBikes(res.data))
      .catch((error) => console.log(error));
  }, []);

  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios
      .get("/cars.json")
      .then((res) => setCars(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <MaxWidthSection>
      <Heading3>Popular Bikes</Heading3>
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
      <Heading3>Popular Cars</Heading3>
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
    </MaxWidthSection>
  );
};

export default Popular;
