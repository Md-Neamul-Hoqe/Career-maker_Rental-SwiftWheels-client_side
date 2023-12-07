import PropTypes from "prop-types";
import useAxios from "../../../Hooks/useAxios";
import useContextProvider from "../../../Hooks/useContextProvider";
import { useState } from "react";
import MaxWidthSection from "../MaxWidthSection/MaxWidthSection";
import Heading3 from "../Heading3/Heading3";
import Service from "../Service/Service";

const Search = ({ type }) => {
  const axios = useAxios();
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState([]);
  const { setError, error, loading } = useContextProvider();

  const handleSearch = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const title = form.title.value;

    setSearch(title);
    axios
      .get(`/filtered-services/${title}?type=${type}`)
      .then((res) => setServices(res?.data))
      .catch((error)=>{
            console.log(error.message);
            return setError(error.message);
          });
    // console.log(title);
  };

  return (
    <MaxWidthSection>
      <div className="flex flex-col items-end">
        <form
          onSubmit={handleSearch}
          className="bg-white text-black join mb-2 mt-10 ">
          <input
            name="title"
            className="input input-bordered border-black join-item"
            placeholder="Service name"
            type="text"
          />
          <button type="submit" className="btn bg-black text-white join-item">
            search
          </button>
        </form>
        <div
          className={`w-full text-start ${services?.length ? "" : "hidden"}`}>
          <Heading3>Searched For: {search}</Heading3>
        </div>
        <section
          className={`w-full border border-black rounded-lg min-h-[calc(100vh/3)] grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 p-10 ${
            services?.length ? "" : "hidden"
          }`}>
          {!services?.length || typeof services === "string" ? (
            <div className="min-h-screen flex justify-center items-center w-full">
              {error ? (
                <Heading3>{error}</Heading3>
              ) : !loading ? (
                <Heading3>No {type} Found</Heading3>
              ) : (
                <span className="loading loading-infinity w-40 text-primary"></span>
              )}
            </div>
          ) : (
            services?.map((service) => (
              <Service key={service._id} service={service} />
            ))
          )}
        </section>
      </div>
    </MaxWidthSection>
  );
};

Search.propTypes = {
  type: PropTypes.string,
};

export default Search;
