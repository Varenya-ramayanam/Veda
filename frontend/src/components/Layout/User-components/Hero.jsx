import { Link } from "react-router-dom";
import heroImg from "../../../assets/images/heroImg.webp";

const Hero = () => {
  return (
    <section className="relative">
      {/* Hero Image */}
      <img
        src={heroImg}
        alt="Hero background - gifts and arts"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase mb-4 drop-shadow-xl">
            Gifts & Arts
          </h1>
          <p className="text-base md:text-xl lg:text-2xl font-light tracking-wide mb-6">
            Handpicked creations just for you.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-gray-900 px-6 py-3 rounded-md text-lg font-medium shadow hover:bg-gray-100 transition-all"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
