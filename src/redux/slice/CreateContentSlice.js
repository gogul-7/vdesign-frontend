import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const url = "https://v-design.onrender.com/api/createarchitect";

export const fetchArchitect = createAsyncThunk(
  "fetcharchitect",
  async (architectDetails, { isRejectedWithValue }) => {
    const formData = new FormData();
    formData.append("files", architectDetails.file);
    formData.append("name", architectDetails.name);
    formData.append("email", architectDetails.email);
    formData.append("rate", architectDetails.rate);
    formData.append("location", architectDetails.location);
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

const fetchArchitectSlice = createSlice({
  name: "fetcharchitect",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArchitect.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchArchitect.rejected, (state, action) => {
      state.isError = true;
      console.log(action.payload);
    });
    builder.addCase(fetchArchitect.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export default fetchArchitectSlice.reducer;
