import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const DoubleBannerSlider = () => {
  const doubleSwiperRef = useRef(null)

  const banners = [
    "https://cdn2.fptshop.com.vn/unsafe/1240x0/filters:format(webp):quality(75)/H2_612x212_4e4bd1c0b9.png",
    "https://cdn2.fptshop.com.vn/unsafe/1240x0/filters:format(webp):quality(75)/H2_614x212_5a5f25e815.png",
    "https://cdn2.fptshop.com.vn/unsafe/1240x0/filters:format(webp):quality(75)/H2_614x212_f5ea435cad.png",
    "https://cdn2.fptshop.com.vn/unsafe/1240x0/filters:format(webp):quality(75)/H2_614x212_f7a2ad98eb.png",
  ]

  return (
    <div className="relative pt-4 rounded-lg overflow-hidden z-10">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={2}
        spaceBetween={10}
        slidesPerGroup={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        className="rounded-lg"
        onSwiper={(swiper) => (doubleSwiperRef.current = swiper)}
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner}
              alt={`Double Banner ${index + 1}`}
              className="rounded-lg w-full h-auto object-cover max-h-[180px] shadow-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        onClick={() => doubleSwiperRef.current?.slidePrev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-lg transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button
        onClick={() => doubleSwiperRef.current?.slideNext()}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow-lg transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>
    </div>
  )
}

export default DoubleBannerSlider

