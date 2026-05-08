import axios from "./axiosInstance";
// import axios from "axios"
const API = "http://localhost:5000/api/auth";

export const getProfile = async (token)=>{
    const res = await axios.get(`${API}/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return res.data;
}

export const uploadProfileImage = async (file,token)=>{
    const formData = new FormData()
    formData.append("image",file)

    const res = await axios.post(
        `${API}/upload-image`,
        formData,
        {
            headers:{
                Authorization: `Bearer ${token}` ,          }
        }
    )
    return res.data;
}


export const updateProfile = (data, token) => {
  return axios.put(`${API}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};