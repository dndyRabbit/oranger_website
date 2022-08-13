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
  { value: "Tim Siaga 1", label: "Tim Siaga 1" },
  { value: "Tim Siaga 2", label: "Tim Siaga 2" },
  { value: "Tim Siaga 3", label: "Tim Siaga 3" },
  { value: "Tim Siaga 4", label: "Tim Siaga 4" },
  { value: "Tim Siaga 5", label: "Tim Siaga 5" },
  { value: "Tim Siaga 6", label: "Tim Siaga 6" },
  { value: "Tim Siaga 7", label: "Tim Siaga 7" },
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
