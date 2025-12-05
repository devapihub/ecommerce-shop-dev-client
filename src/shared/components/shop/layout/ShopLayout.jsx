import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getMyShop } from '../../../../features/shop/shopSlice'
import Sidebar from './Sidebar'
import Header from './Header'

const ShopLayout = () => {
  const dispatch = useDispatch()
  const { shop, loading: shopLoading } = useSelector((state) => state.shop)
  const { isAuthenticated } = useSelector((state) => state.auth)

  // Fetch shop khi vào shop layout (chỉ một lần)
  useEffect(() => {
    if (isAuthenticated && !shop && !shopLoading) {
      dispatch(getMyShop())
    }
  }, [isAuthenticated, shop, shopLoading, dispatch])

  return (
    <div className="min-h-screen flex">
      {/* Sidebar - Fixed */}
      <Sidebar />

      {/* Main content - Offset by sidebar width */}
      <main className="flex-1 bg-gray-100 ml-64">
        {/* Top bar */}
        <Header />

        {/* Page content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default ShopLayout

