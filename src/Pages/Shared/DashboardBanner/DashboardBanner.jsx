import Heading3 from "../Heading3/Heading3";

const DashboardBanner = () => {
  return (
    <section className="mb-20">
      <div
        className={`hero top-16 px-14 bg-[url("https://i.ibb.co/P5T1srn/dashboard-banner.png")] bg-center max-md:bg-cover`}
        style={{
          backgroundSize: '100vw 100%'
        }}>
        <div className="hero-content w-full flex-col lg:flex-row min-h-[312px]">
          <aside className="card">
            <div className="card-body text-white">
              <Heading3>Dashboard</Heading3>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default DashboardBanner;
