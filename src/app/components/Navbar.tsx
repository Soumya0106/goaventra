import { useState, useEffect, useRef } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Menu, X, ChevronDown, Search, Phone } from 'lucide-react';
import { motion, AnimatePresence } from "motion/react";
import logo from "../../../Remove background fr.png";
import { allPackages } from "../data/packages";
import { packageToDetailsPath } from "../data/packageRouting";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredPackages, setFilteredPackages] = useState<typeof allPackages>([]);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isAndroid =
    typeof navigator !== "undefined" &&
    /Android/i.test(navigator.userAgent);
  const logoSizeClass = isAndroid
    ? "h-18 sm:h-22 md:h-30"
    : "h-10 sm:h-12 md:h-30";

  const searchTransition = {
    duration: isAndroid ? 0.28 : 0.2,
    ease: [0.22, 1, 0.36, 1],
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -8, height: 0 },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: {
        duration: isAndroid ? 0.42 : 0.3,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        delayChildren: isAndroid ? 0.08 : 0.03,
        staggerChildren: isAndroid ? 0.065 : 0.04,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      height: 0,
      transition: {
        duration: isAndroid ? 0.28 : 0.22,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren",
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { opacity: 0, y: -6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isAndroid ? 0.34 : 0.22,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Packages', path: '/packages', hasDropdown: true },
    { name: 'Chardham', path: '/chardham-yatra' },
    { name: 'About', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  const packagesDropdownItems = [
    { name: 'Domestic Packages', path: '/packages?type=domestic' },
    { name: 'International Packages', path: '/packages?type=international' },
  ];

  const isActive = (path: string) => location.pathname === path;

 // Filter packages based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const matches = allPackages
        .filter(
          (pkg) =>
            pkg.title.toLowerCase().includes(query) ||
            pkg.location.toLowerCase().includes(query) ||
            pkg.category.toLowerCase().includes(query),
        )
        .slice(0, 5); // Limit to 5 suggestions
      setFilteredPackages(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setFilteredPackages([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setMobileDropdownOpen(false);
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/packages?search=${encodeURIComponent(searchQuery.trim())}`,
      );
      setShowSearch(false);
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (pkg: typeof allPackages[0]) => {
    navigate(packageToDetailsPath(pkg));
    setShowSearch(false);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center group"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src={logo}
              alt="GoAventra - Where Adventure Begins"
              className={`${logoSizeClass} w-auto object-contain transition-transform group-hover:scale-105`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.path} className="relative group">
                <Link
                  to={link.path}
                  className={`relative transition-colors flex items-center gap-1 ${
                    isActive(link.path)
                      ? "text-[#FF6B35]"
                      : "text-gray-700 hover:text-[#014D4E]"
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className="w-4 h-4" />
                  )}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FF6B35]"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {link.hasDropdown && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="w-56 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
                      {packagesDropdownItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-4 py-3 text-gray-700 hover:bg-[#FF6B35] hover:text-white transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {location.pathname !== "/" && (
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="p-2 text-gray-700 hover:text-[#014D4E] hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search packages"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
            <a
              href="tel:+917060893636"
              className="flex items-center gap-2 text-[#014D4E] hover:text-[#FF6B35] transition-colors font-medium px-2"
            >
              <Phone className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/917060893636"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF6B35] text-white px-6 py-2 rounded-full hover:bg-[#ff5722] transition-colors"
            >
              Book Now
            </a>
          </div>

          {/* Mobile Search & Menu Buttons */}
          <div className="lg:hidden flex items-center gap-2">
            {location.pathname !== "/" && (
              <button
                onClick={() => {
                  setIsOpen(false);
                  setMobileDropdownOpen(false);
                  setShowSearch((prev) => !prev);
                }}
                className="p-2 rounded-md text-gray-700 hover:text-[#014D4E] hover:bg-gray-100"
                aria-label="Search packages"
              >
                <Search className="w-6 h-6" />
              </button>
            )}
            <button
              onClick={() => {
                setShowSearch(false);
                setMobileDropdownOpen(false);
                setIsOpen((prev) => !prev);
              }}
              className="p-2 rounded-md text-gray-700 hover:text-[#014D4E] hover:bg-gray-100"
            >
              <motion.span
                initial={false}
                animate={{
                  rotate: isOpen ? 90 : 0,
                  scale: isOpen ? 0.95 : 1,
                }}
                transition={{
                  duration: isAndroid ? 0.32 : 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="block"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.span>
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar - Mobile & Desktop */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={searchTransition}
            className="relative z-50 border-t bg-white"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div ref={searchRef} className="relative">
                <form
                  onSubmit={handleSearch}
                  className="flex flex-col sm:flex-row gap-2"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                    placeholder="Search for packages (e.g., Chardham, Manali, Vietnam...)"
                    className="w-full min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#FF6B35] text-white px-6 py-2 rounded-lg hover:bg-[#ff5722] transition-colors whitespace-nowrap"
                  >
                    Search
                  </button>
                </form>

                {/* Autocomplete Suggestions Dropdown */}
                {showSuggestions &&
                  filteredPackages.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 w-full bg-white shadow-xl rounded-lg border border-gray-200 overflow-hidden z-50 sm:absolute sm:left-0 sm:right-0 sm:max-w-[560px]"
                    >
                      <div className="py-2 max-h-[55vh] overflow-y-auto">
                        {filteredPackages.map((pkg) => (
                          <button
                            key={pkg.id}
                            onClick={() =>
                              handleSuggestionClick(pkg)
                            }
                            className="w-full px-4 py-3 text-left hover:bg-[#FF6B35] hover:text-white transition-colors group"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="font-semibold text-sm">
                                  {pkg.title}
                                </div>
                                <div className="text-xs text-gray-500 group-hover:text-white/80 mt-0.5 flex items-center gap-2">
                                  <span>{pkg.location}</span>
                                  <span>&bull;</span>
                                  <span>{pkg.price}</span>
                                </div>
                              </div>
                              <Search className="w-4 h-4 text-gray-400 group-hover:text-white" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="lg:hidden bg-white border-t overflow-hidden will-change-[height,opacity,transform]"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  variants={mobileMenuItemVariants}
                >
                  {link.hasDropdown ? (
                    <div className="flex flex-col">
                      <div
                        className={`flex items-center justify-between rounded-md ${
                          isActive(link.path)
                            ? "bg-[#FF6B35] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className="flex-1 px-4 py-2"
                        >
                          {link.name}
                        </Link>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setMobileDropdownOpen(!mobileDropdownOpen);
                          }}
                          className="px-4 py-2"
                        >
                          <ChevronDown
                            className={`w-5 h-5 transition-transform ${
                              mobileDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>
                      <AnimatePresence>
                        {mobileDropdownOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-6 pr-4 py-2 space-y-2 mt-1 bg-gray-50 rounded-md">
                              {packagesDropdownItems.map((item) => (
                                <Link
                                  key={item.path}
                                  to={item.path}
                                  onClick={() => setIsOpen(false)}
                                  className="block py-2 text-gray-600 hover:text-[#FF6B35] text-sm transition-colors"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2 rounded-md ${
                        isActive(link.path)
                          ? "bg-[#FF6B35] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                variants={mobileMenuItemVariants}
                className="flex gap-3 pt-2"
              >
                <a
                  href="tel:+917060893636"
                  className="flex-1 flex items-center justify-center gap-2 border border-[#014D4E] text-[#014D4E] px-4 py-2 rounded-md hover:bg-[#014D4E] hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/917060893636"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-[#FF6B35] text-white px-4 py-2 rounded-md hover:bg-[#ff5722] transition-colors"
                >
                  Book Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
