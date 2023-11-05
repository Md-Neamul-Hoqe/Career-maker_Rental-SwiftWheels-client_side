import { Link } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const ErrorPage = () => {
  return (
    <>
      <Navbar inHome={true} />
      <section className="min-h-[calc(100vh-220px)] flex flex-col items-center gap-5 text-black text-xl">
        <figure className="mt-20">
          <img
            className="w-auto mx-auto"
            src="https://i.ibb.co/yyLthpC/error-404.png"
            alt="Error Page"
          />
        </figure>
        <div className="text-white">
          <p>You may have to check your URL again</p>
          <p>
            Go to <Link className="btn btn-sm border-red-400" to="/">home</Link> page
          </p>
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default ErrorPage;
