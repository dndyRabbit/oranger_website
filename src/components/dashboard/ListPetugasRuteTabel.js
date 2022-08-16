import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { LoadingSmall, LoadingComponent } from "../LoadingBar";

import { TrashIcon } from "@heroicons/react/outline";
import TabelFiter from "../TabelFiter";
import {
  deleteUserRute,
  getUserRuteAccordingWilayah,
  patchIsRuted,
} from "../../redux/actions/ruteAction";

const ListPetugasRuteTabel = ({ modal }) => {
  const [loading, setLoading] = useState(false);
  const { auth, alert, userRute } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modal.wilayahId) {
      dispatch(
        getUserRuteAccordingWilayah({ auth, wilayahId: modal.wilayahId })
      );
    }
  }, [modal.wilayahId]);

  const handleRemovePetugasFromRute = ({ person }) => {
    dispatch(
      patchIsRuted({
        auth,
        isRuted: false,
        userId: person.userId._id,
        setLoading,
      })
    );
    dispatch(
      deleteUserRute({
        auth,
        ruteId: person._id,
        setLoading,
      })
    );
  };

  return (
    <div className="flex flex-col">
      <h3 className="mb-2 font-bold">List Wilayah Petugas</h3>
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
                {userRute?.userRute?.map((person, index) => (
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
                          <div className="text-sm font-medium text-gray-900">
                            {person?.userId?.fullName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {person?.role}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-y-4 ">
                      {loading ? (
                        <LoadingSmall />
                      ) : (
                        <TrashIcon
                          onClick={() =>
                            handleRemovePetugasFromRute({ person })
                          }
                          className="rounded-full bg-gray-100 p hover:bg-red-600 hover:text-white text-red-500 h-6 cursor-pointer"
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

export default ListPetugasRuteTabel;
