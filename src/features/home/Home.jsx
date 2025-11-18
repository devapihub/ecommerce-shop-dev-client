import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      navigate('/auth')
    } catch (error) {
      navigate('/auth')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Chào mừng đến với FPT Shop
          </h1>
          
          {isAuthenticated && user && (
            <div className="mb-6">
              <p className="text-lg text-gray-600">
                Xin chào, <span className="font-semibold text-fpt">{user.name || user.email}</span>!
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Bạn đã đăng nhập thành công.
              </p>
              <button
                onClick={handleLogout}
                disabled={loading}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Đang đăng xuất...' : 'Đăng xuất'}
              </button>
            </div>
          )}

        
        </div>
      </div>
    </div>
  )
}

export default Home

