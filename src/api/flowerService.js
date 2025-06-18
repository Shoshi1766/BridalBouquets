import axios from "axios";

export const baseUrl = "https://nodeproject-f12s.onrender.com/flowers";
export const imagesBaseUrl = "https://nodeproject-f12s.onrender.com/static/images";

// בקשה לקבלת כל הפרחים בדף מסויים
export const httpGetAllFlowers = (page) => {
    return axios.get(baseUrl + "?limit=6&page=" + page);
};

export const httpGetOneFlower = (id) => {
    return axios.get(baseUrl +"/"+id);
};

export const httpGetOneStaticFlower = (id) => {
    return imagesBaseUrl + "/" + id;
};


// בקשה לקבלת סך כל הדפים
export const httpGetCountFlowerInPage = () => {
    return axios.get(baseUrl + "/count?limit=6");
};

export const httpAddFlower = (flower) => {
    return axios.post(baseUrl, flower); 
};

export const httpDeleteFlower=(flowerId)=>{
    console.log("flower id: "+flowerId+"  url: "+baseUrl+"/"+flowerId);
    return axios.delete(baseUrl+"/"+flowerId);
}

export const httpUpdateFlower = (id,updateFlower) => {
    return axios.put(baseUrl +"/"+id,updateFlower);
};