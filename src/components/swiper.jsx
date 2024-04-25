import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import { Pagination } from 'swiper/modules';

import { SlideData } from '../assets/slideData';

const SlidePhoto = () => {
  return (
    <div className="swiper-container">
      <Swiper
      spaceBetween={30}
      slidesPerView={1}
      grabCursor={true}
      loop={true}
      pagination={{
        clickable:true,
      }}
      modules={[Pagination]}
      className='swiper-collection'
    >
      {SlideData.map((slide)=>(<SwiperSlide key={slide.id}>
        <div className="slide-cover">
          <div className="slide-info">
             <div className="title">{slide.title}</div>
             <div className="concept">{slide.content}</div>
          </div>
        </div>
        <div className="bg-photo" style={{backgroundImage: `url(${slide.backgroundImage})`}}>
        </div>
        </SwiperSlide>))}
    </Swiper>
    </div>
  )}

  export default SlidePhoto;