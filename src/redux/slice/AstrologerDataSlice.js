import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://localhost:8080/api/getastrologers";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchAstrologersData = createAsyncThunk(
  "fetchAstrologersData",
  async () => {
    const response = await fetch(url, options);
    return response.json();
  }
);

const astrologersDataSlice = createSlice({
  name: "astrologers",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAstrologersData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchAstrologersData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAstrologersData.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default astrologersDataSlice.reducer;
