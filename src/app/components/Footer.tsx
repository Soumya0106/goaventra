import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import logo from "../../../Remove background fr.png";

export function Footer() {
  return (
    <footer className="bg-[#014D4E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4 bg-white p-2 rounded-lg w-fit">
              <img
                src={logo}
                alt="GoAventra - Where Adventure begins!"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Your trusted travel partner for spiritual,
              adventure, and corporate tours across India and
              the world.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/goaventra"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6B35] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/GoAventra/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF6B35] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="hover:text-[#FF6B35] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-[#FF6B35] transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="text-gray-300 hover:text-[#FF6B35] transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-[#FF6B35] transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-[#FF6B35] transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation-policy"
                  className="text-gray-300 hover:text-[#FF6B35] transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-300 hover:text-[#FF6B35] transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Our Services
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link
                  to="/packages"
                  className="hover:text-[#FF6B35] transition-colors"
                >
                  Group Tours
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="hover:text-[#FF6B35] transition-colors"
                >
                  Corporate Trips
                </Link>
              </li>
              <li>
                <Link
                  to="/packages"
                  className="hover:text-[#FF6B35] transition-colors"
                >
                  Spiritual Tours
                </Link>
              </li>
              <li>
                <Link
                  to="/chardham-yatra"
                  className="hover:text-[#FF6B35] transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Chardham Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/packages?type=domestic"
                  className="hover:text-[#FF6B35] transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Domestic Packages
                </Link>
              </li>
              <li>
                <Link
                  to="/packages?type=international"
                  className="hover:text-[#FF6B35] transition-colors"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  International Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <a
                    href="tel:+917060893636"
                    className="text-gray-300 hover:text-[#FF6B35] transition-colors block"
                  > 
                    +91 7457042625
                  </a>
                  <a
                    href="tel:+917457042625"
                    className="text-gray-300 hover:text-[#FF6B35] transition-colors block"
                  >
                    +91 7060893636
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="https://wa.me/917060893636?text=Hi%20GoAventra%2C%20I%20want%20to%20inquire%20about%20a%20tour%20package."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-[#FF6B35] transition-colors"
                  >
                    WhatsApp Inquiry
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 space-y-2">
                  <div>
                    <span className="text-white font-medium text-sm">Head Office</span>
                    <p>Dehradun, Uttarakhand</p>
                  </div>
                  <div>
                    <span className="text-white font-medium text-sm">Branch Offices</span>
                    <p>Noida, Uttar Pradesh</p>
                    <p>Haridwar, Uttarakhand</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2026 GoAventra. All rights reserved. | MSME
            Registered Travel Company
          </p>
        </div>
      </div>
    </footer>
  );
}
