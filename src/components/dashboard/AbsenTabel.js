import React, { useState, useEffect } from "react";

import { PencilIcon } from "@heroicons/react/outline";
import AbsenTabelContent from "./AbsenTabelContent";
import { useDispatch } from "react-redux";

const AbsenTabel = ({
  dataTable,
  search,
  presensi,
  setModal,
  select,
  handleChangeStatus,
}) => {
  const img =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg";

  const newDataTable = dataTable?.absensi?.petugasAbsensi;

  return (
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
          <div className="shadow  overflow-auto border-b border-gray-200 max-h-[400px] -scroll-ml-2.5">
            <table className="min-w-full divide-y divide-gray-200  ">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama Petugas
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pekerjaan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Absen Masuk
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Absen Keluar
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Bukti
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status Absen
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {select &&
                  newDataTable
                    ?.filter((val) => {
                      if (select === "") {
                        return val;
                      } else if (val.role.includes(select)) {
                        return val;
                      }
                    })
                    .map((person, index) => {
                      return (
                        <AbsenTabelContent
                          person={person}
                          index={index}
                          setModal={setModal}
                          handleChangeStatus={handleChangeStatus}
                          img={img}
                        />
                      );
                    })}
                {presensi &&
                  newDataTable
                    ?.filter((val) => {
                      if (presensi === "") {
                        return val;
                      } else if (val.statusAbsen.includes(presensi)) {
                        return val;
                      }
                    })
                    .map((person, index) => {
                      return (
                        <AbsenTabelContent
                          person={person}
                          index={index}
                          setModal={setModal}
                          handleChangeStatus={handleChangeStatus}
                          img={img}
                        />
                      );
                    })}
                {search &&
                  newDataTable
                    ?.filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.userId.namaLengkap
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((person, index) => {
                      return (
                        <AbsenTabelContent
                          person={person}
                          index={index}
                          setModal={setModal}
                          handleChangeStatus={handleChangeStatus}
                          img={img}
                        />
                      );
                    })}

                {!search &&
                  !presensi &&
                  !select &&
                  newDataTable?.map((person, index) => {
                    return (
                      <AbsenTabelContent
                        key={index}
                        person={person}
                        index={index}
                        setModal={setModal}
                        handleChangeStatus={handleChangeStatus}
                        img={img}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AbsenTabel;
