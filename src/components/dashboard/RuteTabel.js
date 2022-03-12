import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { patchPetugasAbsen } from "../../redux/actions/absenAction";

const RuteTabel = ({ dataTable, search, auth }) => {
  const dispatch = useDispatch();

  const newDataTable = dataTable?.listOfPetugas?.[0]?.petugasAbsensi;

  const data = dataTable?.listOfPetugas?.[0];

  const handleSubmit = (person) => {
    //sementara nanti diapus, jika sudah membuat aplikasi android
  };

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
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Submit
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                <tr key={index}>
                  <td className="px-6 py-4  text-sm text-gray-500">
                    {++index}
                  </td>
                  <td className="px-6 py-4 ">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={person.avatar}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {person.namaLengkap}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 ">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        person.statusAbsen === "Belum Absen"
                          ? "bg-yellow-100 text-yellow-500"
                          : "bg-green-100 text-green-800"
                      } `}
                    >
                      {person.statusAbsen}
                    </span>
                  </td>
                  <td className="px-6 py-4  text-sm text-gray-500">
                    {format(new Date(person.tanggal), "yyyy-MM-dd")}
                  </td>
                  <td className="px-6 py-4  text-sm text-gray-500">
                    <button onClick={() => handleSubmit(person)}>Absen</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RuteTabel;
