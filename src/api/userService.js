import axios from "axios"

export const baseUrl = "https://nodeproject-f12s.onrender.com/users";

export const httpAddUser = (user) => {
   return axios.post(baseUrl,user);
};

export const httpCheckUser=(user)=>{
   return axios.post(baseUrl+"/getUserByFullNameAndPassword",user);
}
