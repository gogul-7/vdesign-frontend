import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://v-design.onrender.com/api/getuploadedimages";

export const fetchUploadedImagesData = createAsyncThunk(
  "fetchUploadedImagesData",
  async (archId) => {
    const options = {
      method: "GET",
    };
    const fetchUrl = `${url}/${archId.id}`;
    console.log(fetchUrl);
    const response = await fetch(fetchUrl, options);
    return response.json();
  }
);

const uploadedImageDataSlice = createSlice({
  name: "uploadedImagesData",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUploadedImagesData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchUploadedImagesData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUploadedImagesData.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default uploadedImageDataSlice.reducer;
