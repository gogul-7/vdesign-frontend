import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const updateAstrologer = createAsyncThunk(
  "updateAstrologer",
  async (astrologerDetails, isRejectedWithValue) => {
    const id = astrologerDetails.id;
    console.log(id);
    const url = `https://v-design.onrender.com/api/updateastrologer/${id}`;
    const formData = new FormData();
    formData.append("files", astrologerDetails.file);
    formData.append("name", astrologerDetails.name);
    formData.append("email", astrologerDetails.email);
    formData.append("rate", astrologerDetails.rate);
    formData.append("location", astrologerDetails.location);
    const options = {
      method: "PUT",
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
      return isRejectedWithValue(error.response.data); // Use rejectWithValue to pass error data
    }
  }
);

const updateAstrologersSlice = createSlice({
  name: "architects",
  initialState: {
    isError: false,
    isLoading: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(updateAstrologer.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(updateAstrologer.rejected, (state, action) => {
      state.isError = true;
      console.log(action.payload);
    });
    builder.addCase(updateAstrologer.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export { updateAstrologer };
export default updateAstrologersSlice.reducer;
