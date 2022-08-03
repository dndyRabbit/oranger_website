import React from "react";

const UserInfoWindow = ({ userData }) => {
  return (
    <div className="flex flex-1 space-x-2">
      <div>
        <img
          src={userData.avatar}
          alt=""
          className="w-[50px] h-[50px] rounded-full transition-all"
        />
      </div>
      <div className="space-y-4">
        <p className="text-md font-semibold">{userData.fullName}</p>
        <p className="text-sm text-gray-600">
          {userData.gender === "00" ? "Laki-laki" : "Perempuan"}
        </p>
      </div>
    </div>
  );
};

export default UserInfoWindow;
