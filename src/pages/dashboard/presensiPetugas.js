import React, { useEffect, useState } from "react";

import DashboardNav from "../../components/DashboardNav";
import Nav from "../../components/Nav";

import { useDispatch, useSelector } from "react-redux";
import {
  getAbsenByDate,
  postPetugasAbsen,
} from "../../redux/actions/absenAction";
import { getAllUser } from "../../redux/actions/userAction";

import { format } from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AbsenTabel from "../../components/dashboard/AbsenTabel";
import TabelFiter from "../../components/TabelFiter";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/outline";
import { LoadingComponent } from "../../components/LoadingBar";

const PresensiPetugas = () => {
  const [search, setSearch] = useState("");
  const [presensi, setPresensi] = useState("");

  const [pickDate, setPickDate] = useState(new Date());

  const { auth, absen, alert, user } = useSelector((state) => state);

  const { tanggal, statusAbsen } = user;

  const dispatch = useDispatch();

  const timezone = format(new Date(new Date()), "yyyy-MM-dd");
  const newTanggal = format(new Date(tanggal), "yyyy-MM-dd");

  console.log(absen);

  useEffect(() => {
    if (auth.token) {
      dispatch(getAbsenByDate({ tanggal: timezone, auth }));
      dispatch(getAllUser({ auth }));
    }
  }, [dispatch, auth.token]);

  const newData = user?.petugas?.map((item) => {
    const newItem = {
      avatar: item.avatar,
      namaLengkap: item.namaLengkap,
      _id: item._id,
      statusAbsen,
      tanggal: newTanggal,
      // time: time
    };
    return newItem;
  }); // ini untuk ngepost data petugas setiap hari

  const handleGetAllPetugasData = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        `Apakah anda ingin membuat absensi?\npada tanggal ${timezone}`
      )
    ) {
      dispatch(
        postPetugasAbsen({ auth, newData, uploaded: true, tanggal: newTanggal })
      );
    }
  };

  const handleChangeDate = (e) => {
    const newDate = format(new Date(e), "yyyy-MM-dd");
    dispatch(getAbsenByDate({ tanggal: newDate, auth }));
    setPickDate(newDate);
  };

  const handleHadirFilter = () => {
    setPresensi("Hadir");
  };

  const handleBelumAbsenFilter = () => {
    setPresensi("Belum Absen");
  };

  // Jumlah petugas yng sudah melakukan absensi
  const x = absen?.absensi?.petugasAbsensi?.filter((val) => {
    if (val.statusAbsen.includes("Hadir")) {
      return val;
    }
  });
  //Jumlah seluruh petugas
  const y = absen?.absensi?.petugasAbsensi;

  //Apakah data tersebut sudah ada pada tanggal sekarang
  const isDataExist = absen.absensi?.isUpload;

  return (
    <div className="flex flex-col items-center text-base">
      <Nav />
      <div className=" w-full max-w-5xl max-h-screen ">
        <h2 className="my-4 font-semibold text-xl">DASHBOARD</h2>
        <DashboardNav />
        <div className="p-2 mt-6 rounded shadow bg-white ">
          <div className="flex justify-between my-auto space-x-2  w-full mb-5">
            <TabelFiter
              search={search}
              setSearch={setSearch}
              presensi={presensi}
            />

            {/* Date Filter */}
            <div className="flex items-center space-x-2 -mt-4 text-sm">
              <p>Tanggal: </p>
              <DatePicker
                placeholderText="Cari tanggal..."
                className="border p-1 rounded-full  px-2"
                value={pickDate}
                onChange={handleChangeDate}
              />
            </div>

            {/* Sorting Filter */}
            <div className="flex items-center space-x-2 -mt-4 text-sm">
              <p>Sort: </p>
              <div className="flex items-center space-x-2 text-center text-sm">
                <button
                  className="px-2 border bg-green-100 text-green-400 rounded-full"
                  onClick={handleHadirFilter}
                >
                  Hadir
                </button>
                <button
                  className="px-2 border bg-yellow-100 text-yellow-500 rounded-full"
                  onClick={handleBelumAbsenFilter}
                >
                  Belum Absen
                </button>
                {presensi && (
                  <XCircleIcon
                    className={`h-5 text-gray-500 cursor-pointer`}
                    onClick={() => setPresensi("")}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex flex-col items-center text-end text-sm">
                <button
                  className={`px-2 border rounded-md ${
                    isDataExist
                      ? "text-gray-100 bg-gray-700"
                      : "hover:scale-105 transition hover:bg-orange-100"
                  }`}
                  onClick={handleGetAllPetugasData}
                  disabled={isDataExist ? true : false}
                >
                  Buat Daftar Absensi
                </button>

                <div className="text-xs flex">
                  Tanggal: <p className="text-xs font-medium">{timezone}</p>
                </div>
              </div>
              {isDataExist ? (
                <CheckCircleIcon className="h-5 text-green-500" />
              ) : (
                <XCircleIcon className="h-5 text-gray-500" />
              )}
            </div>
          </div>

          {y && (
            <div className="flex items-center mb-2 -mt-6 text-sm self-center justify-center">
              <div className="flex flex-col items-center text-end text-sm">
                <p className="text-xs text-gray-400">
                  {x?.length} dari {y?.length} Pasukan Oranye
                </p>
                <p className="font-medium">Hadir</p>
              </div>
            </div>
          )}

          <AbsenTabel
            auth={auth}
            dataTable={absen}
            search={search}
            presensi={presensi}
          />
        </div>

        {alert.loading && <LoadingComponent height={"400px"} />}
      </div>
    </div>
  );
};

export default PresensiPetugas;
