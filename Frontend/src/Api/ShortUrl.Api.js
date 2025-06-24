import axios from 'axios'
import axiosInstance from '../Utils/Axios'

export const Fetchapi = async (data) => {
     // const response = await axiosInstance.post("http://localhost:3000/api/create", data); 
     const response = await axiosInstance.post("/api/create", data); 
     return response.data.shortUrl;
}
