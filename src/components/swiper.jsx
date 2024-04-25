import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import { Pagination, FreeMode } from 'swiper/modules';

import { SlideData } from '../assets/slideData';

const SlidePhoto = () => {
  return (
    <div className="swiper-container">
      <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      FreeMode={true}
      Pagination={{
        clickable :true,
      }}
      modules={[Pagination, FreeMode]}
      className='swiper'
    >
      {SlideData.map((slide)=>{})}
    </Swiper>
    </div>
  )}

  export default SlidePhoto;