import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://v-design.onrender.com/api/getuserdata";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchUserData = createAsyncThunk("fetchUserData", async () => {
  const response = await fetch(url, options);
  return response.json();
});

const usersDataSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchUserData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserData.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default usersDataSlice.reducer;
