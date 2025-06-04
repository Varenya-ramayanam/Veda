import { Link } from "react-router-dom";
import gifts from "../../assets/images/gifts.webp";
import arts from "../../assets/images/arts.webp";

const Collection = () => {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gifts Collection */}
        <div className="relative group overflow-hidden rounded-lg shadow-lg">
          <img
            src={gifts}
            alt="Gifts collection"
            className="w-full h-[500px] object-cover transform group-hover:scale-105 transition duration-300 ease-in-out"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-6 rounded">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gifts Collection</h2>
            <Link
              to="/collections/all?type=gifts"
              className="text-gray-900 underline hover:text-gray-700 transition"
            >
              Shop now
            </Link>
          </div>
        </div>

        {/* Arts Collection */}
        <div className="relative group overflow-hidden rounded-lg shadow-lg">
          <img
            src={arts}
            alt="Arts collection"
            className="w-full h-[500px] object-cover transform group-hover:scale-105 transition duration-300 ease-in-out"
          />
          <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm p-6 rounded">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Arts Collection</h2>
            <Link
              to="/collections/all?type=arts"
              className="text-gray-900 underline hover:text-gray-700 transition"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collection;
