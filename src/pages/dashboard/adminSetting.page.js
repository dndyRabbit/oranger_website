import React, { useEffect, useState } from "react";

import Nav from "../../components/Nav";

import { useDispatch, useSelector } from "react-redux";

import AdminSettingTable from "../../components/AdminSetting.table";

const AdminSettings = () => {
  const dispatch = useDispatch();
  const { auth, admin } = useSelector((state) => state);
  return auth?.user?.root ? (
    <div className="flex flex-col items-center">
      <Nav />
      <div className=" w-full max-w-5xl max-h-screen ">
        <h2 className="my-4 font-semibold text-xl">ADMIN SETTING</h2>
        <div className="p-2 mt-6 rounded shadow bg-white ">
          <AdminSettingTable
            data={admin?.admin?.data}
            dispatch={dispatch}
            auth={auth}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <Nav />
      <div className=" w-full max-w-5xl max-h-screen ">
        <h2 className="my-4 font-semibold text-xl">ADMIN SETTING</h2>
        <div className="p-2 mt-6 rounded shadow bg-white ">
          <h1 className="text-2xl font-bold">
            Anda Bukan Tidak Mempunyai Hak Akses Mohon Kembali Ke Beranda.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
