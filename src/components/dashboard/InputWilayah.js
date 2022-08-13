import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postWilayah } from "../../redux/actions/wilayahAction";
import { toast } from "react-toastify";

const InputWilayah = () => {
  const initialState = {
    wilayahAwal: "",
    wilayahAkhir: "",
    alamat: "",
    latitude: "",
    longitude: "",
  };
  const [state, setState] = useState(initialState);
  const { wilayahAwal, wilayahAkhir, alamat, latitude, longitude } = state;

  const { auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    if (!wilayahAwal || !wilayahAkhir || !alamat) {
      return toast.warning("Mohon isi lengkap data wilayah.");
    }

    dispatch(postWilayah({ auth, state }));
    setState(initialState);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div className="mt-10 sm:mt-0">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Tambah Wilayah
            </h3>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-3">
          <form action="#" onSubmit={handleSubmit}>
            <div className="shadow-md overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Wilayah awal
                    </label>
                    <input
                      type="text"
                      name="wilayahAwal"
                      value={wilayahAwal}
                      onChange={handleChangeInput}
                      className="mt-1 px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full border sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Wilayah akhir
                    </label>
                    <input
                      type="text"
                      name="wilayahAkhir"
                      value={wilayahAkhir}
                      onChange={handleChangeInput}
                      className="mt-1 border px-2  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Alamat
                    </label>
                    <input
                      type="text"
                      name="alamat"
                      value={alamat}
                      onChange={handleChangeInput}
                      className="mt-1 border px-2  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-3 lg:col-span-3">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Latitude
                    </label>
                    <input
                      type="text"
                      name="latitude"
                      value={latitude}
                      onChange={handleChangeInput}
                      className="mt-1 px-2   border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-3 lg:col-span-3">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Longitude
                    </label>
                    <input
                      type="text"
                      name="longitude"
                      value={longitude}
                      onChange={handleChangeInput}
                      className="mt-1 px-2   border focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InputWilayah;
