import React from "react";
import { CheckIcon, TrashIcon } from "@heroicons/react/outline";
import { LoadingSmall } from "../LoadingBar";
import { useSelector } from "react-redux";

export default function TabelTambahPetugas({
  handleDeleteButton,
  handleAddButton,
  newPetugas,
  rute,
  keys,
}) {
  const { alert } = useSelector((state) => state);
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
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {/* Map funtionally petugas pasukan oranye yang akan di tambahkan */}
                {keys === "add"
                  ? newPetugas?.petugasIsNotAdd?.map((person, index) => {
                      return (
                        person.isAdd !== true && (
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
                            <td className="px-6 py-4 text-sm font-medium space-y-4 ">
                              {alert.loading ? (
                                <LoadingSmall />
                              ) : (
                                <CheckIcon
                                  onClick={() => handleAddButton(person)}
                                  className="rounded-full bg-gray-100 p hover:bg-green-500 hover:text-white text-green-500 h-6 cursor-pointer"
                                />
                              )}
                            </td>
                          </tr>
                        )
                      );
                    })
                  : rute?.rute?.map((person, index) => (
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
                        <td className="px-6 py-4 text-sm font-medium space-y-4 ">
                          {alert.loading ? (
                            <LoadingSmall />
                          ) : (
                            <TrashIcon
                              className="rounded-full bg-gray-100 p hover:bg-red-500 hover:text-white text-red-500 h-6 cursor-pointer "
                              onClick={() => handleDeleteButton(person)}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
