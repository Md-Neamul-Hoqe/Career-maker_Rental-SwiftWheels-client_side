import Banner from "./Banner/Banner";
import Popular from "./Popular/Popular";
import Rent from "./Rent/Rent";
import Testimonials from "./Testimonials/Testimonials";
import WhyUs from "./WhyUs/WhyUs";

/**
 * 
 * 
 * https://i.ibb.co/L0dS41s/host-car.jpg
 */

const Home = () => {
  return (
    <>
      <Banner />

      <Popular />

      <Rent
        props={{
          car: {
            title: "Rent A Car",
            para: "Have you ever wanted to explore a new city, embark on a cross-country road trip, or simply have the convenience of a personal vehicle without the commitment of ownership? Renting a car is your ticket to freedom, flexibility, and adventure.",
          },
          img: "https://i.ibb.co/Wy4JTLy/Rent-car.png",
        }}
      />
      <Rent
        props={{
          bike: {
            title: "Rent A Bike",
            para: "Biking is not just a mode of transportation; it&apos;s a way of life. It&apos;s about feeling the wind in your hair, taking the road less traveled, and experiencing the city from a whole new perspective. At Bike Rental Service, we&apos;re here to help you unlock the freedom of two wheels and explore the world at your own pace.",
          },
          img: "https://i.ibb.co/wNch86T/Rent-bike.png",
        }}
      />

      <WhyUs />
      <Testimonials />
    </>
  );
};

export default Home;
