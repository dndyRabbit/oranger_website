import React from "react";

import {
  ChevronUpIcon,
  ChevronDownIcon,
  UserAddIcon,
  IdentificationIcon,
} from "@heroicons/react/outline";

const RuteWilayahPetugas = ({
  isList,
  setIsList,
  wilayahs,
  handleTambahPetugas,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 border rounded-md border-gray-100 shadow-md transition">
      <p className="font-medium">Rute Petugas</p>

      <div className="self-start w-full flex flex-col">
        <p className="text-sm">Jam 05.00 - 15.00</p>
        <div
          onClick={() => setIsList(!isList)}
          className=" flex items-center w-full justify-center cursor-pointer rounded-full hover:bg-gray-50 pb-1"
        >
          {isList ? (
            <ChevronUpIcon className="h-6 text-orange-400" />
          ) : (
            <ChevronDownIcon className="h-6 text-orange-400" />
          )}
        </div>
        {isList &&
          wilayahs?.map((item, index) => {
            return (
              <div
                key={index}
                className=" flex justify-between border shadow-md mb-2 p-2 rounded-md w-full text-sm"
              >
                <div className="flex flex-col justify-between">
                  <p>{item.namaWilayah}</p>
                  <p className="text-xs text-gray-400">{item.alamat}</p>
                </div>

                <div className="space-y-2 items-center flex flex-col">
                  <UserAddIcon
                    className="h-5 text-gray-400 cursor-pointer hover:text-orange-400 transition hover:-skew-x-12"
                    onClick={() =>
                      handleTambahPetugas({
                        msg: "Tambah Petugas",
                        modal: true,
                        key: "add",
                        wilayah: item,
                      })
                    }
                  />
                  <IdentificationIcon
                    className="h-5 text-gray-400 cursor-pointer hover:text-orange-400 transition hover:skew-x-12"
                    onClick={() =>
                      handleTambahPetugas({
                        msg: `List Petugas ${item.namaWilayah}`,
                        key: "list",
                        modal: true,
                        _wilayahId: item.id,
                      })
                    }
                  />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RuteWilayahPetugas;
