import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
import { useSlider } from "../Context/SliderContext";

function SliderComponent() {
  const classes = useSlider();

  const settings = {
    className: "",
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {classes.map((image, index) => (
          <div key={index} className="slide-wrapper">
            <img src={image.img} alt={`Slide ${index + 1}`} />
            <h3>{image.title}</h3>
            <p className="slide-minutes">{image.duration}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderComponent;
