import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = API_URL;

//get Products
export const GetProductsAll = async (endpoints, headers) => {
  const data = await axios.get(endpoints, {
    headers: headers,
  });
  return data;
};
