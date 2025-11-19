import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/product');
      
      if (response.data?.metadata) {
        return response.data.metadata;
      }
      return rejectWithValue('Không có dữ liệu sản phẩm');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Không thể tải sản phẩm: ' + errorMessage);
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/searchProducts',
  async ({ keySearch }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/search/${encodeURIComponent(keySearch)}`);
      
      if (response.data?.metadata) {
        return response.data.metadata;
      }
      return rejectWithValue('Không tìm thấy sản phẩm');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Lỗi tìm kiếm: ' + errorMessage);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/${productId}`);
      
      if (response.data?.metadata) {
        return response.data.metadata;
      }
      return rejectWithValue('Không tìm thấy sản phẩm');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Không thể tải thông tin sản phẩm: ' + errorMessage);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    currentProduct: null,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.products = [];
      })
      // Search products
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.products = [];
      })
      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
        state.error = null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentProduct = null;
      });
  }
});

export const { 
  clearError, 
  clearCurrentProduct 
} = productSlice.actions;

export default productSlice.reducer;

