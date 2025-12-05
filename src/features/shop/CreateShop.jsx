import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createShop, clearError } from './shopSlice'
import { 
  getProvinces, 
  getDistricts, 
  getWards,
  setSelectedProvince,
  setSelectedDistrict,
  setSelectedWard,
  clearError as clearAddressError
} from './addressSlice'
import { Store, Upload, MapPin } from 'lucide-react'

const CreateShop = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, message } = useSelector((state) => state.shop)
  const { 
    provinces, 
    districts, 
    wards, 
    loadingProvinces, 
    loadingDistricts, 
    loadingWards,
    selectedProvinceId,
    selectedDistrictId,
    selectedWardId
  } = useSelector((state) => state.address)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    avatar: null,
    banner: null,
    address: {
      street: '',
      wardCode: '',
      wardName: '',
      districtCode: '',
      districtName: '',
      provinceCode: '',
      provinceName: ''
    }
  })
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [bannerPreview, setBannerPreview] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      })) 
    }
  }
  const handleFileChange = (e) => {
    const { name, files } = e.target
    const file = files[0]
    
    if (file) {
      setFormData(prev => ({
        ...prev,
        [name]: file
      }))
      console.log('File selected:', file);
    console.log('Tên file:', file.name);
    console.log('Kích thước:', file.size, 'bytes');
    console.log('Loại MIME:', file.type);
      // Tạo preview
      const reader = new FileReader()
      reader.onloadend = () => {
        if (name === 'avatar') {
          setAvatarPreview(reader.result)
        } else if (name === 'banner') {
          setBannerPreview(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const removeFile = (type) => {
    if (type === 'avatar') {
      setFormData(prev => ({ ...prev, avatar: null }))
      setAvatarPreview(null)
    } else if (type === 'banner') {
      setFormData(prev => ({ ...prev, banner: null }))
      setBannerPreview(null)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())
    
    try {
      const submitFormData = new FormData()
      
      submitFormData.append('name', formData.name)
      submitFormData.append('description', formData.description || '')
      
      if (formData.avatar instanceof File) {
        submitFormData.append('avatar', formData.avatar)
      }
      
      if (formData.banner instanceof File) {
        submitFormData.append('banner', formData.banner)
      }
      
      Object.entries(formData.address).forEach(([key,value])=>{
        submitFormData.append(`address[${key}]`, value)
      } )       
      
      const result = await dispatch(createShop(submitFormData)).unwrap()
      if (result) {
        navigate('/')
      }
    } catch (err) {
    
    }
  }

  useEffect(() => {
    dispatch(getProvinces())
  }, [dispatch])

  useEffect(() => {
    if (selectedProvinceId) {
      dispatch(getDistricts(selectedProvinceId))
    }
  }, [selectedProvinceId, dispatch])

  useEffect(() => {
    if (selectedDistrictId) {
      dispatch(getWards(selectedDistrictId))
    }
  }, [selectedDistrictId, dispatch])

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value
    dispatch(setSelectedProvince(provinceId))
    
    if (provinceId) {
      const selectedProvince = provinces.find(p => p.ProvinceID === parseInt(provinceId))
      if (selectedProvince) {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            provinceCode: selectedProvince.ProvinceID.toString(),
            provinceName: selectedProvince.ProvinceName,
            // Reset district and ward
            districtCode: '',
            districtName: '',
            wardCode: '',
            wardName: ''
          }
        }))
      }
    }
  }

  const handleDistrictChange = (e) => {
    const districtId = e.target.value
    dispatch(setSelectedDistrict(districtId))
    
    if (districtId) {
      const selectedDistrict = districts.find(d => d.DistrictID === parseInt(districtId))
      if (selectedDistrict) {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            districtCode: selectedDistrict.DistrictID.toString(),
            districtName: selectedDistrict.DistrictName,
            // Reset ward
            wardCode: '',
            wardName: ''
          }
        }))
      }
    }
  }

  const handleWardChange = (e) => {
    const wardId = e.target.value
    dispatch(setSelectedWard(wardId))
    
    if (wardId) {
      const selectedWard = wards.find(w => w.WardCode === wardId)
      if (selectedWard) {
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            wardCode: selectedWard.WardCode,
            wardName: selectedWard.WardName
          }
        }))
      }
    }
  }

  useEffect(() => {
    return () => {
      dispatch(clearError())
      dispatch(clearAddressError())
    }
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-[#a01d22] flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tạo shop mới</h1>
              <p className="text-sm text-gray-500">Điền thông tin để tạo shop của bạn</p>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {message && !error && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tên shop */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên shop <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                maxLength={150}
                placeholder="Nhập tên shop"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01d22] focus:border-transparent outline-none"
              />
            </div>

            {/* Mô tả */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả shop
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                maxLength={1000}
                rows={4}
                placeholder="Mô tả về shop của bạn..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01d22] focus:border-transparent outline-none resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.description.length}/1000 ký tự
              </p>
            </div>

            {/* Avatar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar
              </label>
              {avatarPreview ? (
                <div className="relative">
                  <img 
                    src={avatarPreview} 
                    alt="Avatar preview" 
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile('avatar')}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click để upload</span> hoặc kéo thả
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Banner */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banner
              </label>
              {bannerPreview ? (
                <div className="relative">
                  <img 
                    src={bannerPreview} 
                    alt="Banner preview" 
                    className="w-full h-48 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile('banner')}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click để upload</span> hoặc kéo thả
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    name="banner"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Địa chỉ */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#a01d22]" />
                <h2 className="text-lg font-semibold text-gray-900">Địa chỉ shop</h2>
              </div>

              <div className="space-y-4">
                {/* Đường/Phố */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Đường/Phố <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address.street"
                    value={formData.address.street}
                    onChange={handleChange}
                    required
                    placeholder="Số nhà, tên đường"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01d22] focus:border-transparent outline-none"
                  />
                </div>

                {/* Phường/Xã */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phường/Xã <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedWardId || ''}
                    onChange={handleWardChange}
                    required
                    disabled={!selectedDistrictId || loadingWards}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01d22] focus:border-transparent outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!selectedDistrictId 
                        ? 'Vui lòng chọn quận/huyện trước' 
                        : loadingWards 
                        ? 'Đang tải...' 
                        : 'Chọn phường/xã'}
                    </option>
                    {wards.map((ward) => (
                      <option key={ward.WardCode} value={ward.WardCode}>
                        {ward.WardName}
                      </option>
                    ))}
                  </select>
                  {selectedWardId && (
                    <input
                      type="hidden"
                      name="address.wardCode"
                      value={formData.address.wardCode}
                    />
                  )}
                  {selectedWardId && (
                    <input
                      type="hidden"
                      name="address.wardName"
                      value={formData.address.wardName}
                    />
                  )}
                </div>

                {/* Quận/Huyện */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quận/Huyện <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedDistrictId || ''}
                    onChange={handleDistrictChange}
                    required
                    disabled={!selectedProvinceId || loadingDistricts}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01d22] focus:border-transparent outline-none bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!selectedProvinceId 
                        ? 'Vui lòng chọn tỉnh/thành phố trước' 
                        : loadingDistricts 
                        ? 'Đang tải...' 
                        : 'Chọn quận/huyện'}
                    </option>
                    {districts.map((district) => (
                      <option key={district.DistrictID} value={district.DistrictID}>
                        {district.DistrictName}
                      </option>
                    ))}
                  </select>
                  {selectedDistrictId && (
                    <input
                      type="hidden"
                      name="address.districtCode"
                      value={formData.address.districtCode}
                    />
                  )}
                  {selectedDistrictId && (
                    <input
                      type="hidden"
                      name="address.districtName"
                      value={formData.address.districtName}
                    />
                  )}
                </div>

                {/* Tỉnh/Thành phố */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedProvinceId || ''}
                    onChange={handleProvinceChange}
                    required
                    disabled={loadingProvinces}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#a01d22] focus:border-transparent outline-none bg-white"
                  >
                    <option value="">{loadingProvinces ? 'Đang tải...' : 'Chọn tỉnh/thành phố'}</option>
                    {provinces.map((province) => (
                      <option key={province.ProvinceID} value={province.ProvinceID}>
                        {province.ProvinceName}
                      </option>
                    ))}
                  </select>
                  {selectedProvinceId && (
                    <input
                      type="hidden"
                      name="address.provinceCode"
                      value={formData.address.provinceCode}
                    />
                  )}
                  {selectedProvinceId && (
                    <input
                      type="hidden"
                      name="address.provinceName"
                      value={formData.address.provinceName}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-2 bg-[#a01d22] text-white rounded-lg hover:bg-[#8a1a1e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Đang tạo...' : 'Tạo shop'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateShop


