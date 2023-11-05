import Banner from "./Banner/Banner";
import Rent from "./Rent/Rent";

/**
 * 
 * 
 * https://i.ibb.co/L0dS41s/host-car.jpg


https://i.ibb.co/ggs11Mp/service-bike.png
https://i.ibb.co/Hn8YXy1/service-bike-1.png
https://i.ibb.co/nfSWXYg/service-bike-2.png
https://i.ibb.co/VBk34bQ/service-bike-3.png
https://i.ibb.co/JrxqLHj/service-bike-4.png
https://i.ibb.co/kJMvytM/service-bike-5.png
https://i.ibb.co/wYDzqJm/service-bike-7.png
https://i.ibb.co/4F8tczH/service-bike-8.png
https://i.ibb.co/b2jGK2P/service-car.png
https://i.ibb.co/d0NMF49/service-car-1.png
https://i.ibb.co/BNzzqK4/service-car-2.png
https://i.ibb.co/RDxSRR3/service-car-3.png
https://i.ibb.co/KWR4Nwp/service-car-4.png
https://i.ibb.co/d0NMF49/service-car-1.png
 */

const Home = () => {
  return (
    <>
      <Banner />
      <Rent
        props={{
          car: {
            title: "Rent A Car",
            para: "Have you ever wanted to explore a new city, embark on a cross-country road trip, or simply have the convenience of a personal vehicle without the commitment of ownership? Renting a car is your ticket to freedom, flexibility, and adventure.",
          },
          align: "left",
          img: "https://i.ibb.co/Wy4JTLy/Rent-car.png",
        }}
      />
      <Rent
        props={{
          bike: {
            title: "Rent A Bike",
            para: "Biking is not just a mode of transportation; it&apos;s a way of life. It&apos;s about feeling the wind in your hair, taking the road less traveled, and experiencing the city from a whole new perspective. At Bike Rental Service, we&apos;re here to help you unlock the freedom of two wheels and explore the world at your own pace.",
          },
          align: "left",
          img: "https://i.ibb.co/wNch86T/Rent-bike.png",
        }}
      />
    </>
  );
};

export default Home;
