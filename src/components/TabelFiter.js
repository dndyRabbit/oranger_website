import React from "react";

const TabelFiter = ({ search, setSearch, presensi }) => {
  return (
    <div className="flex mb-4 items-center space-x-4">
      <div className="flex space-x-2 items-center text-sm">
        <label htmlFor="">Search: </label>
        <input
          type="text"
          className="border outline-none rounded-full px-2 py-1"
          placeholder="Cari nama petugas..."
          value={search}
          disabled={presensi ? true : false}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TabelFiter;
