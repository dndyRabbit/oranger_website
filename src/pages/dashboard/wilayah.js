import React, { useEffect, useState } from "react";

import DashboardNav from "../../components/DashboardNav";
import Nav from "../../components/Nav";

import { useDispatch, useSelector } from "react-redux";

import {
  UserAddIcon,
  UserGroupIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";

import WilayahModal from "../../components/dashboard/wilayahModal";
import {
  deleteAllWilayah,
  getUsersAndRoles,
  getWilayah,
} from "../../redux/actions/wilayahAction";
import {
  deleteAllUserRute,
  patchAllIsRuted,
} from "../../redux/actions/ruteAction";

const Wilayah = () => {
  const [modal, setModal] = useState({
    isOpen: false,
    isAddWilayah: false,
    isAddPetugas: false,
    isListPetugas: false,
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const { auth, wilayah, petugasAndRoles } = useSelector((state) => state);

  useEffect(() => {
    if (auth.token) {
      dispatch(getWilayah({ auth, setLoading }));
      dispatch(getUsersAndRoles({ auth, setLoading }));
    }
  }, [dispatch, auth.token]);

  const handleResetPetugasRute = () => {
    if (
      window.confirm(`Apakah anda yakin ingin Meng-reset semua role petugas?`)
    ) {
      if (auth.token) {
        dispatch(patchAllIsRuted({ auth }));
        dispatch(deleteAllUserRute({ auth }));
      }
    }
  };

  const handleDeleteAllwilayah = () => {
    if (window.confirm(`Apakah anda yakin ingin meng-hapus semua wilayah?`)) {
      if (auth.token) {
        dispatch(patchAllIsRuted({ auth }));
        dispatch(deleteAllUserRute({ auth }));
        dispatch(deleteAllWilayah({ auth }));
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className=" w-full max-w-5xl max-h-screen ">
        <h2 className="my-4 font-semibold text-xl">DASHBOARD</h2>
        <DashboardNav />

        <div className="p-2 mt-6 rounded shadow text-sm ">
          {/* Jadi Component Button */}
          <div className="flex justify-between w-full">
            <button
              onClick={() =>
                setModal({
                  isOpen: true,
                  isAddWilayah: true,
                  isAddPetugas: false,
                  isListPetugas: false,
                })
              }
              className="items-center space-x-2 cursor-pointer flex p-2 px-6 border rounded-md border-orange-400 hover:bg-orange-400 hover:text-white h-10"
            >
              <p>Tambah wilayah</p>
              <PlusCircleIcon className=" h-5" />
            </button>

            <div className="items-center space-y-2 self-end">
              <button
                onClick={handleDeleteAllwilayah}
                className="items-center space-x-2 cursor-pointer flex p-2 px-6 border rounded-md border-red-500 hover:bg-red-500 hover:text-white"
              >
                <p>Reset Wilayah</p>
                <TrashIcon className=" h-5" />
              </button>
              <button
                onClick={handleResetPetugasRute}
                className="items-center space-x-2 cursor-pointer flex p-2 px-6 border rounded-md border-red-500 hover:bg-red-500 hover:text-white "
              >
                <p>Reset Rute</p>
                <TrashIcon className=" h-5" />
              </button>
            </div>
          </div>

          {/* Jadi Component wilayah Data */}

          <div className="mt-4 space-y-4">
            {wilayah?.wilayah?.map((item, index) => (
              <div
                key={index}
                className="w-full border p-2 rounded-md justify-between items-center flex"
              >
                <div className="w-full space-y-2">
                  <p>
                    {item.wilayahAwal} - {item.wilayahAkhir}
                  </p>
                  <p className="text-xs text-gray-500">{item.alamat}</p>
                </div>
                <div className="space-y-2">
                  <UserAddIcon
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        isAddWilayah: false,
                        isAddPetugas: true,
                        isListPetugas: false,
                        wilayahId: item._id,
                      })
                    }
                    className=" h-5 hover:text-orange-400 cursor-pointer hover:-skew-y-12 transition text-gray-500"
                  />
                  <UserGroupIcon
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        isAddWilayah: false,
                        isAddPetugas: false,
                        isListPetugas: true,
                        wilayahId: item._id,
                      })
                    }
                    className=" h-5 hover:text-orange-400 cursor-pointer hover:skew-x-12 transition text-gray-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {modal.isOpen && <WilayahModal modal={modal} setModal={setModal} />}

        {loading && <LoadingComponent height={"400px"} />}
      </div>
    </div>
  );
};

export default Wilayah;
