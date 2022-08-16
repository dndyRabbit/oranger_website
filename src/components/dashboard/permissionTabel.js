import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";

import { CheckCircleIcon, TrashIcon } from "@heroicons/react/outline";
import { patchUserStatusPermission } from "../../redux/actions/permissionAction";

const PermissionTabel = ({ dataTable, setModal }) => {
  const img =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg";

  const dispatch = useDispatch();
  const { auth, permission, socket } = useSelector((state) => state);

  console.log(socket);

  const handleApprovePermission = async ({ id, key }) => {
    if (key) {
      dispatch(
        patchUserStatusPermission({
          auth,
          id,
          isApproved: true,
          status: "Disetujui",
        })
      );
    } else {
      dispatch(
        patchUserStatusPermission({
          auth,
          id,
          isApproved: true,
          status: "Tidak disetujui",
        })
      );
    }

    // await socket.emit("send_permission_approved", {
    //   isApproved: true,
    //   status: "Disetujui",
    // });
  };

  return (
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
          <div className="shadow  overflow-auto border-b border-gray-200 max-h-[400px] -scroll-ml-2.5">
            <table className="min-w-full divide-y divide-gray-200 text-xs ">
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
                    type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    deskripsi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal Mulai
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal Akhir
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    bukti
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal Pengajuan
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
                {dataTable?.map((person, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {++index}
                    </td>
                    <td className="px-6 py-4 ">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={person?.userId?.avatar}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-xs font-medium text-gray-900">
                            {person?.userId?.fullName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4  text-xs  text-orange-500">
                      {person?.role}
                    </td>

                    <td className="px-6 py-4 text-xs  text-gray-500">
                      {person?.type}
                    </td>
                    <td className="px-6 py-4  text-xs  text-gray-500">
                      {person?.description}
                    </td>
                    <td className="px-6 py-4 text-xs  text-gray-500">
                      {person?.startDate &&
                        format(new Date(person?.startDate), "yyyy-MM-dd")}
                    </td>

                    <td className="px-6 py-4  text-xs  text-gray-500">
                      {person?.startDate &&
                        format(new Date(person?.endDate), "yyyy-MM-dd")}
                    </td>

                    <td className="px-6 py-4 text-xs  text-gray-500">
                      <div className="flex-shrink-0 h-12 w-10">
                        <img
                          className="h-12 w-10 rounded-md cursor-pointer"
                          src={person?.evidence ? person?.evidence : img}
                          alt=""
                          onClick={() =>
                            setModal({
                              isOpen: true,
                              img: person?.evidence ? person?.evidence : img,
                            })
                          }
                        />
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {format(new Date(person?.date), "yyyy-MM-dd")}
                    </td>

                    <td className=" px-6 py-4  text-right text-xs  font-medium space-y-6">
                      <CheckCircleIcon
                        onClick={() =>
                          handleApprovePermission({
                            id: person?._id,
                            key: true,
                          })
                        }
                        className="h-6 p rounded-full text-gray-500 hover:text-green-400 cursor-pointer transition hover:-skew-x-12"
                      />

                      <TrashIcon
                        onClick={() =>
                          handleApprovePermission({
                            id: person?._id,
                            key: false,
                          })
                        }
                        className="  h-6  p rounded-full  text-gray-500  hover:text-red-500 cursor-pointer transition hover:skew-x-12"
                      />
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
};

export default PermissionTabel;
