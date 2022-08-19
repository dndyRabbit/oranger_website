import React, { useEffect, useState } from "react";

import DashboardNav from "../../../components/DashboardNav";
import Nav from "../../../components/Nav";
import PermissionNav from "../../../components/PermissionNav";

import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TabelFiter from "../../../components/TabelFiter";

import { LoadingComponent } from "../../../components/LoadingBar";
import PreviewImageModal from "../../../components/dashboard/PreviewImageModal";
import PermissionTabel from "../../../components/dashboard/permissionTabel";
import { getAllPermission } from "../../../redux/actions/permissionAction";

const Submission = () => {
  const [pickDate, setPickDate] = useState(new Date());
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("");

  const dispatch = useDispatch();
  const { auth, permission } = useSelector((state) => state);

  const [modal, setModal] = useState({
    isOpen: false,
    img: "",
  });

  const today = format(new Date(new Date()), "yyyy-MM-dd");

  useEffect(() => {
    if (auth.token) dispatch(getAllPermission({ auth }));
  }, [auth.token, dispatch]);

  console.log(permission);

  const handleChangeDate = (e) => {
    const newDate = format(new Date(e), "yyyy-MM-dd");

    setPickDate(newDate);
  };
  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className=" w-full max-w-5xl max-h-screen ">
        <h2 className="my-4 font-semibold text-xl">DASHBOARD</h2>
        <DashboardNav />

        <div className="p-2 mt-6 rounded shadow bg-white ">
          <PermissionNav />
          <div className="flex justify-between my-auto space-x-2  w-full mb-5">
            <TabelFiter search={search} setSearch={setSearch} />

            {/* Date Filter */}
            <div className="flex items-center space-x-2 -mt-4 text-sm">
              <p>Tanggal: </p>
              <DatePicker
                placeholderText="Cari tanggal..."
                className="border p-1 rounded-full  px-2"
                value={pickDate}
                onChange={handleChangeDate}
                search={search}
              />
            </div>
          </div>

          <PermissionTabel
            dataTable={permission?.permission}
            search={search}
            setModal={setModal}
          />
        </div>

        {modal.isOpen && (
          <PreviewImageModal modal={modal} setModal={setModal} />
        )}

        {/* {alert.loading && <LoadingComponent height={"400px"} />} */}
      </div>
    </div>
  );
};

export default Submission;
