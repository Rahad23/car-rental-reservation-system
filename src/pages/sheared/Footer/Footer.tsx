import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="dark bg-gray-900 text-gray-200 py-6 mt-40">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">© 2024 Eco-shop. All rights reserved.</p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <div className="flex gap-x-4">
            <Link
              to="/termsOfService"
              className="font-semibold text-gray-400 hover:text-gray-100 transition-colors"
            >
              <span className="">Terms of Service</span>
            </Link>
            <Link
              to="/"
              className="font-semibold text-gray-400 hover:text-gray-100 transition-colors"
            >
              <span className="">privacy policy</span>
            </Link>
          </div>
          <a
            href="https://www.facebook.com/DeveloperRahadhasan/"
            target="_blank"
            className="text-gray-400 hover:text-gray-100 transition-colors"
          >
            <FaFacebook className="h-6 w-6 text-white" />
            <span className="sr-only">Facebook</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
