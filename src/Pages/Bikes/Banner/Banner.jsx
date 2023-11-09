import MaxWidthSection from "../../Shared/MaxWidthSection/MaxWidthSection";

/**
 * Banners Image
 * 
https://i.ibb.co/P5T1srn/dashboard-banner.png
https://i.ibb.co/5rLWvxW/extra-bonus-bike-banner.png
https://i.ibb.co/Fb7V9KL/extra-bonus-car-banner.png

https://i.ibb.co/Y7vm1S6/service-banner.png
 */

const Banner = () => {
  return (
    <section
      className={`bg-[url(https://i.ibb.co/k30TwTF/bike-service-banner.png)] bg-cover w-full h-80`}>
      <MaxWidthSection>
        <div className="flex items-center justify-center h-80">
          <h1 className="text-5xl text-white font-bold leading-snug">
            Rent Bikes
          </h1>
        </div>
        
      </MaxWidthSection>
    </section>
  );
};

export default Banner;
