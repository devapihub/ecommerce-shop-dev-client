import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';

export const getProvinces = createAsyncThunk(
  'address/getProvinces',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/ghn/provinces');
      const data = response.data;
      
      if (data.status === 200) {
        return data.metadata || [];
      } else {
        return rejectWithValue(data.message || 'Lấy danh sách tỉnh/thành phố thất bại');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Lỗi kết nối: ' + errorMessage);
    }
  }
);

export const getDistricts = createAsyncThunk(
  'address/getDistricts',
  async (provinceId, { rejectWithValue }) => {
    if (!provinceId) {
      return rejectWithValue('Thiếu province_id');
    }
    
    try {
      const response = await axiosInstance.get(`/ghn/districts?province_id=${provinceId}`);
      const data = response.data;
      
      if (data.status === 200) {
        return data.metadata || [];
      } else {
        return rejectWithValue(data.message || 'Lấy danh sách quận/huyện thất bại');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Lỗi kết nối: ' + errorMessage);
    }
  }
);

export const getWards = createAsyncThunk(
  'address/getWards',
  async (districtId, { rejectWithValue }) => {
    if (!districtId) {
      return rejectWithValue('Thiếu district_id');
    }
    
    try {
      const response = await axiosInstance.get(`/ghn/wards?district_id=${districtId}`);
      const data = response.data;
      
      if (data.status === 200) {
        return data.metadata || [];
      } else {
        return rejectWithValue(data.message || 'Lấy danh sách phường/xã thất bại');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return rejectWithValue('Lỗi kết nối: ' + errorMessage);
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    provinces: [],
    districts: [],
    wards: [],
    loadingProvinces: false,
    loadingDistricts: false,
    loadingWards: false,
    error: null,
    selectedProvinceId: null,
    selectedDistrictId: null,
    selectedWardId: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedProvince: (state, action) => {
      state.selectedProvinceId = action.payload;
      // Reset districts và wards khi chọn tỉnh mới
      state.districts = [];
      state.wards = [];
      state.selectedDistrictId = null;
      state.selectedWardId = null;
    },
    setSelectedDistrict: (state, action) => {
      state.selectedDistrictId = action.payload;
      // Reset wards khi chọn quận/huyện mới
      state.wards = [];
      state.selectedWardId = null;
    },
    setSelectedWard: (state, action) => {
      state.selectedWardId = action.payload;
    },
    resetAddressState: (state) => {
      state.provinces = [];
      state.districts = [];
      state.wards = [];
      state.selectedProvinceId = null;
      state.selectedDistrictId = null;
      state.selectedWardId = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get Provinces
      .addCase(getProvinces.pending, (state) => {
        state.loadingProvinces = true;
        state.error = null;
      })
      .addCase(getProvinces.fulfilled, (state, action) => {
        state.loadingProvinces = false;
        state.provinces = action.payload;
        state.error = null;
      })
      .addCase(getProvinces.rejected, (state, action) => {
        state.loadingProvinces = false;
        state.error = action.payload;
      })
      // Get Districts
      .addCase(getDistricts.pending, (state) => {
        state.loadingDistricts = true;
        state.error = null;
      })
      .addCase(getDistricts.fulfilled, (state, action) => {
        state.loadingDistricts = false;
        state.districts = action.payload;
        state.error = null;
      })
      .addCase(getDistricts.rejected, (state, action) => {
        state.loadingDistricts = false;
        state.error = action.payload;
        state.districts = [];
      })
      // Get Wards
      .addCase(getWards.pending, (state) => {
        state.loadingWards = true;
        state.error = null;
      })
      .addCase(getWards.fulfilled, (state, action) => {
        state.loadingWards = false;
        state.wards = action.payload;
        state.error = null;
      })
      .addCase(getWards.rejected, (state, action) => {
        state.loadingWards = false;
        state.error = action.payload;
        state.wards = [];
      });
  }
});

export const { 
  clearError, 
  setSelectedProvince, 
  setSelectedDistrict, 
  setSelectedWard,
  resetAddressState 
} = addressSlice.actions;

export default addressSlice.reducer;

