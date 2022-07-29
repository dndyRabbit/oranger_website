export const schedule = [
  { label: "Penyapuan", role: "penyapuan" },
  { label: "Saluran", role: "saluran" },
  {
    label: "Driver",
    children: [
      { name: "Xenia", role: "driverXenia" },
      { name: "Hailux", role: "driverHailux" },
    ],
  },
  {
    label: "Tim Siaga",
    children: [
      { name: "Tim Siaga A", role: "timSiagaA" },
      { name: "Tim Siaga B", role: "timSiagaB" },
      { name: "Tim Siaga C", role: "timSiagaC" },
    ],
  },
  {
    label: "Kantor",
    children: [
      { name: "Administrasi", role: "administrasi" },
      {
        name: "Office Boy",
        role: "officeBoy",
      },
    ],
  },
];

export const options = [
  { value: "", label: "All" },
  { value: "Penyapuan", label: "Penyapuan" },
  { value: "Saluran", label: "Saluran" },
  { value: "Driver Xenia", label: "Driver Xenia" },
  { value: "Driver Hailux", label: "Driver Hailux" },
  { value: "Tim Siaga A", label: "Tim Siaga A" },
  { value: "Tim Siaga B", label: "Tim Siaga B" },
  { value: "Tim Siaga C", label: "Tim Siaga C" },
  { value: "Administrasi", label: "Administrasi" },
  { value: "Office Boy", label: "Office Boy" },
];

export const optionsStatusAbsen = [
  { value: "Cuti", label: "Cuti" },
  { value: "Sakit", label: "Sakit" },
  { value: "Izin", label: "Izin" },
  { value: "Hadir", label: "Hadir" },
  { value: "Belum Absen", label: "Belum Absen" },
  { value: "Tidak Masuk", label: "Tidak Masuk" },
];
