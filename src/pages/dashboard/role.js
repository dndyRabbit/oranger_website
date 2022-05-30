import React, { useEffect, useState } from "react";

import DashboardNav from "../../components/DashboardNav";
import Nav from "../../components/Nav";

import { useDispatch, useSelector } from "react-redux";

import {
  deleteAllRole,
  getAllIsNotRoled,
  updateAllIsRoled,
} from "../../redux/actions/roleAction";

import { LoadingComponent } from "../../components/LoadingBar";
import { schedule } from "../../helper/datas";
import Duty from "../../components/dashboard/Schedule";
import RoleModal from "../../components/dashboard/RoleModal";
import {
  deleteAllUserRute,
  patchAllIsRuted,
} from "../../redux/actions/ruteAction";

const Penjadwalan = () => {
  const [isOpen, setIsOpen] = useState({
    driver: false,
    timSiaga: false,
    kantor: false,
  });

  const [modal, setModal] = useState({
    isOpen: false,
  });

  const dispatch = useDispatch();

  const { auth, petugasNotRoled } = useSelector((state) => state);

  useEffect(() => {
    if (auth.token) dispatch(getAllIsNotRoled({ auth }));
  }, [dispatch, auth.token]);

  const handleResetUserRole = () => {
    if (
      window.confirm(`Apakah anda yakin ingin Meng-reset semua role petugas?`)
    ) {
      if (auth.token) {
        dispatch(patchAllIsRuted({ auth }));
        dispatch(deleteAllUserRute({ auth }));
        dispatch(updateAllIsRoled({ auth }));
        dispatch(deleteAllRole({ auth }));
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className=" w-full max-w-5xl max-h-screen ">
        <h2 className="my-4 font-semibold text-xl">DASHBOARD</h2>
        <DashboardNav />

        <Duty
          schedule={schedule}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setModal={setModal}
          handleResetUserRole={handleResetUserRole}
        />

        {modal.isOpen && (
          <RoleModal
            modal={modal}
            setModal={setModal}
            petugasNotRoled={petugasNotRoled?.petugasNotRoled}
          />
        )}

        {/* {alert.loading && <LoadingComponent height={"400px"} />} */}
      </div>
    </div>
  );
};

export default Penjadwalan;
