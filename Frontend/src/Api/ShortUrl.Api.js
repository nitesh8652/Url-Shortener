import axios from 'axios'
import axiosInstance from '../Utils/Axios'

// export const Fetchapi = async (data) => {
//      // const response = await axiosInstance.post("http://localhost:3000/api/create", data); 
//      const response = await axiosInstance.post("/api/create", data); 
//      return response.data.shortUrl;
// }

// export const Fetchapi = async (data) => {
//   const response = await axiosInstance.post("/api/create", data);
//   // response.data.shortUrl is something like "https://.../jHU3-c3"
//   // we extract just the code after the last slash:
//   const full = response.data.shortUrl;
//   const code = full.substring(full.lastIndexOf("/") + 1);
//   return code;  // now your front end will get "jHU3-c3" only
// };

export const Fetchapi = async (data) =>{
  const response = await axiosInstance.post("/api/create", data);
//   const code = response.data.shortUrl.split('/').pop();
  return code;  // now your front end will get "jHU3-c3" only
};