import Heading3 from "../Heading3/Heading3";

const DashboardBanner = () => {
  return (
    <section className="mb-20">
      <div
        className="hero top-16 px-14"
        style={{
          backgroundImage:
            'url("https://i.ibb.co/P5T1srn/dashboard-banner.png")',
          backgroundOrigin: "center",
          backgroundSize: "100vw 50vh",
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
