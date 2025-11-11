import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk cho signup
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/shop/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.REACT_APP_API_KEY
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.code === 201) {
        return data;
      } else {
        return rejectWithValue(data.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      return rejectWithValue('Lỗi kết nối: ' + error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    formData: {
      name: '',
      email: '',
      password: ''
    },
    loading: false,
    isLoading: false,
    message: '',
    error: null,
    user: null,
    tokens: null,
    isAuthenticated: false
  },
  reducers: {
    updateFormData: (state, action) => {
      state.formData = {
        ...state.formData,
        [action.payload.name]: action.payload.value
      };
    },
    resetForm: (state) => {
      state.formData = {
        name: '',
        email: '',
        password: ''
      };
      state.message = '';
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = '';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.isLoading = true;
        state.message = '';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoading = false;
        state.message = 'Đăng ký thành công!';
        state.user = action.payload.metadata?.shop || null;
        state.tokens = action.payload.metadata?.tokens || null;
        state.isAuthenticated = !!state.tokens;
        state.formData = {
          name: '',
          email: '',
          password: ''
        };
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoading = false;
        state.error = action.payload;
        state.message = action.payload;
      });
  }
});

export const { updateFormData, resetForm, clearMessage } = authSlice.actions;
export default authSlice.reducer;

