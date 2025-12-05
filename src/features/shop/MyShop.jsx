import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyShop } from './shopSlice'
import { Store, MapPin, Star, Package } from 'lucide-react'

const MyShop = () => {
  const dispatch = useDispatch()
  const { shop, loading, error } = useSelector((state) => state.shop)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#a01d22] mx-auto"></div>
              <p className="mt-4 text-gray-600">Đang tải thông tin shop...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center py-8">
              <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Bạn chưa có shop</h2>
              <p className="text-gray-600 mb-6">Hãy tạo shop để bắt đầu bán hàng</p>
              <a
                href="/shop/create"
                className="inline-block px-6 py-2 bg-[#a01d22] text-white rounded-lg hover:bg-[#8a1a1e] transition-colors"
              >
                Tạo shop ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Banner */}
          {shop.banner && (
            <div className="w-full h-48 bg-gray-200">
              <img
                src={shop.banner}
                alt="Shop banner"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )}

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 overflow-hidden">
                {shop.avatar ? (
                  <img
                    src={shop.avatar}
                    alt={shop.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                ) : (
                  <Store className="w-10 h-10 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{shop.name}</h1>
                {shop.slug && (
                  <p className="text-sm text-gray-500 mb-2">/{shop.slug}</p>
                )}
                {shop.description && (
                  <p className="text-gray-600">{shop.description}</p>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {shop.ratings?.average?.toFixed(1) || '0.0'}
                </p>
                <p className="text-sm text-gray-500">Đánh giá</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Package className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {shop.productCount || 0}
                </p>
                <p className="text-sm text-gray-500">Sản phẩm</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <Star className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">
                  {shop.ratings?.count || 0}
                </p>
                <p className="text-sm text-gray-500">Lượt đánh giá</p>
              </div>
            </div>

            {/* Address */}
            {shop.address && (
              <div className="border-t pt-6">
                <div className="flex items-start gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-[#a01d22] mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Địa chỉ shop</h3>
                    <p className="text-gray-600">
                      {shop.address.street}, {shop.address.wardName}, {shop.address.districtName}, {shop.address.provinceName}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="border-t pt-6 mt-6">
              <div className="flex items-center gap-4">
                <button className="px-6 py-2 bg-[#a01d22] text-white rounded-lg hover:bg-[#8a1a1e] transition-colors">
                  Chỉnh sửa shop
                </button>
                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Quản lý sản phẩm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyShop

