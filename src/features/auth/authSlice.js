import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/shop/signup', formData);
      const data = response.data;
      
      if (data.status === 201 ) {
        localStorage.setItem('refreshToken', data.metadata?.tokens?.refreshToken || '');
        localStorage.setItem('accessToken', data.metadata?.tokens?.accessToken || '');    
        localStorage.setItem('userId', data.metadata?.shop?._id || '');
        return data;
      } else {
        return rejectWithValue(data.message || 'Đăng ký thất bại');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Lỗi kết nối: ' + errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/shop/login', formData);

      const data = response.data;
      console.log(data);
      
      if (data.status === 200) {
        localStorage.setItem('refreshToken', data.metadata?.tokens?.refreshToken || '');
        localStorage.setItem('accessToken', data.metadata?.tokens?.accessToken || '');      
        localStorage.setItem('userId', data.metadata.shop._id);
        return data;
      } else {
        return rejectWithValue(data.message || 'Đăng nhập thất bại');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Lỗi kết nối: ' + errorMessage);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const userId = localStorage.getItem('userId');

      const response = await axiosInstance.post(
        '/shop/logout',
        {},
        {
          headers: {
            'x-client-id': userId
          }
        }
      );

      const data = response.data;

      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');

      if (data.status === 200) {
        return data;
      } else {
        return rejectWithValue(data.message || 'Đăng xuất thất bại');
      }
    } catch (error) {
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Lỗi kết nối: ' + errorMessage);
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/shop/google', {
        token,
      });
      
      const data = response.data;
      
      if (data.status === 200) {
        localStorage.setItem('refreshToken', data.metadata?.tokens?.refreshToken || '');
        localStorage.setItem('accessToken', data.metadata?.tokens?.accessToken || '');
        localStorage.setItem('userId', data.metadata?.shop?._id || '');
        return data;
      } else {
        return rejectWithValue(data.message || 'Đăng nhập Google thất bại');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Lỗi kết nối: ' + errorMessage);
    }
  }
);

const getInitialState = () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const userId = localStorage.getItem('userId');
  const hasTokens = !!(accessToken && refreshToken);
  
  return {
    formData: { name: '', email: '', password: '' },
    loading: false,
    message: '',
    error: null,
    user: userId ? { _id: userId } : null,
    tokens: hasTokens ? { accessToken, refreshToken } : null,
    isAuthenticated: !!(hasTokens && userId)
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
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
        state.message = '';
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
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
        state.error = action.payload;
        state.message = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'Đăng nhập thành công!';
        state.user = action.payload.metadata?.shop || null;
        state.tokens = action.payload.metadata?.tokens || null;
        state.isAuthenticated = !!state.tokens;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message ;
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
        state.user = null;
        state.tokens = null;
        state.isAuthenticated = false;
      })
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.message = '';
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.message = 'Đăng nhập Google thành công!';
        state.user = action.payload.metadata?.shop || null;
        state.tokens = action.payload.metadata?.tokens || null;
        state.isAuthenticated = !!state.tokens;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
      });
  }
});

export const { updateFormData, resetForm, clearMessage } = authSlice.actions;
export default authSlice.reducer;

