import { Link } from "react-router-dom";
import P from "../../Shared/P/P";
import MaxWidthSection from "../../Shared/MaxWidthSection/MaxWidthSection";
import { Typewriter } from "react-simple-typewriter";

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
      className={`max-lg:bg-black lg:bg-[url(https://i.ibb.co/NYKJsX1/Home-banner.png)] bg-cover w-full max-md:min-h-[calc(100vh/3)] md:min-h-screen mb-10`}>
      <MaxWidthSection>
        <div className="h-screen flex items-center">
          <div className="flex-1 space-y-10">
            <h1 className="text-5xl text-white font-bold leading-snug">
              <Typewriter
                words={[
                  "Unlock Endless Driving With Drivee",
                  "Explore Boundless Roads with RentRide",
                  "Infinite Adventures Await at RentWheels",
                  "Endless Journeys Begin at SwiftWheels",
                  "Embark on Endless Roads with SwiftWheels",
                ]}
                deleteSpeed={25}
                typeSpeed={120}
                delaySpeed={2000}
                loop={0}
              />
            </h1>
            <P>
              Welcome to Drivee, your gateway to endless driving possibilities!
              Whether you&apos;re a seasoned road-tripper, a daily commuter, or
              an adventurous spirit looking to explore new horizons, Drivee is
              here to empower your journey.
            </P>
            <div className="flex gap-5">
              <Link
                to="/rent-car"
                className="px-6 py-3 rounded capitalize border border-white text-white text-xl hover:bg-white hover:text-black font-semibold">
                Rent Car
              </Link>
              <Link
                to="/rent-bike"
                className="px-6 py-3 rounded capitalize border border-white text-white text-xl hover:bg-white hover:text-black font-semibold">
                Rent Bike
              </Link>
            </div>
          </div>
          <div className="flex-1"></div>
        </div>
      </MaxWidthSection>
    </section>
  );
};

export default Banner;
