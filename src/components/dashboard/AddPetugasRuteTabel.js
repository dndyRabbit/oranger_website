import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { LoadingSmall, LoadingComponent } from "../LoadingBar";

import { CheckIcon, TrashIcon } from "@heroicons/react/outline";
import TabelFiter from "../TabelFiter";
import { patchIsRuted, postRute } from "../../redux/actions/ruteAction";
import DropdownFilter from "../DropdownFilter";

const AddPetugasRuteTabel = ({ modal }) => {
  const { auth, petugasAndRoles, alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");

  const handleAddPetugasToWilayah = ({ person }) => {
    console.log(person._id);
    dispatch(
      postRute({
        auth,
        wilayahId: modal.wilayahId,
        userId: person.userId._id,
        role: person.role,
      })
    );
    dispatch(
      patchIsRuted({
        auth,
        isRuted: true,
        userId: person.userId._id,
        roleId: person._id,
      })
    );
  };

  return (
    <div className="flex flex-col">
      <h3 className="mb-2 font-bold">Tambah Petugas</h3>
      <div className=" flex justify-between items-center">
        <TabelFiter select={select} search={search} setSearch={setSearch} />
        <DropdownFilter select={select} setSelect={setSelect} />
      </div>

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
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {select
                  ? petugasAndRoles?.petugasAndRoles
                      ?.filter((val) => {
                        if (select === "") {
                          return val;
                        } else if (val.role.includes(select)) {
                          return val;
                        }
                      })
                      .map((person, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {++index}
                          </td>
                          <td className="px-6 py-4 ">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={person.userId.avatar}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {person.userId.fullName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium space-y-4 ">
                            {alert.loading ? (
                              <LoadingSmall />
                            ) : (
                              <CheckIcon
                                onClick={() =>
                                  handleAddPetugasToWilayah({ person })
                                }
                                className="rounded-full bg-gray-100 p hover:bg-green-600 hover:text-white text-green-500 h-6 cursor-pointer"
                              />
                            )}
                          </td>
                        </tr>
                      ))
                  : petugasAndRoles?.petugasAndRoles
                      ?.filter((val) => {
                        if (search === "") {
                          return val;
                        } else if (val.userId.namaLengkap.includes(search)) {
                          return val;
                        }
                      })
                      .map((person, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {++index}
                          </td>
                          <td className="px-6 py-4 ">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={person.userId.avatar}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {person.userId.fullName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {person.role}
                          </td>
                          <td className="px-6 py-4 text-sm font-medium space-y-4 ">
                            {alert.loading ? (
                              <LoadingSmall />
                            ) : (
                              <CheckIcon
                                onClick={() =>
                                  handleAddPetugasToWilayah({ person })
                                }
                                className="rounded-full bg-gray-100 p hover:bg-green-600 hover:text-white text-green-500 h-6 cursor-pointer"
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
};

export default AddPetugasRuteTabel;
