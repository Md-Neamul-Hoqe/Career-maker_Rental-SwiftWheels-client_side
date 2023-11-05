import { Link } from "react-router-dom";

/**
 * Banners Image
 * https://i.ibb.co/k30TwTF/bike-service-banner.png
https://i.ibb.co/P5T1srn/dashboard-banner.png
https://i.ibb.co/5rLWvxW/extra-bonus-bike-banner.png
https://i.ibb.co/Fb7V9KL/extra-bonus-car-banner.png

https://i.ibb.co/Y7vm1S6/service-banner.png
 */

const Banner = () => {
  return (
    <section
      className={`bg-[url(https://i.ibb.co/NYKJsX1/Home-banner.png)] bg-cover w-full min-h-screen`}>
      <div className="h-screen flex items-center max-w-6xl mx-auto">
        <div className="flex-1 space-y-10">
          <h1 className="text-5xl text-white font-bold leading-snug">
            Unlock Endless Driving <br /> With Drivee
          </h1>
          <p className="text-lg text-gray-500">
            Welcome to Drivee, your gateway to endless driving possibilities!
            Whether you&apos;re a seasoned road-tripper, a daily commuter, or an
            adventurous spirit looking to explore new horizons, Drivee is here
            to empower your journey.
          </p>
          <div className="flex gap-5">
            <Link className="px-6 py-3 rounded capitalize border border-white text-white text-xl hover:bg-white hover:text-black font-semibold">
              Rent Car
            </Link>
            <Link className="px-6 py-3 rounded capitalize border border-white text-white text-xl hover:bg-white hover:text-black font-semibold">
              Rent Bike
            </Link>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>
    </section>
  );
};

export default Banner;