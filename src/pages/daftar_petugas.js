import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Table from "../components/DaftarPetugasTabel";
import TabelFiter from "../components/TabelFiter";
import { useDispatch, useSelector } from "react-redux";

import { PlusCircleIcon } from "@heroicons/react/outline";

import { getAllUser, getAllUserNotVerified } from "../redux/actions/userAction";
import DaftarPetugasModal from "../components/Modal";

const DaftarPetugas = () => {
  const [search, setSearch] = useState(""); // put in redux later

  const { auth, user, userNotVerified } = useSelector((state) => state);

  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllUser({ auth }));
    dispatch(getAllUserNotVerified({ auth }));
  }, [dispatch]);

  console.log(user);
  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className="w-full max-w-5xl ">
        <h2 className="my-4 font-semibold text-xl">DAFTAR PETUGAS</h2>
        <div className="p-2 mt-6 rounded shadow bg-white">
          {/* Filter Component  */}
          <div className="flex w-full justify-between mb-5 items-center">
            <TabelFiter search={search} setSearch={setSearch} />
            <p className="text-sm">{`Pasukan Oranye: ${user?.petugas?.length}  dari 79`}</p>
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 hover:border hover:border-orange-200 active:scale-90  text-orange-500 shadow-md rounded-full text-sm"
            >
              <p>Tambah Petugas</p>
              <PlusCircleIcon className="h-5 " />
            </button>
          </div>

          <Table
            dataTable={user.petugas}
            search={search}
            setSearch={setSearch}
          />
        </div>
      </div>
      {isOpen && (
        <DaftarPetugasModal
          userNotVerified={userNotVerified?.petugasNotVerified}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default DaftarPetugas;
