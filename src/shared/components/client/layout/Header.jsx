import { Search, Menu, User, ShoppingCart, LogIn, Settings, LogOut,Store } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { logoutUser } from '../../../../features/auth/authSlice'
import { getMyShop } from '../../../../features/shop/shopSlice'

const TRENDING_KEYWORDS = [
  'iphone 17',
  'iphone 16',
  'laptop',
  'ipad',
  'samsung',
  'carseat',
  'sạc dự phòng',
  'máy hút ẩm',
]

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { shop, loading } = useSelector((state) => state.shop)

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleShopClick = async () => {
   await dispatch(getMyShop())
    if (shop) {
      navigate(`/shop/my-shop`)
    } else {
      navigate('/shop/create')
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?keySearch=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/products')
    }
  }

  return (
    <header className="w-full sticky top-0 z-50">
      <div className="bg-fpt w-full pt-3 pb-2">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div 
              className="flex items-center gap-3 flex-shrink-0 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/FPT_logo_2010.svg/2560px-FPT_logo_2010.svg.png"
                alt="FPT Shop Logo"
                className="w-20 h-20 object-contain"
              />
            </div>

            {/* Category button */}
            <button
              type="button"
              className="bg-[#a01d22] hover:bg-[#8a1a1e] rounded-lg px-4 py-2 flex items-center gap-2 text-white text-sm font-medium transition-colors flex-shrink-0"
            >
              <Menu className="w-5 h-5" />
              <span>Danh mục</span>
            </button>

            {/* Search bar */}
            <div className="flex-1">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Nhập tên điện thoại, laptop, phụ kiện... cần tìm"
                  className="w-full py-3 pr-10 rounded-2xl text-xs px-5 text-gray-800 placeholder-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 border-red-200 flex items-center justify-center hover:bg-red-50 transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-fpt" />
                </button>
              </form>

              {/* Trending keywords */}
              <div className=" flex items-center gap-3 text-white/90 text-center justify-center mt-2 text-xs">
                {TRENDING_KEYWORDS.map((keyword) => (
                  <span
                    key={keyword}
                    className="hover:text-white cursor-pointer"
                    onClick={() => setSearchQuery(keyword)}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side - User and Cart */}
            <div className="flex items-center gap-3 flex-shrink-0">
              {/* User icon with Tippy dropdown */}
              {isAuthenticated ? (
                <Tippy
                  content={
                    <div className='font-medium'>
                      <button
                        onClick={() => {
                          navigate('/account')
                        }}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 hover:text-[#333333] rounded"
                      >
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4" />
                          <span>Tài khoản của tôi</span>
                        </div>
                      </button>
                      <button
                        onClick={handleShopClick}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 hover:text-[#333333] rounded"
                      >
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4" />
                          <span>{shop ? 'Cửa hàng của tôi' : 'Bắt đầu bán hàng ngay!'}</span>
                        </div>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-red-600 "
                      >
                        <div className="flex items-center gap-2">
                          <LogOut className="w-4 h-4" />
                          <span>Đăng xuất</span>
                        </div>
                      </button>
                    </div>
                  }
                  interactive={true}
                  placement="bottom-end"
                  trigger="mouseenter focus"
                >
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full bg-[#a01d22] hover:bg-[#8a1a1e] flex items-center justify-center text-white transition-colors"
                    aria-label="User account"
                  >
                    <User className="w-5 h-5" />
                  </button>
                </Tippy>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/auth')}
                  className="w-10 h-10 rounded-full bg-[#a01d22] hover:bg-[#8a1a1e] flex items-center justify-center text-white transition-colors"
                  aria-label="User account"
                >
                  <User className="w-5 h-5" />
                </button>
              )}

              {/* Cart button or Login button */}
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-xl px-4 py-2 flex items-center gap-2 text-white text-sm font-medium transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Giỏ hàng</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate('/auth')}
                  className="bg-[#1a1a1a] hover:bg-[#2a2a2a] rounded-xl px-4 py-2 flex items-center gap-2 text-white text-sm font-medium transition-colors"
                >
                  <LogIn className="w-5 h-5 font-bold" />
                  <span>Đăng nhập</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
