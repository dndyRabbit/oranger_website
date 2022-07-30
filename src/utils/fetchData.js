import axios from "axios";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(
    `${process.env.REACT_APP_HEROKU_URL}/api/${url}`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    }
  );
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(
    `${process.env.REACT_APP_HEROKU_URL}/api/${url}`,
    post,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(
    `${process.env.REACT_APP_HEROKU_URL}/api/${url}`,
    post,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    }
  );
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(
    `${process.env.REACT_APP_HEROKU_URL}/api/${url}`,
    post,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    }
  );
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_HEROKU_URL}/api/${url}`,
    {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    }
  );
  return res;
};
