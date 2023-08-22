import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const createOrder = createAsyncThunk(
  "createorder",
  async (details, isRejectedWithValue) => {
    const url = "https://v-design.onrender.com/api/createorderid";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: details.rate,
        email: details.email,
        name: details.name,
        category: details.category,
      }),
    };
    try {
      const response = await fetch(url, options);
      return response.json();
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

const createOrderSlice = createSlice({
  name: "createorder",
  initialState: {
    isError: false,
    isLoading: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(createOrder.rejected, (state, error) => {
      state.isError = true;
      console.log(error);
    });
    builder.addCase(createOrder.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export default createOrderSlice.reducer;
