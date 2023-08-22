import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://localhost:8080/api/getarchitects";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const fetchArchitectsData = createAsyncThunk(
  "fetchArchitectsData",
  async () => {
    const response = await fetch(url, options);
    return response.json();
  }
);

const architectsDataSlice = createSlice({
  name: "architects",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArchitectsData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
    });
    builder.addCase(fetchArchitectsData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchArchitectsData.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default architectsDataSlice.reducer;
