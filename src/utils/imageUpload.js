export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "File does not exist.");

  if (file.size > 1024 * 1024 * 5)
    // 5mb
    err = "The largest image size is 5mb.";

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "Image format is incorrect.";

  return err;
};

export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    formData.append("file", item);

    formData.append("upload_preset", process.env.REACT_APP_CLOUD_UPDATE_PRESET);
    formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

    const res = await fetch(process.env.REACT_APP_CLOUD_API, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
