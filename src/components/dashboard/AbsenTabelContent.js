import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import DropdownChangeStatusAbsen from "../DropdownChangeStatusAbsen";

const AbsenTabelContent = ({
  person,
  index,
  setModal,
  handleChangeStatus,
  img,
  setIsEdit,
  isEdit,
}) => {
  const [select, setSelect] = useState("");
  console.log(person, "PERSONN");

  return (
    <tr key={index}>
      <td className="px-6 py-4  text-sm text-gray-500">{++index}</td>
      <td className="px-6 py-4 ">
        <div className="text-xs font-medium text-gray-900">
          {person?.userId?.fullName}
        </div>
      </td>
      <td className="px-6 py-4  text-xs text-orange-500">{person?.role}</td>
      <td className="px-6 py-4  text-gray-500">
        <span
          className={`px-2 inline-flex text-xs  font-semibold rounded-full ${
            person?.absenIn
              ? "bg-yellow-100 text-green-800"
              : "bg-green-100 text-yellow-500"
          } `}
        >
          {person?.absenIn ? person?.absenIn : "Belum Absen"}
        </span>
      </td>

      <td className="px-6 py-4  text-xs text-gray-500">
        <div className="flex-shrink-0 h-12 w-10">
          <img
            className="h-12 w-10 rounded-md cursor-pointer"
            src={person?.photo ? person?.photo : img}
            alt=""
            onClick={() =>
              setModal({
                isOpen: true,
                img: person?.photo ? person?.photo : img,
              })
            }
          />
        </div>
      </td>
      <td className="px-6 py-4  text-sm text-gray-500">
        <span
          className={`px-2 inline-flex text-xs font-semibold rounded-full ${
            person?.absenOut
              ? "bg-yellow-100 text-green-800"
              : "bg-green-100 text-yellow-500"
          } `}
        >
          {person?.absenOut ? person?.absenOut : "Belum Absen"}
        </span>
      </td>

      <td className="px-6 py-4  text-xs text-gray-500">
        <div className="flex-shrink-0 h-12 w-10">
          <img
            className="h-12 w-10 rounded-md cursor-pointer"
            src={person?.photo2 ? person?.photo2 : img}
            alt=""
            onClick={() =>
              setModal({
                isOpen: true,
                img: person?.photo2 ? person?.photo2 : img,
              })
            }
          />
        </div>
      </td>

      <td className="px-6 py-6 text-sm text-gray-500 items-center space-x-2 ">
        {isEdit ? (
          <DropdownChangeStatusAbsen
            select={select}
            setSelect={setSelect}
            statusAbsen={person?.statusAbsen}
            handleChangeStatus={handleChangeStatus}
            userId={person?.userId?._id}
          />
        ) : (
          <p className="text-xs font-medium text-gray-900">
            {person?.statusAbsen}
          </p>
        )}
      </td>

      <td className="px-6  items-center text-center text-xs text-gray-500">
        {isEdit ? (
          <button
            className="font-bold hover:text-orange-400"
            onClick={() => setIsEdit(!isEdit)}
          >
            Done
          </button>
        ) : (
          <button className="font-bold" onClick={() => setIsEdit(!isEdit)}>
            Edit
          </button>
        )}
      </td>
    </tr>
  );
};

export default AbsenTabelContent;
