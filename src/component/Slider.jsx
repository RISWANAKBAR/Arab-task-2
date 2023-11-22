import React, { useRef ,useEffect} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './Slider.css';

const images = [
  'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://media.istockphoto.com/id/917806594/photo/silhouettes-of-sea-piers-during-sunset-in-calicut.jpg?s=612x612&w=0&k=20&c=ndIu0AkHZrRaOFUEi_2kNDSXrnfp3GPYJkgpR9Z6Y1Y=',
  'https://images.unsplash.com/photo-1542204625-ca960ca44635?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D',
  'https://plus.unsplash.com/premium_photo-1669047670905-fa4331d07e06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1666273190872-1ad5f89e39f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDh8fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1483356256511-b48749959172?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D',
  'https://images.unsplash.com/photo-1598084991540-50ea616becbd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fGhkJTIwcGhvdG9zfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1610210144014-1e5b8e75dd42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGhkJTIwcGhvdG9zfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1606322296555-9b058f9c9fda?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGhkJTIwcGhvdG9zfGVufDB8fDB8fHww'
 
];

const CustomSlider = () => {
  const sliderRef = useRef(null);

  const NextArrow = ({ onClick }) => (
    <div className="absolute top-1/2 transform -translate-y-1/2 right-4 z-10">
      <div className="absolute-arrow" onClick={onClick}>
        <FaArrowRight />
      </div>
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="absolute top-1/2 transform -translate-y-1/2 left-4 z-10">
      <div className="absolute-arrow" onClick={onClick}>
        <FaArrowLeft />
      </div>
    </div>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    fade: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: dots => <ul style={{ bottom: '-30px' }}>{dots}</ul>,
    customPaging: i => <div className="slick-dot"></div>,
  };

  const goToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const goToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };
  

  useEffect(() => {
    const handleScroll = () => {
      if (sliderRef.current) {
        const currentSlide = sliderRef.current.innerSlider.state.currentSlide;
        const slides = document.querySelectorAll('.slick-slide');

        slides.forEach((slide, index) => {
          if (index === currentSlide) {
            const imageContainer = slide.querySelector('.image-container');
            const scrollPosition = window.pageYOffset;
            const speed = 0.5; 
            imageContainer.style.transform = `translateY(${scrollPosition * (index + 1) * speed}px)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className="max-w-7xl mx-auto h-screen overflow-hidden">
      <div className="relative h-full">
        <Slider ref={sliderRef} {...sliderSettings} className="h-full">
          {images.map((image, index) => (
            <div key={index} className="h-full relative">
              <div className="h-full flex justify-center items-center">
                <div className="image-container">
                  <img
                    src={image}
                    alt={`Slider Image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
       
      </div>
    </div>
  );
};

export default CustomSlider;
