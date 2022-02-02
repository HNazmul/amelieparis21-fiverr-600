import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import about from "../../../assets/images/about.png";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { InlineIcon } from "@iconify/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { aboutSliderDatas } from "./../../../data/AboutUsSliderData";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const AboutUS = () => {
  const handlePopUp = (value, text) => {
    if (value === "true") {
      swal(
       text
      );
    }
  };

  return (
    <div id="about_area">
      <div className="container">
        <div className="aboutTop">
          <img src={about} alt="" />
          <h2>What people from our community</h2>
        </div>

        <div>
          <Swiper
            breakpoints={{
              // when window width is <= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 150,
              },
              // when window width is <= 480px
              480: {
                slidesPerView: 1,
                spaceBetween: 150,
              },

              // when window width is <= 640px
              640: {
                slidesPerView: 2,
                spaceBetween: 140,
              },

              // when window width is <= 768px
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            navigation={true}
            pagination={true}
            style={{ padding: "0 10px" }}
          >
            {aboutSliderDatas.map((data, index) => (
              <SwiperSlide key={index} className="slider_cart">
                <div className="cartInfo">
                  <div>
                    <InlineIcon
                      className="userIcon"
                      icon={"carbon:user-avatar-filled-alt"}
                    />
                  </div>

                  <div className="personalInfo">
                    <h6>
                      {data.name} <span className="rating">{data.rating}</span>
                    </h6>

                    <div className="starIcon">
                      <InlineIcon icon={"ant-design:star-filled"} />
                      <InlineIcon icon={"ant-design:star-filled"} />
                      <InlineIcon icon={"ant-design:star-filled"} />
                      <InlineIcon icon={"ant-design:star-filled"} />
                      <InlineIcon icon={"ant-design:star-outlined"} />
                    </div>
                  </div>
                </div>

                <div className="cartText">
                  <p>{data?.text.slice(0,125)} ...  <span onClick={() => handlePopUp("true", data?.text)}>See More</span></p>
                </div>
              </SwiperSlide>
            ))}
            {/* <SwiperSlide className="slider_cart">
              <div className="cartInfo">
                <div>
                  <InlineIcon
                    className="userIcon"
                    icon={"carbon:user-avatar-filled-alt"}
                  />
                </div>

                <div className="personalInfo">
                  <h6>
                    Nam Janinah <span className="rating">4.5</span>
                  </h6>

                  <div className="starIcon">
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-outlined"} />
                  </div>
                </div>
              </div>

              <div className="cartText">
                <p>
                  sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. At vero eos et accusa
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slider_cart">
              <div className="cartInfo">
                <div>
                  <InlineIcon
                    className="userIcon"
                    icon={"carbon:user-avatar-filled-alt"}
                  />
                </div>

                <div className="personalInfo">
                  <h6>
                    Nam Janinah <span className="rating">4.5</span>
                  </h6>

                  <div className="starIcon">
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-outlined"} />
                  </div>
                </div>
              </div>

              <div className="cartText">
                <p>
                  sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. At vero eos et accusa
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slider_cart">
              <div className="cartInfo">
                <div>
                  <InlineIcon
                    className="userIcon"
                    icon={"carbon:user-avatar-filled-alt"}
                  />
                </div>

                <div className="personalInfo">
                  <h6>
                    Nam Janinah <span className="rating">4.5</span>
                  </h6>

                  <div className="starIcon">
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-outlined"} />
                  </div>
                </div>
              </div>

              <div className="cartText">
                <p>
                  sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. At vero eos et
                  accusa....
                  <span onClick={() => handlePopUp("true")}>See More</span>
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slider_cart">
              <div className="cartInfo">
                <div>
                  <InlineIcon
                    className="userIcon"
                    icon={"carbon:user-avatar-filled-alt"}
                  />
                </div>

                <div className="personalInfo">
                  <h6>
                    Nam Janinah <span className="rating">4.5</span>
                  </h6>

                  <div className="starIcon">
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-outlined"} />
                  </div>
                </div>
              </div>

              <div className="cartText">
                <p>
                  sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. At vero eos et accusa
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide className="slider_cart">
              <div className="cartInfo">
                <div>
                  <InlineIcon
                    className="userIcon"
                    icon={"carbon:user-avatar-filled-alt"}
                  />
                </div>

                <div className="personalInfo">
                  <h6>
                    Nam Janinah <span className="rating">4.5</span>
                  </h6>

                  <div className="starIcon">
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-filled"} />
                    <InlineIcon icon={"ant-design:star-outlined"} />
                  </div>
                </div>
              </div>

              <div className="cartText">
                <p>
                  sed diam nonumy eirmod tempor invidunt ut labore et dolore
                  magna aliquyam erat, sed diam voluptua. At vero eos et accusa
                </p>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
