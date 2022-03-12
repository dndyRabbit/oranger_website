import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardNav from "../../components/DashboardNav";
import Nav from "../../components/Nav";
import { getAllUser } from "../../redux/actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllUser({ auth }));
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className=" w-full max-w-5xl ">
        <h2 className="my-4 font-semibold text-xl">DASHBOARD</h2>
        <DashboardNav />
      </div>
    </div>
  );
};

export default Dashboard;
