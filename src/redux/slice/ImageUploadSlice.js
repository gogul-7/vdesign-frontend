import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://v-design.onrender.com/api/uploadimages";

export const fetchImageUpload = createAsyncThunk(
  "fetchimageupload",
  async (archDetails, isRejectedWithValue) => {
    const formData = new FormData();
    formData.append("imageId", archDetails.imageId.id);
    for (let i = 0; i < archDetails.files.length; i++) {
      formData.append("files", archDetails.files[i]);
    }
    const options = {
      method: "POST",
      body: formData,
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

const imageUploadSlice = createSlice({
  name: "fetchimageupload",
  initialState: {
    isLoading: false,
    isError: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchImageUpload.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(fetchImageUpload.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchImageUpload.rejected, (state, error) => {
      state.isError = true;
      console.log(error);
    });
  },
});

export default imageUploadSlice.reducer;
