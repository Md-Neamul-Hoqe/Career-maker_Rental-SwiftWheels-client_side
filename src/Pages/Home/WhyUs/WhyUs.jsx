import MaxWidthSection from "../../Shared/MaxWidthSection/MaxWidthSection";
import Heading3 from "../../Shared/Heading3/Heading3";
import P from "../../Shared/P/P";

const WhyUs = () => {
  return (
    <MaxWidthSection>
      <div className="flex-1 space-y-5">
        <Heading3>Why Choose Us</Heading3>
        <P>
          Choosing the right rental service can make all the difference in your
          experience. At [Your Rental Company], we take pride in offering you
          the best possible rental experience. Here are some compelling reasons
          to choose us for your rental needs:
        </P>

        <dl className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <div>
            <dt className="italic font-semibold mb-2">
              {" "}
              Diverse Rental Fleet:
            </dt>
            <dd className="ps-5 text-base">
              We understand that your rental needs are as unique as you are.
              That&apos;s why we maintain a diverse and well-maintained fleet of
              vehicles, whether you need a car, a bike, a truck, or an RV. No
              matter the occasion, we have the perfect vehicle for you.
            </dd>
          </div>
          <div>
            <dt className="italic font-semibold mb-2">
              {" "}
              Uncompromising Quality:
            </dt>
            <dd className="ps-5 text-base">
              Quality is at the heart of everything we do. Our vehicles undergo
              regular maintenance and inspection to ensure they are in top-notch
              condition. When you choose us, you choose reliability, safety, and
              peace of mind.
            </dd>
          </div>
          <div>
            <dt className="italic font-semibold mb-2"> Competitive Pricing:</dt>
            <dd className="ps-5 text-base">
              We believe that quality shouldn&apos;t come at a premium. Our
              pricing is competitive, fair, and transparent. You&apos;ll find
              rental options that fit your budget without sacrificing quality or
              service.
            </dd>
          </div>
          <div>
            <dt className="italic font-semibold mb-2">
              {" "}
              User-Friendly Booking:
            </dt>
            <dd className="ps-5 text-base">
              Booking with us is hassle-free. Our user-friendly platform allows
              you to browse our inventory, select your vehicle, choose your
              pickup and drop-off locations, and set your rental duration in
              just a few clicks.
            </dd>
          </div>
          <div>
            <dt className="italic font-semibold mb-2"> Convenience:</dt>
            <dd className="ps-5 text-base">
              We value your time. Our pickup and drop-off locations are
              conveniently placed, and our team is ready to assist you whenever
              you need. We&apos;re dedicated to making your rental experience as
              smooth and convenient as possible.
            </dd>
          </div>
          <div>
            <dt className="italic font-semibold mb-2">
              {" "}
              Environmental Responsibility:
            </dt>
            <dd className="ps-5 text-base">
              We&apos;re committed to reducing our carbon footprint and
              promoting sustainable transportation options. When you choose us,
              you&apos;re choosing an eco-friendly way to travel.
            </dd>
          </div>
          <div>
            <dt className="italic font-semibold mb-2">
              {" "}
              Customer-Centric Approach:
            </dt>
            <dd className="ps-5 text-base">
              Your satisfaction is our top priority. Our team is here to assist
              you, answer your questions, and ensure your rental experience is
              nothing short of exceptional.
            </dd>
          </div>
          <div>
            <dt className="italic font-semibold mb-2">
              {" "}
              Community of Renters:
            </dt>
            <dd className="ps-5 text-base">
              When you choose us, you&apos;re not just a customer; you&apos;re
              part of our community. Join a network of satisfied renters, share
              your experiences, and connect with fellow adventurers.
            </dd>
          </div>
          <div>
            <dt className="italic font-semibold mb-2">
              {" "}
              Experience and Reputation:
            </dt>
            <dd className="ps-5 text-base">
              We have a proven track record of providing reliable and
              exceptional rental services. Our reputation is built on years of
              experience and countless satisfied customers.
            </dd>
          </div>

          <div>
            <dt className="italic font-semibold mb-2">
              {" "}
              Endless Possibilities:
            </dt>
            <dd className="ps-5 text-base">
              From daily commutes to cross-country road trips, our rentals are
              designed to unlock endless possibilities. Whether you&apos;re
              seeking adventure or convenience, we have you covered.
            </dd>
          </div>
        </dl>
      </div>
    </MaxWidthSection>
  );
};

export default WhyUs;
