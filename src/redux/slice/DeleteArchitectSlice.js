import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteAcrhitect = createAsyncThunk(
  "deleteArhictect",
  async (id) => {
    const url = `http://localhost:8080/api/deletearchitect/${id}`;
    const options = {
      method: "DELETE",
    };
    const response = await fetch(url, options);
    return response.json();
  }
);
const deleteAcrhitectSlice = createSlice({
  name: "deletearchitect",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteAcrhitect.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteAcrhitect.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAcrhitect.rejected, (state, error) => {
      state.isError = true;
      console.log("error", error);
    });
  },
});

export default deleteAcrhitectSlice.reducer;
