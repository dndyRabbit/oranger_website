import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteRute,
  getRute,
  patchUserIsAdd,
  postRute,
} from "../../redux/actions/ruteAction";
import TabelTambahPetugas from "./TabelTambahPetugas";

export default function ModalTambahPetugas({
  isModal,
  setIsModal,
  newPetugas,
}) {
  const dispatch = useDispatch();
  const { auth, rute } = useSelector((state) => state);

  const { isPop, key, title, wilayah, _wilayahId } = isModal;

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (_wilayahId) {
      dispatch(getRute({ auth, _wilayahId }));
    }
  }, [dispatch, _wilayahId]);

  const handleAddButton = (person) => {
    const { avatar, namaLengkap } = person;
    console.log("this is userId", person._id);

    dispatch(
      postRute({
        id: person._id,
        alamatRute: wilayah?.alamat,
        wilayahId: wilayah?.id,
        latlng: wilayah?.latlng,
        namaWilayah: wilayah?.namaWilayah,
        avatar,
        isAdd: true,
        namaLengkap,
        auth,
      })
    );
    dispatch(
      patchUserIsAdd({
        auth,
        id: person._id,
        isAdd: true,
      })
    );
  };

  const handleDeleteButton = (person) => {
    console.log(person);
    dispatch(
      patchUserIsAdd({
        auth,
        id: person.userId,
        isAdd: false,
      })
    );
    dispatch(deleteRute({ id: person._id, auth }));
  };

  return (
    <Transition.Root show={isPop} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setIsModal}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 ">
          <Transition.Child as={Fragment}>
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          {/* ------------------------- */}
          <Transition.Child as={Fragment}>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:max-h-5xl sm:h-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:px-4">
                <div className="sm:items-start">
                  {/* This is where you edit inside the modal */}
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left overflow space-y-4">
                    <h3 className="font-bold text-xl items-center">{title}</h3>
                    {/* Table Tambah Petugas */}
                    <TabelTambahPetugas
                      handleDeleteButton={handleDeleteButton}
                      handleAddButton={handleAddButton}
                      newPetugas={newPetugas}
                      rute={rute}
                      keys={key}
                    />
                  </div>
                  {/* ------------------------ */}
                </div>
              </div>
              <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModal(false)}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
