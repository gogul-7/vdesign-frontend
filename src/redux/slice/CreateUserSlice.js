import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = "https://v-design.onrender.com/api/createuser";

export const fetchCreateUser = createAsyncThunk(
  "fetchcreateuser",
  async (details, isRejectedWithValue) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: details.name,
        email: details.mail,
        password: details.password,
        location: details.location,
      }),
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

const createUserSlice = createSlice({
  name: "createUser",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCreateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCreateUser.rejected, (state, action) => {
      state.isError = true;
      console.log("error", action.payload);
    });
  },
});

export default createUserSlice.reducer;
