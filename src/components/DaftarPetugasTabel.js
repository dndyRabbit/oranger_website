import React, { useState } from "react";
import { TrashIcon, InformationCircleIcon } from "@heroicons/react/solid";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../redux/actions/userAction";

const Table = ({ dataTable, search, setIsInfo, setInfoUserData }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const handleInformationPetugas = (person) => {
    setIsInfo(true);
    setInfoUserData(person);
  };

  const handleHapusPetugas = (id) => {
    if (
      window.confirm(
        `Apakah anda yakin ingin menghapus petugas ini?`,
        `Jika iya, semua data petugas akan terhapus pada database.`
      )
    ) {
      dispatch(deleteUser({ auth, id, key: "main" }));
    }
  };

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
                      val?.fullName
                        .toLowerCase()
                        .includes(search?.toLowerCase())
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
                                {person.fullName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4  text-sm text-gray-500">
                          {format(new Date(person.birthday), "yyyy-MM-dd")}
                        </td>

                        <td className=" px-6 py-4  text-right text-sm font-medium space-y-6">
                          <InformationCircleIcon
                            onClick={() => handleInformationPetugas(person)}
                            className="h-6 p rounded-full text-gray-500 hover:text-blue-400 cursor-pointer transition hover:-skew-x-12"
                          />

                          <TrashIcon
                            onClick={() => handleHapusPetugas(person._id)}
                            className="  h-6  p rounded-full  text-gray-500  hover:text-red-500 cursor-pointer transition hover:skew-x-12"
                          />
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
