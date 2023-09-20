import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials,{rejectWithValue}) => {
    try {
        const request = await axios.post(
            `http://localhost:9999/api/auth/login`,
            userCredentials
          );
          const response = request.data;
          localStorage.setItem("user", JSON.stringify(response));
          return response;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
    
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        if ((action.error.message === "Request failed with status code 401")) {
          state.error = " Access Denied! Invalid Credentials";
        } else {
          state.error = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
