import { HiArrowPathRoundedSquare, HiOutlineCreditCard, HiShoppingBag } from 'react-icons/hi2';

const features = [
  {
    icon: <HiShoppingBag className="text-3xl text-green-600" />,
    title: "Free Shipping for orders over $100",
    description: "On all orders over $100, we offer free shipping to ensure you get your products without any extra cost.",
  },
  {
    icon: <HiArrowPathRoundedSquare className="text-3xl text-green-600" />,
    title: "10 Days Easy Returns",
    description: "We offer a hassle-free 10-day return policy on all our products, ensuring your satisfaction with every purchase.",
  },
  {
    icon: <HiOutlineCreditCard className="text-3xl text-green-600" />,
    title: "Secure Checkout",
    description: "Our checkout process is secure and encrypted, ensuring your payment information is safe and protected.",
  },
];

const FeaturesSelection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center px-6 py-8 rounded-xl hover:shadow-lg transition duration-300 group"
          >
            <div className="p-4 bg-green-100 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110">
              {feature.icon}
            </div>
            <h4 className="text-lg font-semibold mb-2 text-gray-800">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSelection;
