import React from "react";
import { optionsStatusAbsen } from "../helper/datas";

const DropdownChangeStatusAbsen = ({
  select,
  setSelect,
  statusAbsen,
  userId,
  handleChangeStatus,
}) => {
  const handler = (e) => {
    setSelect(e.target.value);
    handleChangeStatus({ userId, newStatusAbsen: e.target.value });
  };
  return (
    <div className=" mb-4 flex items-center space-x-2 text-xs">
      <select
        value={select ? select : statusAbsen}
        onChange={handler}
        className={` mt-1 w-full py-2 px-2 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 `}
      >
        {optionsStatusAbsen.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownChangeStatusAbsen;
