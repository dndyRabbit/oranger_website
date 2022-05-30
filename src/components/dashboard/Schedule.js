import React from "react";
import {
  ChevronDownIcon,
  UserAddIcon,
  UserGroupIcon,
  TrashIcon,
} from "@heroicons/react/outline";

const Duty = ({
  schedule,
  isOpen,
  setIsOpen,
  setModal,
  handleResetUserRole,
}) => {
  return (
    <div className="mt-6 rounded shadow bg-white  p-2 flex flex-col ">
      <button
        className="self-end flex  space-x-2 text-sm p-2 px-4 border border-red-400 rounded-md hover:text-white hover:bg-red-500 transition mb-2"
        onClick={handleResetUserRole}
      >
        <p>Reset Role</p>
        <TrashIcon className=" h-5" />
      </button>

      {schedule.map((item, index) => {
        const handleClick = (label) => {
          if (label === "Driver") {
            setIsOpen({ driver: !isOpen.driver });
          } else if (label === "Tim Siaga") {
            setIsOpen({ timSiaga: !isOpen.timSiaga });
          } else if (label === "Kantor") {
            setIsOpen({ kantor: !isOpen.kantor });
          }
        };
        return (
          <div key={index} className=" mb-5 shadow p-2 text-sm rounded-md">
            <div
              className={`flex justify-between  space-x-2 w-full  rounded-md items-center ${
                item.children && "hover:bg-orange-50 cursor-pointer"
              }`}
              onClick={() => handleClick(item.label)}
            >
              <p>{item.label}</p>

              {item.children ? (
                <ChevronDownIcon className="h-5 p rounded-full  text-gray-500  hover:text-orange-500 cursor-pointer" />
              ) : (
                <div className="items-center space-y-2">
                  <UserAddIcon
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        label: `Tambah Petugas di ${item.label}`,
                        value: "tambahPetugas",
                        role: item.label,
                      })
                    }
                    className="h-5  p rounded-full  text-gray-500  hover:text-orange-500 cursor-pointer"
                  />
                  <UserGroupIcon
                    onClick={() =>
                      setModal({
                        isOpen: true,
                        label: `List Petugas ${item.label}`,
                        value: "listPetugas",
                        role: item.label,
                      })
                    }
                    className="h-5  p rounded-full  text-gray-500  hover:text-orange-500 cursor-pointer"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4 text-sm">
              {isOpen.driver &&
                item.label === "Driver" &&
                item.children.map((name, index) => (
                  <div
                    key={index}
                    className="flex border border-orange-400 mt-4 p-2 justify-between rounded-md items-center"
                  >
                    <p>{name.name}</p>
                    <div className="space-y-2 items-center">
                      <UserAddIcon
                        onClick={() =>
                          setModal({
                            isOpen: true,
                            label: `Tambah Petugas di ${item.label} ${name.name}`,
                            value: "tambahPetugas",
                            role: item.label + " " + name.name,
                          })
                        }
                        className="h-5  p rounded-full  text-gray-500  hover:text-orange-500 cursor-pointer"
                      />
                      <UserGroupIcon
                        onClick={() =>
                          setModal({
                            isOpen: true,
                            label: `List Petugas ${item.label} ${name.name}`,
                            value: "listPetugas",
                            role: item.label + " " + name.name,
                          })
                        }
                        className="h-5  p rounded-full  text-gray-500  hover:text-orange-500 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              {isOpen.timSiaga &&
                item.label === "Tim Siaga" &&
                item.children.map((name, index) => (
                  <div
                    key={index}
                    className="flex border border-orange-400 mt-4 p-2 justify-between rounded-md items-center"
                  >
                    <p>{name.name}</p>
                    <div className="space-y-2 items-center">
                      <UserAddIcon
                        onClick={() =>
                          setModal({
                            isOpen: true,
                            label: `Tambah Petugas di ${name.name}`,
                            value: "tambahPetugas",
                            role: name.name,
                          })
                        }
                        className="h-5  p rounded-full  text-gray-500  hover:text-orange-500 cursor-pointer"
                      />
                      <UserGroupIcon
                        onClick={() =>
                          setModal({
                            isOpen: true,
                            label: `List Petugas ${name.name}`,
                            value: "listPetugas",
                            role: name.name,
                          })
                        }
                        className="h-5  p rounded-full  text-gray-500  hover:text-orange-500 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              {isOpen.kantor &&
                item.label === "Kantor" &&
                item.children.map((name, index) => (
                  <div
                    key={index}
                    className="flex border border-orange-400 mt-4 p-2 justify-between rounded-md items-center"
                  >
                    <p>{name.name}</p>
                    <div className="space-y-2 items-center">
                      <UserAddIcon
                        onClick={() =>
                          setModal({
                            isOpen: true,
                            label: `Tambah Petugas di ${item.label} ${name.name}`,
                            value: "tambahPetugas",
                            role: name.name,
                          })
                        }
                        className="h-5  p rounded-full  text-gray-500  hover:text-orange-500 cursor-pointer"
                      />
                      <UserGroupIcon
                        onClick={() =>
                          setModal({
                            isOpen: true,
                            label: `List Petugas ${item.label} ${name.name}`,
                            value: "listPetugas",
                            role: name.name,
                          })
                        }
                        className="h-5  p rounded-full  text-gray-500  hover:text-orange-500 cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Duty;
