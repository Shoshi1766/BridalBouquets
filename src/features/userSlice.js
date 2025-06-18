import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// פונקציה לעזור להוריד את המידע מ-localStorage, אם יש
const loadUserFromLocalStorage = () => {
  const savedUser = localStorage.getItem("currentUser");
  return savedUser ? JSON.parse(savedUser) : null; // מחזיר את המשתמש אם קיים, אחרת null
};

// שמירת המידע ב-localStorage
const saveUserToLocalStorage = (user) => {
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    localStorage.removeItem("currentUser");
  }
};

const userSlice = createSlice({
  name: "currentUser",
  initialState: { currentUser: loadUserFromLocalStorage() }, // טוענים את המשתמש מה-localStorage
  reducers: {
    userIn: (state, action) => {
      state.currentUser = action.payload;
      saveUserToLocalStorage(action.payload);
    
      if (action.payload?.token) {
        axios.defaults.headers.common['authorization'] = `Bearer ${action.payload.token}`;
        console.log(action.payload.token);
      } else {
        delete axios.defaults.headers.common['authorization'];
        console.warn("No token provided in payload");
      }
    },    
    userOut: (state) => {
      state.currentUser = null;
      delete axios.defaults.headers.common['authorization'];
      saveUserToLocalStorage(null); // מסירים מ-localStorage
    }
  }
});

export const { userIn, userOut } = userSlice.actions;
export default userSlice.reducer;
