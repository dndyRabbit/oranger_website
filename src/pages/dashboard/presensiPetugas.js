import React, { useEffect, useState, useRef } from "react";

import DashboardNav from "../../components/DashboardNav";
import Nav from "../../components/Nav";

import { useDispatch, useSelector } from "react-redux";
import {
  getAbsenByDate,
  patchPetugasAbsen,
  postPetugasAbsen,
} from "../../redux/actions/absenAction";

import { format } from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AbsenTabel from "../../components/dashboard/AbsenTabel";
import TabelFiter from "../../components/TabelFiter";

import { XCircleIcon } from "@heroicons/react/outline";
import { LoadingComponent } from "../../components/LoadingBar";
import PreviewImageModal from "../../components/dashboard/PreviewImageModal";
import DropdownFilter from "../../components/DropdownFilter";
import { toast } from "react-toastify";

const PresensiPetugas = () => {
  const [search, setSearch] = useState("");
  const [presensi, setPresensi] = useState("");
  const [select, setSelect] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const [pickDate, setPickDate] = useState(new Date());
  const [modal, setModal] = useState({
    isOpen: false,
    img: "",
  });
  const [additional, setAdditional] = useState({
    newData: null,
    x: null,
    y: null,
    idTabel: "presensi-petugas-table",
    timezone: format(new Date(Date.now()), "yyyy-MM-dd"),
  });

  const focusInput = useRef(new Map()).current;

  const { auth, absen, alert, petugasAndRolesAbsensi, petugasNotRoled } =
    useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.token) {
      dispatch(getAbsenByDate({ date: additional.timezone, auth }));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    const newData = petugasAndRolesAbsensi?.petugasAndRolesAbsensi?.map(
      (item) => {
        const newItem = {
          userId: item?.userId?._id,
          role: item?.role,
          statusAbsen: "Belum Absen",
          photo: "",
          photo2: "",
          absenIn: "",
          absenOut: "",
        };
        return newItem;
      }
    ); // ini untuk ngepost data petugas setiap hari

    // Jumlah petugas yng sudah melakukan absensi
    const x = absen?.absensi?.petugasAbsensi?.filter((val) => {
      if (val.statusAbsen.includes("Hadir")) {
        return val;
      }
    });
    //Jumlah seluruh petugas
    const y = absen?.absensi?.petugasAbsensi;

    //Apakah data tersebut sudah ada pada tanggal sekarang
    const isDataExist = absen?.absensi;

    setAdditional({
      ...additional,
      newData,
      x,
      y,
      isDataExist,
    });
  }, []);

  const handleGetAllPetugasData = (e) => {
    if (petugasNotRoled?.petugasNotRoled?.length > 0) {
      toast.warn(
        `Ada ${petugasNotRoled?.petugasNotRoled?.length} petugas yang memiliki pekerjaan.`
      );
      toast.warn("Mohon memilih pekerjaan petugas terlebih dahulu.");
    } else {
      if (
        window.confirm(
          `Apakah anda ingin membuat absensi?\npada tanggal ${additional.timezone}`
        )
      ) {
        dispatch(
          postPetugasAbsen({
            auth,
            newData: additional.newData,
            date: additional.timezone,
          })
        );
      }
    }
  };

  const handleChangeDate = (e) => {
    const newDate = format(new Date(e), "yyyy-MM-dd");
    dispatch(getAbsenByDate({ date: newDate, auth }));
    setPickDate(newDate);
  };

  const handleChangeStatus = ({ userId, newStatusAbsen }) => {
    dispatch(
      patchPetugasAbsen({
        auth,
        userId,
        newStatusAbsen,
        date: additional.timezone,
      })
    );
  };

  return (
    <div className="flex flex-col items-center text-base">
      <Nav />
      <div className=" w-full max-w-5xl max-h-screen ">
        <h2 className="my-4 font-semibold text-xl">DASHBOARD</h2>
        <DashboardNav />
        <div className="p-2 mt-6 rounded shadow bg-white space-y-2">
          {additional.isDataExist ? (
            <div className="flex justify-between my-auto space-x-2  w-full mb-5">
              <TabelFiter
                search={search}
                setSearch={setSearch}
                presensi={presensi}
                select={select}
              />

              <DropdownFilter
                select={select}
                setSelect={setSelect}
                search={search}
                presensi={presensi}
              />

              {/* Sorting Filter */}
              <div className="flex items-center space-x-2 -mt-4 text-sm">
                <p>Sort: </p>
                <div className="flex items-center space-x-2 text-center text-sm">
                  <button
                    className="px-2 border bg-green-100 text-green-400 rounded-full"
                    onClick={() => setPresensi("Hadir")}
                    disabled={search || select ? true : false}
                  >
                    Hadir
                  </button>
                  <button
                    className="px-2 border bg-yellow-100 text-yellow-500 rounded-full"
                    onClick={() => setPresensi("Belum Absen")}
                    disabled={search || select ? true : false}
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

              {/* Date Filter */}
              <div className="flex items-center space-x-2 -mt-4 text-sm">
                <p>Tanggal: </p>
                <DatePicker
                  placeholderText="Cari tanggal..."
                  className="border p-1 rounded-full  px-2 w-[80%]"
                  value={pickDate}
                  onChange={handleChangeDate}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-between my-auto space-x-2  w-full mb-5">
              {/* buat Daftar absensi */}
              <div className="flex flex-col items-center text-end text-sm">
                <button
                  className={`px-2 border rounded-md ${
                    additional.isDataExist
                      ? "text-gray-100 bg-gray-700"
                      : "hover:scale-105 transition hover:bg-orange-100"
                  }`}
                  onClick={handleGetAllPetugasData}
                  disabled={additional.isDataExist ? true : false}
                >
                  Buat Daftar Absensi
                </button>

                <div className="text-xs flex">
                  Tanggal:{" "}
                  <p className="text-xs font-medium">{additional.timezone}</p>
                </div>
              </div>
              {/* Date Filter */}
              <div className="flex items-center space-x-2 -mt-4 text-sm">
                <p>Tanggal: </p>
                <DatePicker
                  placeholderText="Cari tanggal..."
                  className="border p-1 rounded-full  px-2 w-[80%]"
                  value={pickDate}
                  onChange={handleChangeDate}
                />
              </div>
            </div>
          )}

          {additional.y && (
            <div className="flex items-center mb-2 -mt-6 text-sm self-center justify-center">
              <div className="flex flex-col items-center text-end text-sm">
                <p className="text-xs text-gray-400">
                  {additional?.x?.length} dari {additional?.y?.length} Pasukan
                  Oranye
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
            setModal={setModal}
            select={select}
            focusInput={focusInput}
            handleChangeStatus={handleChangeStatus}
            idTabel={additional.idTabel}
            setIsEdit={setIsEdit}
            isEdit={isEdit}
          />
        </div>

        {modal.isOpen && (
          <PreviewImageModal modal={modal} setModal={setModal} />
        )}

        {alert.loading && <LoadingComponent height={"400px"} />}
      </div>
    </div>
  );
};

export default PresensiPetugas;
