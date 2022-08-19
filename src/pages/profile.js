import React from "react";
import Nav from "../components/Nav";
import { useSelector } from "react-redux";

const Profile = () => {
  const { auth } = useSelector((state) => state);

  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className=" w-full max-w-5xl ">
        <h2 className="my-4 font-semibold text-xl">PROFILE</h2>

        <div className="w-full bg-white shadow-lg  p-4 rounded-md">
          <div className="flex flex-row w-full justify-between space-x-2">
            <div className="flex flex-col w-[400px]">
              <label>Nama Lengkap</label>
              <input
                type="text"
                name="namaLengkap"
                placeholer={auth.user.fullName}
                className="p-2 bg-transparent border border-gray-300 rounded-md bg-gray-300 "
                disabled={true}
                value={auth.user.fullName}
              />
            </div>
          </div>
          {/* ---------------- */}
          <div className="flex flex-row w-full justify-between space-x-2">
            <div className="flex flex-col w-[400px]">
              <label>Email</label>
              <input
                type="email"
                className="p-2 bg-transparent border border-gray-300 rounded-md bg-gray-300 "
                disabled={true}
                value={auth.user.email}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
