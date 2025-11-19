import { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/free-mode'

const SuggestionSlider = () => {
  const suggestionSwiperRef = useRef(null)
  const [suggestionProgress, setSuggestionProgress] = useState(0)

  const items = [
    { name: "Máy lạnh - Điều hòa", img: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/may_lanh_dieu_hoa_ic_cate_204819f085.png" },
    { name: "Máy sấy quần áo", img: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/may_say_ic_cate_355e1c0ea8.png" },
    { name: "Máy lọc không khí", img: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/may_loc_kk_ic_cate_9a77f25fcd.png" },
    { name: "Quạt máy", img: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/quat_ic_cate_4bf361e783.png" },
    { name: "Quạt điều hòa", img: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/quat_dieu_hoa_ic_cate_b7c610abb3.png" },
    { name: "Tivi", img: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/tivo_ic_cate_5c09363832.png" },
    { name: "Nồi cơm điện", img: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/noi_com_dien_ic_cate_76de187736.png" },
    { name: "Nồi lẩu điện", img: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/noi_lau_dien_ic_cate_648e6596b2.png" },
    { name: "Màn hình", img: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/man_hinh_ic_cate_7663908793.png" },
    { name: "Laptop", img: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/laptop_ic_cate_47e7264bc7.png" },
    { name: "Máy lọc không khí", img: "https://cdn2.fptshop.com.vn/unsafe/180x0/filters:format(webp):quality(75)/may_loc_kk_ic_cate_9a77f25fcd.png" },
    { name: "Máy tính bảng", img: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/may_tinh_bang_ic_cate_dccb57ff5c.png" },
    { name: "Điện thoại", img: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/dien_thoai_icon_cate_240938806d.png" },
    { name: "Tủ lạnh", img: "https://cdn2.fptshop.com.vn/unsafe/360x0/filters:format(webp):quality(75)/tu_lanh_ic_cate_da7eb46bd7.png" },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 pb-8 relative">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Gợi ý cho bạn</h2>
      
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        spaceBetween={16}
        freeMode={true}
        className="relative overflow-visible"
        onSwiper={(swiper) => (suggestionSwiperRef.current = swiper)}
        onProgress={(swiper, progress) => {
          setSuggestionProgress(progress)
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} style={{ width: 'auto' }} className="overflow-visible">
            <div className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform duration-300 min-w-[120px] pb-2">
              <div className="rounded-lg p-4 mb-2 w-24 h-24 flex items-center justify-center overflow-hidden">
                <img
                  src={item.img || ''}
                  className="w-full h-full object-contain"
                  alt={item.name}
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              <p className="text-sm text-center text-dark font-medium">{item.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        onClick={() => suggestionSwiperRef.current?.slidePrev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button
        onClick={() => suggestionSwiperRef.current?.slideNext()}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-lg transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-40 h-1.5 rounded-full z-10 bg-gray-200/60 backdrop-blur-sm overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 rounded-full transition-all duration-500 ease-out shadow-sm relative"
          style={{ width: `${suggestionProgress * 100}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export default SuggestionSlider

