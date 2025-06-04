import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef } from "react";


const NewArrivals = () => {
  const scrollRef = useRef(null);

  const newArrivals = [
    {
      id: "1",
      name: "Handmade Mug",
      price: 300,
      images: [{ url: "https://picsum.photos/300/300?random=1", alt: "mug" }],
    },
    {
      id: "2",
      name: "Custom Frame",
      price: 450,
      images: [{ url: "https://picsum.photos/300/300?random=2", alt: "frame" }],
    },
    {
      id: "3",
      name: "Decor Lamp",
      price: 500,
      images: [{ url: "https://picsum.photos/300/300?random=3", alt: "lamp" }],
    },
    {
      id: "4",
      name: "Painting",
      price: 1200,
      images: [{ url: "https://picsum.photos/300/300?random=4", alt: "art" }],
    },
    {
      id: "5",
      name: "Jewelry Box",
      price: 350,
      images: [{ url: "https://picsum.photos/300/300?random=5", alt: "box" }],
    },
    {
      id: "6",
      name: "Jewelry Box",
      price: 360,
      images: [{ url: "https://picsum.photos/300/300?random=6", alt: "box" }],
    },
    {
      id: "7",
      name: "Jewelry Box",
      price: 370,
      images: [{ url: "https://picsum.photos/300/300?random=7", alt: "box" }],
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">New Arrivals!!</h2>
        <p className="text-gray-600 text-lg max-w-xl mx-auto">
          Discover handpicked, thoughtful gifts to surprise your loved ones.
        </p>
      </div>

      {/* Scroll Buttons */}
      <div className="flex justify-end mb-6 gap-3 pr-10">
        <button
          onClick={() => scroll("left")}
          className="p-2 rounded-full bg-white shadow-md hover:scale-110 transform transition border"
        >
          <FiChevronLeft className="text-2xl text-gray-700" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-2 rounded-full bg-white shadow-md hover:scale-110 transform transition border"
        >
          <FiChevronRight className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Scrollable Product Cards */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto px-6 no-scrollbar"
      >
        {newArrivals.map((product) => (
          <div
            key={product.id}
            className="relative min-w-[260px] h-72 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 group"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.alt || product.name}
              className="w-full h-full object-cover"
            />
            {/* Glassy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-opacity flex flex-col justify-end p-5">
              <h3 className="text-white text-xl font-semibold mb-1 drop-shadow opacity-90">
                {product.name}
              </h3>
              <p className="text-white text-sm font-medium opacity-75">
                ₹{product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
