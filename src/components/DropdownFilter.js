import React from "react";
import { options } from "../helper/datas";

const DropdownFilter = ({ select, setSelect, search, presensi }) => {
  return (
    <div className=" mb-4 flex items-center space-x-2 text-xs">
      <label
        htmlFor="country"
        className="block text-sm font-medium text-gray-700"
      >
        Peran:
      </label>
      <select
        disabled={search || presensi ? true : false}
        value={select}
        onChange={(e) => setSelect(e.target.value)}
        className={` mt-1 block w-full py-2 px-2 border border-gray-300 bg-white rounded-full shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
          search || presensi ? "bg-gray-200" : "bg-transparent"
        }`}
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownFilter;
