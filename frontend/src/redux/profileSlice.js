import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../api/userApi";


export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (token) => {
    const data = await getProfile(token);
    return data;
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: null,
    loading: false,
  },
  reducers:{
    clearProfile:(state)=>{
        state.user = null;
    }
  },
  
  extraReducers: (builder)=>{
    builder
    .addCase(fetchProfile.pending, (state)=>{
        state.loading = true;
    })
    .addCase(fetchProfile.fulfilled,(state,action)=>{
        state.loading = false;
        state.user = action.payload;
    })
    .addCase(fetchProfile.rejected,(state)=>{
        state.loading = false;
    })
  }
});

export const {clearProfile} = profileSlice.actions

export default profileSlice.reducer
