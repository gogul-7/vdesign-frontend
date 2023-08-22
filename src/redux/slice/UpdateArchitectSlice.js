import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";

const updateArchitect = createAsyncThunk(
  "updateArchitect",
  async (architectDetails, isRejectedWithValue) => {
    const id = architectDetails.id;
    console.log(id);
    const url = `https://v-design.onrender.com/api/updatearchitect/${id}`;
    const formData = new FormData();
    formData.append("files", architectDetails.file);
    formData.append("name", architectDetails.name);
    formData.append("email", architectDetails.email);
    formData.append("rate", architectDetails.rate);
    formData.append("location", architectDetails.location);
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

const architectsSlice = createSlice({
  name: "architects",
  initialState: {
    isError: false,
    isLoading: false,
    data: null,
  },
  extraReducers: (builder) => {
    builder.addCase(updateArchitect.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(updateArchitect.rejected, (state, action) => {
      state.isError = true;
      console.log(action.payload);
    });
    builder.addCase(updateArchitect.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});

export { updateArchitect };
export default architectsSlice.reducer;
