import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import DropdownChangeStatusAbsen from "../DropdownChangeStatusAbsen";

const AbsenTabelContent = ({
  person,
  index,
  setModal,
  handleChangeStatus,
  img,
}) => {
  const [select, setSelect] = useState("");

  return (
    <tr key={index}>
      <td className="px-6 py-4  text-sm text-gray-500">{++index}</td>
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
            <div className="text-xs font-medium text-gray-900">
              {person.userId.fullName}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4  text-xs text-orange-500">{person.role}</td>
      <td className="px-6 py-4  text-gray-500">
        <span
          className={`px-2 inline-flex text-xs  font-semibold rounded-full ${
            person.absenIn
              ? "bg-yellow-100 text-green-800"
              : "bg-green-100 text-yellow-500"
          } `}
        >
          {person.absenIn ? person.absenIn : "Belum Absen"}
        </span>
      </td>
      <td className="px-6 py-4  text-sm text-gray-500">
        <span
          className={`px-2 inline-flex text-xs font-semibold rounded-full ${
            person.absenOut
              ? "bg-yellow-100 text-green-800"
              : "bg-green-100 text-yellow-500"
          } `}
        >
          {person.absenOut ? person.absenOut : "Belum Absen"}
        </span>
      </td>

      <td className="px-6 py-4  text-xs text-gray-500">
        <div className="flex-shrink-0 h-12 w-10">
          <img
            className="h-12 w-10 rounded-md cursor-pointer"
            src={person.photo ? person.photo : img}
            alt=""
            onClick={() =>
              setModal({
                isOpen: true,
                img: person.photo ? person.photo : img,
              })
            }
          />
        </div>
      </td>

      <td className="px-6 py-8 text-sm text-gray-500 flex items-center space-x-2">
        <DropdownChangeStatusAbsen
          select={select}
          setSelect={setSelect}
          statusAbsen={person.statusAbsen}
          handleChangeStatus={handleChangeStatus}
          userId={person.userId._id}
        />
      </td>

      {/* <td className="px-6 py-8 text-sm text-gray-500 flex items-center space-x-2">
        <input
          type="text"
          name="statusAbsen"
          onClick={() => setKey(person.userId._id)}
          className={`px-2 inline-flex text-xs  font-semibold rounded-full w-24 ${
            person.statusAbsen
              ? "bg-yellow-100 text-green-800"
              : "bg-green-100 text-yellow-500"
          } `}
          placeholder={person.statusAbsen}
          value={status[`${person.userId._id}`]?.value}
          onChange={(event) =>
            handleChangeInput({
              event,
              id: person.userId._id,
            })
          }
        />
        {key === person.userId._id && (
          <CheckCircleIcon
            className={`h-4 text-green-500 cursor-pointer hover:scale-100`}
            onClick={() =>
              handleChangeStatus({
                _id: person.userId._id,
              })
            }
          />
        )}
      </td> */}
    </tr>
  );
};

export default AbsenTabelContent;
