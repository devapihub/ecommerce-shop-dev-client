import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById, clearCurrentProduct } from './productSlice'
import { Loader2, ShoppingCart, Star, ArrowLeft, Heart } from 'lucide-react'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentProduct, loading, error } = useSelector((state) => state.products)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [id, dispatch])

  // Set first image as selected when product loads
  useEffect(() => {
    if (currentProduct?.product_thumb) {
      setSelectedImage(0)
    }
  }, [currentProduct])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleAddToCart = () => {
  
  }

  const handleBuyNow = () => {
 
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }

  if (error || (!loading && !currentProduct)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Sản phẩm không tồn tại'}</p>
          <button
            onClick={() => navigate('/products')}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    )
  }

  if (!currentProduct) {
    return null
  }

  const images = currentProduct.product_thumb ? [currentProduct.product_thumb] : []

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </button>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="w-full h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={images[selectedImage] || 'https://via.placeholder.com/500x500'}
                  alt={currentProduct.product_name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index
                          ? 'border-orange-500'
                          : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${currentProduct.product_name} ${index + 1}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {currentProduct.product_name}
              </h1>

              {/* Rating */}
              {currentProduct.product_ratingsAverage && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(currentProduct.product_ratingsAverage)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {currentProduct.product_ratingsAverage.toFixed(1)} (Đánh giá)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-orange-500">
                  {formatPrice(currentProduct.product_price)}
                </span>
              </div>

              {/* Shop Info */}
              {currentProduct.product_shop && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Cửa hàng</p>
                  <p className="font-medium text-gray-800">
                    {typeof currentProduct.product_shop === 'object'
                      ? currentProduct.product_shop.name
                      : 'Shop'}
                  </p>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(currentProduct.product_quantity || 999, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600">
                    (Còn {currentProduct.product_quantity || 0} sản phẩm)
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Thêm vào giỏ hàng</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Mua ngay
                </button>
                <button className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Product Type */}
              {currentProduct.product_type && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {currentProduct.product_type}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Mô tả sản phẩm</h2>
            <div className="text-gray-600 whitespace-pre-line">
              {currentProduct.product_description || 'Chưa có mô tả cho sản phẩm này.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

