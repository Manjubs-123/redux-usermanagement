import { createSlice } from "@reduxjs/toolkit";

const adminInfoFromStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;

const adminSlice = createSlice({
  name: "admin",

  initialState: {
    adminInfo: adminInfoFromStorage,
    users: [],
  },

  reducers: {
    setAdmin: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },

    setUsers: (state, action) => {
      state.users = action.payload;
    },

    logoutAdmin: (state) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

export const { setAdmin, setUsers, logoutAdmin } = adminSlice.actions;

export default adminSlice.reducer;