import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { LoadingSmall, LoadingComponent } from "../LoadingBar";

import { CheckIcon, TrashIcon } from "@heroicons/react/outline";
import {
  updateIsRoled,
  postRole,
  getSpesificRole,
  deleteRole,
} from "../../redux/actions/roleAction";

const RoleTabel = ({ petugasNotRoled, modal }) => {
  const { auth, alert, userRole } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlePostRolePetugas = ({ person }) => {
    dispatch(updateIsRoled({ auth, userId: person._id, isRoled: true }));
    dispatch(postRole({ auth, userId: person._id, role: modal.role }));
  };

  const handleDeleteRolePetugas = ({ person }) => {
    dispatch(
      updateIsRoled({ auth, userId: person.userId._id, isRoled: false })
    );
    dispatch(deleteRole({ auth, id: person._id }));
  };

  useEffect(() => {
    if (modal.role) {
      dispatch(getSpesificRole({ auth, role: modal.role }));
    }
  }, [modal.role]);

  console.log(petugasNotRoled);

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
                {modal.value === "tambahPetugas" &&
                  petugasNotRoled?.map((person, index) => {
                    return (
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
                        <td className="px-6 py-4 text-sm font-medium space-y-4 ">
                          {alert.loading ? (
                            <LoadingSmall />
                          ) : (
                            <CheckIcon
                              onClick={() => handlePostRolePetugas({ person })}
                              className="rounded-full bg-gray-100 p hover:bg-green-500 hover:text-white text-green-500 h-6 cursor-pointer"
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}

                {modal.value === "listPetugas" &&
                  userRole?.userRole?.map((person, index) => {
                    console.log(person);
                    return (
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
                        <td className="px-6 py-4 text-sm font-medium space-y-4 ">
                          {alert.loading ? (
                            <LoadingSmall />
                          ) : (
                            <TrashIcon
                              onClick={() =>
                                handleDeleteRolePetugas({ person })
                              }
                              className="rounded-full bg-gray-100 p hover:bg-red-600 hover:text-white text-red-500 h-6 cursor-pointer"
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })}

                {alert.loading && <LoadingComponent />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleTabel;
