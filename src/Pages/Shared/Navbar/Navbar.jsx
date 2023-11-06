import PropType from "prop-types";
import { Link, NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  console.log(location?.pathname, location?.pathname === "/");

  const NavLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2 rounded-none join join-vertical bg-gray-600 border border-white">
            <li>
              <NavLink to="/rent-car" className="whitespace-nowrap join-item">
                Rent Car
              </NavLink>
            </li>
            <li>
              <NavLink to="/rent-bike" className="whitespace-nowrap join-item">
                Rent Bike
              </NavLink>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Dashboard</summary>
          <ul className="p-2 rounded-none join join-vertical bg-gray-600 border border-white">
            <li>
              <NavLink to="" className="whitespace-nowrap join-item">
                Add Service
              </NavLink>
            </li>
            <li>
              <NavLink to="" className="whitespace-nowrap join-item">
                My Services
              </NavLink>
            </li>
            <li>
              <NavLink to="" className="whitespace-nowrap join-item">
                My Schedules
              </NavLink>
            </li>
          </ul>
        </details>
      </li>
    </>
  );

  return (
    <div>
      <div
        className={`${
          location?.pathname === "/"
            ? "bg-[#0e0e0e] text-white"
            : "bg-white text-[#0e0e0e]"
        } navbar`}>
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52">
              {NavLinks}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">SwiftWheels</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{NavLinks}</ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-5">
              <h4>Md. Neamul Hoqe</h4>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://i.ibb.co/7vx2MGG/user-1.png" />
                </div>
              </label>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  inHome: PropType.bool,
};
export default Navbar;
