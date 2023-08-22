import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://localhost:8080/api/createastrologer";

export const fetchAstrologer = createAsyncThunk(
  "fetchastrologer",
  async (astrologerDetails, isRejectedWithValue) => {
    const formData = new FormData();
    formData.append("files", astrologerDetails.file);
    formData.append("name", astrologerDetails.name);
    formData.append("email", astrologerDetails.email);
    formData.append("rate", astrologerDetails.rate);
    formData.append("location", astrologerDetails.location);
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

const fetchAstrologerSlice = createSlice({
  name: "fetchastrologer",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAstrologer.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAstrologer.rejected, (state, action) => {
      state.isError = true;
      console.log(action.payload);
    });
    builder.addCase(fetchAstrologer.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export default fetchAstrologerSlice.reducer;
