import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t py-12 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Newsletter Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Join Our Newsletter</h3>
            <p className="mb-2">
              Be the first to hear about new products, exclusive events, and online offers.
            </p>
            <p className="mb-6">Sign up and get <span className="font-semibold text-black">10% off</span> your first order.</p>
            <form className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-auto flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Links and Social */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Shop Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><Link to="/arts" className="hover:text-black transition">Arts</Link></li>
                <li><Link to="/gifts" className="hover:text-black transition">Gifts</Link></li>
                <li><Link to="/decor" className="hover:text-black transition">Handcrafted Decor</Link></li>
                <li><Link to="/diy" className="hover:text-black transition">DIY & Craft Kits</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Support</h4>
              <ul className="space-y-2">
                <li><Link to="/contact" className="hover:text-black transition">Contact</Link></li>
                <li><Link to="/about" className="hover:text-black transition">About Us</Link></li>
                <li><Link to="/faq" className="hover:text-black transition">FAQs</Link></li>
                <li><Link to="/features" className="hover:text-black transition">Features</Link></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow Us</h4>
              <div className="flex items-center space-x-4 mb-4">
                <a href="#" className="hover:text-black"><TbBrandMeta className="h-5 w-5" /></a>
                <a href="#" className="hover:text-black"><IoLogoInstagram className="h-5 w-5" /></a>
                <a href="#" className="hover:text-black"><RiTwitterXLine className="h-5 w-5" /></a>
              </div>
              <p className="text-gray-500">Call Us</p>
              <p className="text-gray-700 font-medium">
                <FiPhoneCall className="inline-block mr-2" />
                9502832073
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t pt-6 text-center text-gray-500 text-xs">
          &copy; 2025, <span className="font-medium">CompileTab</span>. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
