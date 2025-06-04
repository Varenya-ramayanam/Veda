import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const TopBar = () => {
  return (
    <div className="bg-[#ea2e0e] text-white">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 text-sm">
        {/* Left: Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" aria-label="Meta" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-gray-300">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>

        {/* Center: Message */}
        <div className="flex-1 text-center">
          <span>We Ship throughout India - Fast and reliable Shipping!</span>
        </div>

        {/* Right: Contact */}
        <div className="hidden md:block">
          <a href="tel:+919573795028" className="hover:text-gray-300">
            +91 9573795028
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
