import { useEffect, useState } from "react";
import MaxWidthSection from "../../Shared/MaxWidthSection/MaxWidthSection";
import Heading3 from "../../Shared/Heading3/Heading3";
import P from "../../Shared/P/P";
import useAxios from "../../../Hooks/useAxios";
import ContextProvider from "../../../Hooks/ContextProvider";

const Testimonials = () => {
  const axios = useAxios();
  const { loading, error, setError } = ContextProvider();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("/testimonials")
      .then((response) => {
        // console.log(response.data);
        setComments(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [axios, setError]);

  return (
    <div className="my-20">
      <MaxWidthSection>
        <Heading3>What our customer saying...</Heading3>

        <div className="flex justify-between max-xl:flex-wrap gap-10 mt-10">
          {!comments?.length ? (
            <div>
              {error ? (
                <Heading3>{error}</Heading3>
              ) : loading ? (
                <span className="loading loading-infinity w-40 text-primary"></span>
              ) : (
                <Heading3>No Comments Found</Heading3>
              )}
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="card min-w-[20rem] max-w-[24rem] bg-base-100 shadow-xl image-full mx-auto">
                <figure>
                  <img src={comment.image} alt={comment.name} />
                </figure>
                <div className="card-body mt-36">
                  <h2 className="card-title text-gray-300">{comment.title}</h2>
                  <P>{comment.comment}</P>
                  <cite className="text-gray-300">-- {comment.name}</cite>
                </div>
              </div>
            ))
          )}
        </div>
      </MaxWidthSection>
    </div>
  );
};

export default Testimonials;
