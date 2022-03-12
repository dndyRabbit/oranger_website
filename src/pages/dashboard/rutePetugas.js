import React, { useState, useEffect } from "react";

import DashboardNav from "../../components/DashboardNav";
import Nav from "../../components/Nav";
import RuteWilayahPetugas from "../../components/dashboard/RutePetugas";
import { getWilayah } from "../../redux/actions/wilayahAction";

import { getUserIsNotAdded } from "../../redux/actions/ruteAction";

import { useSelector, useDispatch } from "react-redux";
import ModalTambahPetugas from "../../components/dashboard/ModalTambahPetugas";

const RutePetugas = () => {
  const { auth, wilayah, userNotAdd } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isModal, setIsModal] = useState({
    isPop: false,
    title: "",
  });
  const [isList, setIsList] = useState(false);

  const wilayahs = wilayah?.wilayah?.marker;

  //Menambahkan isAdd ke data petugas

  useEffect(() => {
    if (auth.token) {
      dispatch(getWilayah({ auth }));
      dispatch(getUserIsNotAdded({ auth }));
    }
  }, [dispatch, auth.token]);

  console.log(userNotAdd);

  const handleTambahPetugas = ({ msg, modal, key, wilayah, _wilayahId }) => {
    //get rute data from database based on wilayahId

    setIsModal({ isPop: modal, title: msg, key, wilayah, _wilayahId });
  };

  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className="w-full max-w-5xl">
        <h2 className="my-4 font-semibold text-xl">DASHBOARD</h2>
        <DashboardNav />

        {/* Rute Petugas */}
        <RuteWilayahPetugas
          isList={isList}
          setIsList={setIsList}
          wilayahs={wilayahs}
          handleTambahPetugas={handleTambahPetugas}
          setIsModal={setIsModal}
        />

        {/* Modal Tambah Petugas */}
        {isModal && (
          <ModalTambahPetugas
            isModal={isModal}
            setIsModal={setIsModal}
            newPetugas={userNotAdd}
          />
        )}
      </div>
    </div>
  );
};

export default RutePetugas;
