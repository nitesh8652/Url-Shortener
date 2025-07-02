import axios from 'axios'
import axiosInstance from '../Utils/Axios'


export const Fetchapi = async (data) =>{
  const response = await axiosInstance.post("/api/create", data);
  const code = response.data.shortUrl.split('/').pop();
  return code;  // now your front end will get "jHU3-c3" only
};