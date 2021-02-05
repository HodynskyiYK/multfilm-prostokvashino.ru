import React from "react";
import SidebarSliderItem from "./SidebarSliderItem";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Autoplay]);

function SidebarSlider({slides}) {

    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false
            }}
        >
            {
                slides.map(item => (
                    <SwiperSlide key={item.id}>
                        <SidebarSliderItem match={item} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default SidebarSlider;