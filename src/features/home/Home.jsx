import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
import MainBannerSlider from "./components/MainBannerSlider";
import DoubleBannerSlider from "./components/DoubleBannerSlider";
import SuggestionSlider from "./components/SuggestionSlider";

const Home = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/auth");
    } catch (error) {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Banner Container */}
      <div className="relative w-full max-w-[1200px] mx-auto px-4 pt-3">
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0 mt-2">
          <img
            src="https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/desk_header_bg_4f3ea8bade.png"
            alt="Background Banner"
            className="w-full h-full object-cover opacity-50 rounded-lg "
          />
        </div>

        {/* Banner Slider */}
        <MainBannerSlider />

        {/* Double Banner Slider */}
        <DoubleBannerSlider />
      </div>

      {/* Gợi ý cho bạn */}
      <div className="w-full max-w-[1200px] mx-auto px-4 pt-6">
        <SuggestionSlider />
      </div>
      {/* Content section */}
      <div className="py-8">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Chào mừng đến với FPT Shop
            </h1>

            {isAuthenticated && user && (
              <div className="mb-6">
                <p className="text-lg text-gray-600">
                  Xin chào,{" "}
                  <span className="font-semibold text-fpt">
                    {user.name || user.email}
                  </span>
                  !
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Bạn đã đăng nhập thành công.
                </p>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Đang đăng xuất..." : "Đăng xuất"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
