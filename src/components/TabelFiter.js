import React from "react";

const TabelFiter = ({ search, setSearch, select, presensi }) => {
  return (
    <div className="flex mb-4 items-center space-x-4">
      <div className="flex space-x-2 items-center text-sm">
        <label htmlFor="">Search: </label>
        <input
          type="text"
          className="border outline-none rounded-full px-2 py-1"
          placeholder="Cari nama petugas..."
          value={search}
          disabled={select || presensi ? true : false}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <p
            onClick={() => setSearch("")}
            className="text-gray-500 text-xs cursor-pointer"
          >
            Clear
          </p>
        )}
      </div>
    </div>
  );
};

export default TabelFiter;
