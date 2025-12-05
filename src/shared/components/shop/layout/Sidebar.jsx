import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Store, 
  BarChart3, 
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react'

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [openDropdowns, setOpenDropdowns] = useState({})

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Tổng quan',
      icon: LayoutDashboard,
      path: '/shop/my-shop',
      hasDropdown: false
    },
    {
      id: 'products',
      label: 'Sản phẩm',
      icon: Package,
      hasDropdown: true,
      items: [
        { label: 'Danh sách sản phẩm', path: '/shop/products' },
        { label: 'Thêm sản phẩm mới', path: '/shop/products/create' },
        { label: 'Danh mục sản phẩm', path: '/shop/products/categories' }
      ]
    },
    {
      id: 'orders',
      label: 'Đơn hàng',
      icon: ShoppingBag,
      hasDropdown: true,
      items: [
        { label: 'Tất cả đơn hàng', path: '/shop/orders' },
        { label: 'Đang xử lý', path: '/shop/orders/pending' },
        { label: 'Đã hoàn thành', path: '/shop/orders/completed' }
      ]
    },
    {
      id: 'shop',
      label: 'Shop',
      icon: Store,
      hasDropdown: true,
      items: [
        { label: 'Thông tin shop', path: '/shop/my-shop' },
        { label: 'Cài đặt shop', path: '/shop/settings' }
      ]
    },
    {
      id: 'analytics',
      label: 'Thống kê',
      icon: BarChart3,
      path: '/shop/analytics',
      hasDropdown: false
    },
    {
      id: 'settings',
      label: 'Cài đặt',
      icon: Settings,
      path: '/shop/settings',
      hasDropdown: false
    }
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  const isParentActive = (items) => {
    return items?.some(item => location.pathname === item.path)
  }

  const handleItemClick = (item) => {
    if (item.path) {
      navigate(item.path)
    } else if (item.hasDropdown) {
      toggleDropdown(item.id)
    }
  }

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo/Title */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Store className="w-6 h-6 text-[#a01d22]" />
          <h2 className="text-xl font-bold">Shop Panel</h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2 mt-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isOpen = openDropdowns[item.id]
          const active = item.path ? isActive(item.path) : isParentActive(item.items)

          return (
            <div key={item.id}>
              {/* Main Menu Item */}
              <button
                onClick={() => handleItemClick(item)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                  active
                    ? 'bg-[#a01d22] text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                {item.hasDropdown && (
                  <div className="transition-transform duration-200">
                    {isOpen ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                )}
              </button>

              {/* Dropdown Items */}
              {item.hasDropdown && (
                <div
                  className={`ml-4 mt-1 space-y-1 border-l-2 border-gray-700 pl-2 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="py-1">
                    {item.items?.map((subItem, index) => {
                      const subActive = isActive(subItem.path)
                      return (
                        <button
                          key={index}
                          onClick={() => navigate(subItem.path)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            subActive
                              ? 'bg-gray-700 text-white'
                              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                          }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-current" />
                          <span>{subItem.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

