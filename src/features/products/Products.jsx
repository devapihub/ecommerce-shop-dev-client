import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, searchProducts } from './productSlice'
import ProductCard from '../../shared/components/client/common/ProductCard'
import { Loader2 } from 'lucide-react'

const Products = () => {
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const { products, loading, error } = useSelector((state) => state.products)
  const keySearch = searchParams.get('keySearch')

  useEffect(() => {
    if (keySearch) {
      // Search products
      dispatch(searchProducts({ keySearch }))
    } else {
      // Fetch all products
      dispatch(fetchProducts())
    }
  }, [keySearch, dispatch])

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tất cả sản phẩm</h1>
          <p className="text-gray-600">
            {products.length > 0 ? `Tìm thấy ${products.length} sản phẩm` : 'Không có sản phẩm nào'}
          </p>
        </div>

        {/* Main Content */}
        <div>
          {/* Toolbar */}
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <span className="text-sm text-gray-600">
              {products.length} sản phẩm
            </span>
          </div>

            {/* Products Grid */}
            {error ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-red-500">{error}</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500">Không tìm thấy sản phẩm nào</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}

        </div>
      </div>
    </div>
  )
}

export default Products

