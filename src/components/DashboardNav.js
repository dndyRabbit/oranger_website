import React from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardNav = ({ nav }) => {
  const pathname = useLocation();

  const navLinks = [
    { label: "Peran Petugas", path: "/dashboard/peran" },
    { label: "Wilayah Petugas", path: "/dashboard/wilayah" },
    { label: "Absensi Petugas", path: "/dashboard/absensi" },
    { label: "Pelaporan Pekerjaan", path: "/dashboard/pelaporan" },
    { label: "Perizinan Petugas", path: "/dashboard/perizinan/submission" },
  ];

  const isActive = (pn) => {
    if (pn === pathname.pathname) return "border-b-2 border-orange-500";
  };

  return (
    <div className="w-full shadow-lg mb-10 bg-white rounded-md items-center">
      <div className="p-2 flex space-x-10 ">
        {navLinks.map((e, i) => (
          <div
            className={`hover:scale-105 cursor-pointer ${isActive(
              e.path
            )} transition ease-in-out`}
            key={i}
          >
            <Link to={e.path}>
              <p>{e.label}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardNav;
