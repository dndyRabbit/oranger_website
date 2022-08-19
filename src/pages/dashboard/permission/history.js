import React, { useEffect, useState } from "react";

import DashboardNav from "../../../components/DashboardNav";
import Nav from "../../../components/Nav";
import PermissionNav from "../../../components/PermissionNav";

import { useDispatch, useSelector } from "react-redux";

import { format } from "date-fns";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TabelFiter from "../../../components/TabelFiter";
import PreviewImageModal from "../../../components/dashboard/PreviewImageModal";
import { getAllPermissionApproved } from "../../../redux/actions/permissionAction";
import HistoryTabel from "../../../components/dashboard/HistoryTabel";

const History = () => {
  const [pickDate, setPickDate] = useState(new Date());
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { auth, permissionApproved } = useSelector((state) => state);

  const [modal, setModal] = useState({
    isOpen: false,
    img: "",
  });

  useEffect(() => {
    if (auth.token) dispatch(getAllPermissionApproved({ auth }));
  }, [auth.token, dispatch]);

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

          <HistoryTabel
            dataTable={permissionApproved?.permissionApproved}
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

export default History;
