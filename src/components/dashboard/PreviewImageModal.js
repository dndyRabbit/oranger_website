import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { XIcon } from "@heroicons/react/outline";

const PreviewImageModal = ({ modal, setModal }) => {
  const cancelButtonRef = useRef(null);

  console.log(modal);
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:max-h-5xl sm:h-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:px-4">
                <div className="sm:items-start">
                  {/* This is where you edit inside the modal */}

                  <img
                    src={modal.img}
                    alt="User"
                    className="w-[400px] rounded-md"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <XIcon
                  onClick={() => setModal(false)}
                  ref={cancelButtonRef}
                  className="absolute top-2 right-2 h-10 text-orange-500 cursor-pointer "
                />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default PreviewImageModal;
