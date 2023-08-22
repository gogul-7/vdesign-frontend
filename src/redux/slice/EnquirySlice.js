import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "http://localhost:8080/api/postenquiry";

export const enquiryPost = createAsyncThunk(
  "fetchlogin",
  async (enqDetails, isRejectedWithValue) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enqDetails.email,
        name: enqDetails.name,
        message: enqDetails.message,
      }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          return isRejectedWithValue(data);
        } else {
          throw new Error(data.message);
        }
      }

      return data;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

const enquirySlice = createSlice({
  name: "enquirySlice",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(enquiryPost.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(enquiryPost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(enquiryPost.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default enquirySlice.reducer;
