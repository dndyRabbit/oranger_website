import React from "react";
import { XIcon, CheckIcon } from "@heroicons/react/outline";
import { patchRootAdmin, patchStatusAdmin } from "../redux/actions/adminAction";

const AdminSettingTable = ({ data, dispatch, auth }) => {
  const handleChangeStatusAdmin = ({ id, fullName, isAdmin }) => {
    dispatch(patchStatusAdmin({ id, fullName, auth, isAdmin }));
  };
  const handleChangeRootAdmin = ({ id, fullName, root }) => {
    dispatch(patchRootAdmin({ id, fullName, auth, root }));
  };
  return (
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
          <div className="shadow  overflow-auto border-b border-gray-200 max-h-[400px] -scroll-ml-2.5">
            <table className="min-w-full divide-y divide-gray-200  ">
              <thead className="bg-gray-50">
                <tr>
                  {data?.head?.map((value, index) => (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      key={index}
                    >
                      {value}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {data?.body?.map((value, index) => (
                  <tr>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {++index}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {value.fullName}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {value.email}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {value.isAdmin ? (
                        <CheckIcon
                          className="h-6 p rounded-full text-green-500 hover:text-orange-400 cursor-pointer transition hover:-skew-x-12"
                          onClick={() =>
                            handleChangeStatusAdmin({
                              id: value._id,
                              fullName: value.fullName,
                              isAdmin: value.isAdmin,
                            })
                          }
                        />
                      ) : (
                        <XIcon
                          className="h-6 p rounded-full text-red-500 hover:text-orange-400 cursor-pointer transition hover:-skew-x-12"
                          onClick={() =>
                            handleChangeStatusAdmin({
                              id: value._id,
                              fullName: value.fullName,
                              isAdmin: value.isAdmin,
                            })
                          }
                        />
                      )}
                    </td>
                    <td className="px-6 py-4  text-sm text-gray-500">
                      {value.root ? (
                        <CheckIcon
                          className="h-6 p rounded-full text-green-500 hover:text-orange-400 cursor-pointer transition hover:-skew-x-12"
                          onClick={() =>
                            handleChangeRootAdmin({
                              id: value._id,
                              fullName: value.fullName,
                              root: value.root,
                            })
                          }
                        />
                      ) : (
                        <XIcon
                          className="h-6 p rounded-full text-red-500 hover:text-orange-400 cursor-pointer transition hover:-skew-x-12"
                          onClick={() =>
                            handleChangeRootAdmin({
                              id: value._id,
                              fullName: value.fullName,
                              root: value.root,
                            })
                          }
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

export default AdminSettingTable;
