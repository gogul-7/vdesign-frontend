import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const url = "https://v-design.onrender.com/api/loginuser";

export const fetchLogin = createAsyncThunk(
  "fetchlogin",
  async (credentials, isRejectedWithValue) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
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

const loginSlice = createSlice({
  name: "loginUser",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export default loginSlice.reducer;
