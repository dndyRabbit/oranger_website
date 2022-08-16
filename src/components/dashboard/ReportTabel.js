import React from "react";

const ReportTabel = ({ dataTable, select, search, setModal }) => {
  console.log(search);
  console.log(select);

  const img =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1200px-Unknown_person.jpg";
  return (
    <div className="flex flex-col">
      <div className="-my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle min-w-full sm:px-6 lg:px-8">
          <div className="shadow  overflow-auto border-b border-gray-200 max-h-[400px] -scroll-ml-2.5">
            <table className="min-w-full divide-y divide-gray-200  ">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama Petugas
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Pekerjaan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    0%
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    50%
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    100%
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Deskripsi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Alamat
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    RT/RW
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {search
                  ? dataTable
                      ?.filter((val) => {
                        if (search === "") {
                          return val;
                        } else if (val?.userId?.namaLengkap?.includes(search)) {
                          return val;
                        }
                      })
                      .map((person, index) => (
                        <tr>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {++index}
                          </td>
                          <td className="px-6 py-4 ">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={person?.userId?.avatar}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {person?.userId?.fullName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4  text-sm text-orange-500">
                            {person?.role}
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            <div className="flex-shrink-0 h-12 w-10">
                              <img
                                className="h-12 w-10 rounded-md cursor-pointer"
                                src={person.before ? person.before : img}
                                alt=""
                                onClick={() =>
                                  setModal({
                                    isOpen: true,
                                    img: person.before ? person.before : img,
                                  })
                                }
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            <div className="flex-shrink-0 h-12 w-10">
                              <img
                                className="h-12 w-10 rounded-md cursor-pointer"
                                src={person.progress ? person.progress : img}
                                alt=""
                                onClick={() =>
                                  setModal({
                                    isOpen: true,
                                    img: person.progress
                                      ? person.progress
                                      : img,
                                  })
                                }
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            <div className="flex-shrink-0 h-12 w-10">
                              <img
                                className="h-12 w-10 rounded-md cursor-pointer"
                                src={person.after ? person.after : img}
                                alt=""
                                onClick={() =>
                                  setModal({
                                    isOpen: true,
                                    img: person.after ? person.after : img,
                                  })
                                }
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {person.description}
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {person.alamat}
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {person.rtrw}
                          </td>
                        </tr>
                      ))
                  : dataTable
                      ?.filter((val) => {
                        if (select === "") {
                          return val;
                        } else if (val?.role?.includes(select)) {
                          return val;
                        }
                      })
                      .map((person, index) => (
                        <tr>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {++index}
                          </td>
                          <td className="px-6 py-4 ">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={person?.userId?.avatar}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {person?.userId?.fullName}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4  text-sm text-orange-500">
                            {person?.role}
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            <div className="flex-shrink-0 h-12 w-10">
                              <img
                                className="h-12 w-10 rounded-md cursor-pointer"
                                src={person.before ? person.before : img}
                                alt=""
                                onClick={() =>
                                  setModal({
                                    isOpen: true,
                                    img: person.before ? person.before : img,
                                  })
                                }
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            <div className="flex-shrink-0 h-12 w-10">
                              <img
                                className="h-12 w-10 rounded-md cursor-pointer"
                                src={person.progress ? person.progress : img}
                                alt=""
                                onClick={() =>
                                  setModal({
                                    isOpen: true,
                                    img: person.progress
                                      ? person.progress
                                      : img,
                                  })
                                }
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            <div className="flex-shrink-0 h-12 w-10">
                              <img
                                className="h-12 w-10 rounded-md cursor-pointer"
                                src={person.after ? person.after : img}
                                alt=""
                                onClick={() =>
                                  setModal({
                                    isOpen: true,
                                    img: person.after ? person.after : img,
                                  })
                                }
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {person.description}
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {person.alamat}
                          </td>
                          <td className="px-6 py-4  text-sm text-gray-500">
                            {person.rtrw}
                          </td>
                        </tr>
                      ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportTabel;
