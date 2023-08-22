import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://v-design.onrender.com/api/getenquiry";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getEnquiryData = createAsyncThunk("getenquirydata", async () => {
  const response = await fetch(url, options);
  return response.json();
});

const enquiryDataSlice = createSlice({
  name: "enquirydata",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getEnquiryData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getEnquiryData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getEnquiryData.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default enquiryDataSlice.reducer;
