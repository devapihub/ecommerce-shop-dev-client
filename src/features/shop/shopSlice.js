import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const createShop = createAsyncThunk(
  'shop/createShop',
  async (formData, { rejectWithValue }) => {
    try {         
      const response = await axiosInstance.post('/shop/create-shop', formData);
      const data = response.data;
      
      if (data.status === 201) {
        return data;
      } else {
        return rejectWithValue(data.message || 'Tạo shop thất bại');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Lỗi kết nối: ' + errorMessage);
    }
  }
);

export const getMyShop = createAsyncThunk(
  'shop/getMyShop',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/shop/my-shop');
      const data = response.data;
      
      if (data.status === 200) {
        return data;
      } else {
        return rejectWithValue(data.message || 'Lấy thông tin shop thất bại');
      }
    } catch (error) {
      // Nếu 404 hoặc không có shop, trả về null thay vì reject
      if (error.response?.status === 404) {
        return { metadata: null };
      }
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Lỗi kết nối: ' + errorMessage);
    }
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState: {
    loading: false,
    error: null,
    message: '',
    shop: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.message = '';
    },
    resetShopState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = '';
      state.shop = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShop.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = '';
      })
      .addCase(createShop.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || 'Tạo shop thành công!';
        state.shop = action.payload?.metadata || null;
        state.error = null;
      })
      .addCase(createShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = action.payload;
      })
      .addCase(getMyShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyShop.fulfilled, (state, action) => {
        state.loading = false;
        state.shop = action.payload?.metadata || null;
        state.error = null;
      })
      .addCase(getMyShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.shop = null;
      });
  }
});

export const { clearError, resetShopState } = shopSlice.actions;
export default shopSlice.reducer;

