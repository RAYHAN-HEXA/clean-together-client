import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import SectionHeader from "../../Component/Shared/SectionHeader";
import { Typewriter } from "react-simple-typewriter";

const reviews = [
  {
    id: 1,
    name: "Sadia Hossain",
    photo: "https://randomuser.me/api/portraits/women/25.jpg",
    review:
      "A massive commercial complex is being constructed illegally on land designated for residential purposes only. ",
    rating: 5,
  },
  {
    id: 2,
    name: "Arif Mahmud",
    photo: "https://randomuser.me/api/portraits/men/33.jpg",
    review:
      "A rapidly expanding sinkhole has developed on the Dhaka-Mymensingh highway, creating extreme danger for daily commuters.",
    rating: 4,
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    photo: "https://randomuser.me/api/portraits/women/12.jpg",
    review:
      "The public children's park at Shahbagh has been severely vandalized, rendering most play equipment unusable and dangerous.",
    rating: 5,
  },
  {
    id: 4,
    name: "Tanvir Alam",
    photo: "https://randomuser.me/api/portraits/men/52.jpg",
    review:
      "The platform runs smoothly, and the browsing experience is top-notch. Highly recommended for toy enthusiasts!",
    rating: 4,
  },
  {
    id: 5,
    name: "Mahi Rahman",
    photo: "https://randomuser.me/api/portraits/women/60.jpg",
    review:
      "A residential building has illegally converted its rooftop into a commercial restaurant without proper permits.",
    rating: 5,
  },
];

const Review = () => {
  return (
    <section className="py-12 md:py-16 lg:pb-20 bg-base-200">
      <div className="container mx-auto px-4 text-center">
        <div className="text-3xl md:text-4xl lg:text-4xl  leading-tight text-center mt-4">
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold  mt-4">
            What Our
            <span className="text-primary">
              <Typewriter
                words={[
                  " Reporters Say",
                  " Citizens Say",
                  " Community Members Say",
                ]}
                loop={true}
                cursor
                cursorStyle="_"
                typeSpeed={100}
                deleteSpeed={60}
                delaySpeed={1300}
              />
            </span>
          </h2>
          <p className="text-base md:text-lg text-base-content/70 max-w-2xl mx-auto pt-3 pb-6 text-center">
            Together, we’re creating a cleaner, greener, and more responsible
            Bangladesh — one action at a time.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation
          loop
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-20"
        >
          {reviews.map((rev) => (
            <SwiperSlide key={rev.id}>
              <div className="p-6 border-t-4 border-primary/60 hover:border-primary text-center group card w-full  rounded-lg  transform transition-all duration-300 hover:-translate-y-[-1px] shadow-xl hover:shadow-2xl bg-base-100  min-h-[370px] flex flex-col justify-between items-center">
                <FaQuoteLeft className="text-4xl text-primary/70 hover:text-primary mb-3" />

                <p className="text-base-content/80 italic leading-relaxed mb-4 px-2">
                  “{rev.review}”
                </p>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} className="text-secondary" />
                  ))}
                </div>

                <img
                  src={rev.photo}
                  alt={rev.name}
                  className="w-16 h-16 rounded-full border-4 border-primary object-cover mb-2"
                />

                <h4 className="font-semibold text-primary text-lg">
                  {rev.name}
                </h4>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Review;
