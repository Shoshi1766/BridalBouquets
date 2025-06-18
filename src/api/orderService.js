import axios from "axios"

export const baseUrl = "https://nodeproject-f12s.onrender.com/orders";

export const httpAddOrder = (order) => {
   return axios.post(baseUrl,order);
};

