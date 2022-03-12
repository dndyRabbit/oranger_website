import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  TrashIcon,
  CheckIcon,
  InformationCircleIcon,
} from "@heroicons/react/outline";

import { useDispatch, useSelector } from "react-redux";
import { updateVerifikasiUser } from "../redux/actions/userAction";

export default function DaftarPetugasModal({
  isOpen,
  setIsOpen,
  userNotVerified,
}) {
  console.log(userNotVerified);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const cancelButtonRef = useRef(null);

  const handleTambahPetugas = (id) => {
    console.log(id);
    dispatch(updateVerifikasiUser({ auth, id }));
  };
  const handleInfoPetugas = () => {};

  const handleHapusPetugas = (id) => {
    dispatch(updateVerifikasiUser({ auth, id }));
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setIsOpen}
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
                    <h3 className="font-bold text-xl items-center">
                      Tambah Petugas
                    </h3>
                    {/* Map funtionally petugas pasukan oranye yang akan di tambahkan */}
                    {userNotVerified?.map((person) => (
                      <div
                        key={person._id}
                        className="flex space-x-2 items-center justify-between px-5 border-y border-gray-400 overflow-hidden"
                      >
                        <img
                          src={person.avatar}
                          alt="My Photos"
                          className="h-20 w-20 rounded-full"
                        />

                        <div className=" sm:space-x-2 items-center w-full text-sm sm:flex inline-block sm:space-y-0 space-y-2">
                          <div className=" space-y-2 sm:pr-4 border-r-2">
                            <p className="text-md text-black font-semibold">
                              {person.namaLengkap}
                            </p>
                            <p className="text-sm text-gray-500">
                              {person.jenisKelamin}
                            </p>
                          </div>
                          <div className=" space-y-2 sm:pr-4  border-r-2">
                            <p className="text-md text-black font-semibold">
                              Tanggal Lahir
                            </p>
                            <p className="text-sm text-gray-500">
                              {person.tanggalLahir}
                            </p>
                          </div>
                          <div className=" space-y-2 sm:pr-4  border-r-2">
                            <p className="text-md text-black font-semibold">
                              KTP
                            </p>
                            <p className="text-sm text-gray-500">
                              {person.noKTP}
                            </p>
                          </div>
                          <div className=" space-y-2 sm:pr-4  border-r-2">
                            <p className="text-md text-black font-semibold">
                              No.Handphone
                            </p>
                            <p className="text-sm text-gray-500">
                              {person.noHandphone}
                            </p>
                          </div>
                          <div className=" space-y-2 border-r-2">
                            <p className="text-md text-black font-semibold">
                              Alamat
                            </p>
                            <p className="text-sm text-gray-500">
                              {person.alamatLengkap}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <CheckIcon
                            onClick={() => handleTambahPetugas(person._id)}
                            className="h-9 cursor-pointer hover:border hover:rounded-full hover:bg-orange-400 p-2"
                          />
                          {/* <InformationCircleIcon
                            onClick={handleInfoPetugas}
                            className="h-9 cursor-pointer hover:border hover:rounded-full hover:bg-blue-100 p-2"
                          /> */}
                          <TrashIcon
                            onClick={() => handleHapusPetugas(person._id)}
                            className="h-9 cursor-pointer hover:border hover:rounded-full hover:bg-red-600 hover:text-white p-2"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ------------------------ */}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsOpen(false)}
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
