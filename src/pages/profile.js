import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { checkImage } from "../utils/imageUpload";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { updateProfileUser } from "../redux/actions/profileAction";

const Profile = () => {
  const initialState = {
    namaLengkap: "",
    noKTP: "",
    jenisKelamin: "",
    alamatLengkap: "",
    tanggalLahir: "",
    noHandphone: "",
  };

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const [userData, setUserData] = useState(initialState);
  const [avatar, setAvatar] = useState("");
  const {
    namaLengkap,
    noKTP,
    jenisKelamin,
    alamatLengkap,
    tanggalLahir,
    noHandphone,
  } = userData;

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err },
      });
    console.log(file);
    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    dispatch(updateProfileUser({ userData, auth, avatar }));
  };

  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className=" w-full max-w-5xl ">
        <h2 className="my-4 font-semibold text-xl">PROFILE</h2>

        <div className="w-full bg-white shadow-lg  p-4 rounded-md">
          <form
            onSubmit={handleSubmit}
            action="submit"
            className="w-full space-y-2 "
          >
            <div className="flex flex-row w-full justify-between space-x-2">
              <div className="flex flex-col w-[400px]">
                <label>Nama Lengkap</label>
                <input
                  type="text"
                  name="namaLengkap"
                  placeholer={auth.user.namaLengkap}
                  className="p-2 bg-transparent border border-gray-300 rounded-md"
                  value={namaLengkap}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            {/* ---------------- */}
            <div className="flex flex-row w-full justify-between space-x-2">
              <div className="flex flex-col w-[400px]">
                <label>Email</label>
                <input
                  type="email"
                  className="p-2 bg-transparent border border-gray-300 rounded-md bg-gray-300 "
                  disabled={true}
                  value={auth.user.email}
                />
              </div>
              <div className="flex flex-col w-[400px]">
                <label>No.Handphone</label>
                <input
                  type="number"
                  placeholder={auth.user.noHandphone}
                  className="p-2 bg-transparent border border-gray-300 rounded-md "
                  name="noHandphone"
                  value={noHandphone}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            {/* ---------------- */}
            <div className="flex flex-row w-full justify-between space-x-2">
              <div className="flex flex-col w-[400px]">
                <label>Alamat Lengkap</label>
                <input
                  type="text"
                  placeholder={auth.user.alamatLengkap}
                  className="p-2 bg-transparent border border-gray-300 rounded-md"
                  name="alamatLengkap"
                  value={alamatLengkap}
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex flex-col w-[400px]">
                <label>No.KTP</label>
                <input
                  type="number"
                  placeholder={auth.user.noKTP}
                  className="p-2 bg-transparent border border-gray-300 rounded-md "
                  value={noKTP}
                  name="noKTP"
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            {/* ---------------- */}
            <div className="flex flex-row w-full justify-between space-x-2">
              <div className="flex flex-col w-[400px]">
                <label>Tanggal Lahir</label>
                <input
                  type="text"
                  placeholder={auth.user.tanggalLahir}
                  className="p-2 bg-transparent border border-gray-300 rounded-md"
                  name="tanggalLahir"
                  value={tanggalLahir}
                  onChange={handleChangeInput}
                />
              </div>
            </div>
            {/* ---------------- */}

            <div className="flex flex-row w-full justify-between space-x-2">
              <div className="flex flex-col w-[400px] space-y-2">
                <img
                  src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
                  alt="asdasd"
                  className="rounded-lg w-[150px] h-[200px]"
                />
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  accept="image/*"
                  className="p-2 px-4 border-gray-400 bg-gray-50 border  transition rounded-md"
                  onChange={handleChangePhoto}
                />
              </div>
              <div className="flex flex-col w-[400px]">
                <label>Jenis Kelamin</label>
                <input
                  type="text"
                  className="p-2 bg-transparent border border-gray-300 rounded-md "
                  name="jenisKelamin"
                  placeholder={auth.user.jenisKelamin}
                  onChange={handleChangeInput}
                  value={jenisKelamin}
                />
              </div>
            </div>

            <button className=" w-full p-2 px-4 border-orange-500 bg-orange-50 border rounded-lg hover:text-white hover:bg-orange-700 transition">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
