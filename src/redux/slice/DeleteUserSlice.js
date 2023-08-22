import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const deleteUser = createAsyncThunk("deleteUser", async (id) => {
  const url = `http://localhost:8080/api/deleteuser/${id}`;
  const options = {
    method: "DELETE",
  };
  const response = await fetch(url, options);
  return response.json();
});
const deleteUserSlice = createSlice({
  name: "deleteAstrolger",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUser.rejected, (state, error) => {
      state.isError = true;
      console.log("error", error);
    });
  },
});

export default deleteUserSlice.reducer;
