import { ShoppingCart, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  const [imageError, setImageError] = useState(false)

  const handleProductClick = () => {
    navigate(`/products/${product._id}`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden group"
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        {!imageError ? (
          <img
            src={product.product_thumb || 'https://via.placeholder.com/300x300'}
            alt={product.product_name}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
        
        {/* Rating Badge */}
        {product.product_ratingsAverage && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-medium text-gray-700">
              {product.product_ratingsAverage.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 min-h-[40px]">
          {product.product_name}
        </h3>
        
        {/* Price */}
        <div className="mb-3">
          <span className="text-lg font-bold text-orange-500">
            {formatPrice(product.product_price)}
          </span>
        </div>

        {/* Shop Info */}
        {product.product_shop && (
          <div className="text-xs text-gray-500 mb-3">
            {typeof product.product_shop === 'object' 
              ? product.product_shop.name 
              : 'Shop'}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            // TODO: Add to cart functionality
            console.log('Add to cart:', product._id)
          }}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm font-medium"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Thêm vào giỏ</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard

