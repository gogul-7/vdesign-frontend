import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://v-design.onrender.com/api/myorderdata";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchOrderData = createAsyncThunk("fetchOrderData", async () => {
  const response = await fetch(url, options);
  return response.json();
});

const orderDataSlice = createSlice({
  name: "orderdata",
  initialState: {
    isLoading: false,
    data: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchOrderData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrderData.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default orderDataSlice.reducer;
