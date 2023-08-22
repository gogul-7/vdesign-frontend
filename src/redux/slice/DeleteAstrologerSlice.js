import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteAstrolger = createAsyncThunk(
  "deleteAstrolger",
  async (id) => {
    const url = `http://localhost:8080/api/deleteastrologer/${id}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(url, options);
    return response.json();
  }
);
const deleteAstrolgerSlice = createSlice({
  name: "deleteAstrolger",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteAstrolger.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteAstrolger.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAstrolger.rejected, (state, error) => {
      state.isError = true;
      console.log("error", error);
    });
  },
});

export default deleteAstrolgerSlice.reducer;
