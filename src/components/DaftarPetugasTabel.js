import React, { useState } from "react";
import { TrashIcon, PencilAltIcon } from "@heroicons/react/solid";

// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const Table = ({ dataTable, search, setSearch }) => {
  // console.log(dataTable.length);
  return (
    <div className="flex flex-col">
      <div className="-my-2   sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
          <div className="shadow  overflow-auto border-b border-gray-200 max-h-[450px] -scroll-ml-2.5">
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
                    Tanggal Lahir
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Jenis Kelamin
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No.KTP
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No.Handphone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Alamat
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {dataTable
                  ?.filter((val) => {
                    if (search == "") {
                      return val;
                    } else if (
                      val.namaLengkap
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((person, index) => {
                    return person ? (
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
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {person.tanggalLahir}
                        </td>

                        <td className="px-6 py-4 ">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-50 text-orange-500">
                            {person.role.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {person.jenisKelamin}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {person.noKTP}
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {person.noHandphone}
                        </td>

                        <td className="px-6 py-4  text-sm text-gray-500">
                          {person.alamatLengkap}
                        </td>
                        <td className=" px-6 py-4  text-right text-sm font-medium space-y-6">
                          <PencilAltIcon className="border-2 bg-gray-100 p rounded-md text-gray-500" />

                          <TrashIcon className="border-2 bg-gray-100 p rounded-md text-red-500" />
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          Data Not Found
                        </td>
                      </tr>
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

export default Table;
