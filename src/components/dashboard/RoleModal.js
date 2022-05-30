import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";
import RoleTabel from "./RoleTabel";
import { ROLE_TYPES } from "../../redux/actions/roleAction";

export default function RoleModal({ modal, setModal, petugasNotRoled }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const cancelButtonRef = useRef(null);

  const handleClick = () => {
    setModal({ isOpen: false });
    dispatch({
      type: ROLE_TYPES.GET_SPESIFIC_ROLE,
      payload: {},
    });
  };

  return (
    <Transition.Root show={modal.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setModal}
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
                      {modal.label}
                    </h3>
                    {/* Map funtionally petugas pasukan oranye yang akan di tambahkan */}
                    <RoleTabel
                      petugasNotRoled={petugasNotRoled}
                      modal={modal}
                    />
                  </div>
                  {/* ------------------------ */}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleClick}
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
