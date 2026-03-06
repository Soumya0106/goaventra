import { motion } from "motion/react";
import {
  MapPin,
  Calendar,
  Users,
  Utensils,
  Car,
  Hotel,
  Camera,
  ArrowRight,
  Send,
  Loader2,
  SearchX,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { ImageWithFallback } from "../components/media/ImageWithFallback";
import { useState, FormEvent, useEffect, useRef } from "react";
import {
  internationalPackages,
  domesticPackages,
} from "../data/packages";
import { packageToDetailsPath } from "../data/packageRouting";

const inclusionIcons: Record<string, any> = {
  Meals: Utensils,
  Transport: Car,
  Stay: Hotel,
  Sightseeing: Camera,
  "Team Activities": Users,
};

export function PackagesPage() {
  const [searchParams] = useSearchParams();
  const rawSearchQuery = searchParams.get("search") || "";
  const isInternationalSearch = rawSearchQuery.trim().toLowerCase() === "international";

  const packageType =
    searchParams.get("type") === "international" || isInternationalSearch
      ? "international"
      : "domestic";
  const searchQuery = isInternationalSearch ? "" : rawSearchQuery;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",  
    package: "",
    travelDate: "",
    travelers: "",
    customPackage: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const inquirySectionRef = useRef<HTMLElement | null>(null);
  const packagesSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.title = packageType === "international"
      ? "International Tour Packages | GoAventra"
      : "Domestic Tour Packages | GoAventra";
  }, [packageType]);

  // Filter packages based on search query
  const filterPackagesBySearch = (packages: any[]) => {
    if (!searchQuery) return packages;

    const query = searchQuery.toLowerCase();
    return packages.filter(
      (pkg) =>
        pkg.title.toLowerCase().includes(query) ||
        pkg.location.toLowerCase().includes(query) ||
        pkg.category.toLowerCase().includes(query),
    );
  };

  // Get packages based on type and search
  const getDisplayPackages = () => {
    let packages =
      packageType === "international"
        ? internationalPackages
        : domesticPackages;
    return filterPackagesBySearch(packages);
  };

  const displayPackages = getDisplayPackages();

  const handleGoToInquiry = () => {
    inquirySectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleGoToPackages = () => {
    packagesSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    if (displayPackages.length > 0) {
      setTimeout(handleGoToPackages, 100);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      package: prev.package || searchQuery,
      message:
        prev.message ||
        `Hi GoAventra, I searched for "${searchQuery}" but couldn't find it. Please suggest similar options and pricing.`,
    }));

    // Scroll to inquiry section if no packages found
    setTimeout(handleGoToInquiry, 100);
  }, [searchQuery, displayPackages.length]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const message = `*New Package Inquiry from GoAventra Website*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Package:* ${formData.package || "Not specified"}\n*Preferred Travel Date:* ${formData.travelDate || "Not specified"}\n*Travelers:* ${formData.travelers || "Not specified"}\n*Custom Package / Destination:* ${formData.customPackage || "Not specified"}\n*Message:* ${formData.message}`;
      const whatsappUrl = `https://wa.me/917060893636?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank");

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        package: "",
        travelDate: "",
        travelers: "",
        customPackage: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to redirect to WhatsApp:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    if (e.target.name === "customPackage") {
      const nextCustomPackage = e.target.value;
      setFormData((prev) => ({
        ...prev,
        customPackage: nextCustomPackage,
        package:
          nextCustomPackage.trim().length > 0
            ? "Custom Package"
            : prev.package === "Custom Package"
              ? ""
              : prev.package,
      }));
      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[420px] md:h-[480px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920"
            alt="Tour Packages"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#014D4E]/90 to-[#014D4E]/50" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-block bg-[#FF6B35]/90 backdrop-blur-sm px-5 py-2 rounded-full mb-5 text-sm font-medium"
            >
              ✈️ {packageType === "international" ? "International Tours" : "Domestic Tours"}
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
              Explore Our Tour Packages
            </h1>
            <p className="text-xl md:text-2xl mb-3 text-gray-100 font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
              Curated Travel Experiences
            </p>
            <p className="text-base md:text-lg text-gray-200/90">
              Discover thoughtfully curated travel experiences across India and beyond.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section ref={packagesSectionRef} className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center gap-4">
            {searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4"
              >
                <p className="text-center text-blue-800">
                  Showing search results for:{" "}
                  <span className="font-semibold">
                    "{searchQuery}"
                  </span>{" "}
                  ({displayPackages.length}{" "}
                  {displayPackages.length === 1
                    ? "package"
                    : "packages"}{" "}
                  found)
                </p>
                <Link
                  to="/packages?type=domestic"
                  className="text-sm text-blue-600 hover:underline block text-center mt-2"
                >
                  Clear search
                </Link>
              </motion.div>
            )}

            <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
              <Link
                to="/packages?type=domestic"
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                  packageType === "domestic"
                    ? "bg-[#014D4E] text-white"
                    : "text-gray-700 hover:text-[#014D4E]"
                }`}
              >
                Domestic
              </Link>
              <Link
                to="/packages?type=international"
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                  packageType === "international"
                    ? "bg-[#014D4E] text-white"
                    : "text-gray-700 hover:text-[#014D4E]"
                }`}
              >
                International
              </Link>
            </div>
          </div>

          {displayPackages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="mb-4 flex justify-center">
                  <SearchX
                    className="h-14 w-14 text-[#014D4E]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-2xl text-[#014D4E] mb-4">
                  No packages found
                </h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any packages matching "
                  {searchQuery}". Try searching with different
                  keywords or browse all our packages.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleGoToInquiry}
                    className="inline-flex items-center bg-[#FF6B35] text-white px-6 py-3 rounded-full hover:bg-[#ff5722] transition-colors"
                  >
                    Continue to Inquiry
                    <Send className="ml-2 w-4 h-4" />
                  </button>
                  <Link
                    to="/packages?type=domestic"
                    className="inline-flex items-center bg-white text-[#014D4E] border border-[#014D4E] px-6 py-3 rounded-full hover:bg-[#014D4E] hover:text-white transition-colors"
                  >
                    View All Packages
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Show International Packages when type=international */}
              {packageType === "international" && (
                <div
                  id="international"
                  className={
                    packageType === "international"
                      ? ""
                      : "mb-16"
                  }
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl md:text-4xl text-[#014D4E] mb-4">
                      International Packages
                    </h2>
                    <p className="text-lg text-gray-600">
                      Explore the world with our curated
                      international travel experiences
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayPackages.map((pkg, index) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1,
                        }}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group flex flex-col h-full"
                      >
                        {/* Image Section */}
                        <div className="relative h-64 overflow-hidden">
                          <ImageWithFallback
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          
                          {/* Trending Badge */}
                          {pkg.featured && (
                            <div className="absolute top-4 left-4 bg-[#FF6B35] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
                              Trending
                            </div>
                          )}
                          
                          {/* GoAventra Branding */}
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-2xl text-[#014D4E] mb-2">
                            {pkg.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 flex-grow">
                            {pkg.description || 'Discover amazing destinations'}
                          </p>
                          
                          {pkg.id !== 1 && (
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">{pkg.duration}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Starting from</p>
                              <p className="text-2xl font-extrabold text-green-600 leading-none mt-1">{pkg.price}</p>
                            </div>
                          </div>
                          )}

                          <Link
                            to={packageToDetailsPath(pkg)}
                            className="block w-full bg-[#FF6B35] text-white text-center py-3 rounded-full hover:bg-[#ff5722] transition-colors font-semibold"
                          >
                            Explore Package
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Show Domestic Packages when type=domestic */}
              {packageType === "domestic" && (
                <div id="domestic">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl md:text-4xl text-[#014D4E] mb-4">
                      Domestic Travel Experiences
                    </h2>
                    <p className="text-lg text-gray-600">
                      Explore India's most loved destinations with flexible and customizable itineraries.
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayPackages.map((pkg, index) => (
                      <motion.div
                        key={pkg.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1,
                        }}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group flex flex-col h-full"
                      >
                        {/* Image Section */}
                        <div className="relative h-64 overflow-hidden">
                          <ImageWithFallback
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                          
                          {/* Trending Badge */}
                          {pkg.featured && (
                            <div className="absolute top-4 left-4 bg-[#FF6B35] text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide">
                              Trending
                            </div>
                          )}
                          
                          {/* GoAventra Branding */}
                        </div>

                        {/* Content Section */}
                        <div className="p-6 flex flex-col flex-grow">
                          <h3 className="text-2xl text-[#014D4E] mb-2">
                            {pkg.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 flex-grow">
                            {pkg.description || 'Discover amazing destinations'}
                          </p>
                          
                          {pkg.id !== 1 && (
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">{pkg.duration}</span>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-400 uppercase tracking-wide">Starting from</p>
                              <p className="text-2xl font-extrabold text-green-600 leading-none mt-1">{pkg.price}</p>
                            </div>
                          </div>
                          )}

                          <Link
                            to={packageToDetailsPath(pkg)}
                            className="block w-full bg-[#FF6B35] text-white text-center py-3 rounded-full hover:bg-[#ff5722] transition-colors font-semibold"
                          >
                            {pkg.id === 1 ? 'Explore Packages' : 'Explore Package'}
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Custom Package CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 bg-gradient-to-r from-[#014D4E] to-[#0F766E] rounded-2xl p-8 md:p-12 text-white text-center"
                  >
                    <h2 className="text-3xl md:text-4xl mb-4">
                      Looking for a Custom Package?
                    </h2>
                    <p className="text-xl text-gray-200 mb-8">
                      We can create a personalized itinerary
                      just for you! Contact us to discuss your
                      dream vacation.
                    </p>
                    <a
                      href="https://wa.me/917060893636"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-[#FF6B35] text-white px-8 py-4 rounded-full text-lg hover:bg-[#ff5722] transition-colors"
                    >
                      Customize Your Package
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </motion.div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Send Us a Message Section */}
      <section
        ref={inquirySectionRef}
        id="package-inquiry"
        className="pt-6 pb-16 md:pt-8 md:pb-20 bg-white"

      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl text-[#014D4E] mb-4">
              Share Your Travel Requirements
            </h2>
            <p className="text-lg text-gray-600">
              Share your travel details and we will open
              WhatsApp with a ready-to-send inquiry.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-gray-50 rounded-2xl p-8 md:p-10 shadow-lg"
          >
            <div className="mb-6 p-4 rounded-xl border border-[#FF6B35]/20 bg-[#FF6B35]/5 text-sm text-[#014D4E]">
              Your information is used only to generate your WhatsApp inquiry message and is not stored.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                  placeholder="+91 XXXXXXXXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="package"
                  className="block text-gray-700 mb-2"
                >
                  Package Interest
                </label>
                <select
                  id="package"
                  name="package"
                  value={formData.package}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all bg-white"
                >
                  {searchQuery &&
                    displayPackages.length === 0 && (
                      <option value={searchQuery}>
                        Searched package: {searchQuery}
                      </option>
                    )}
                  <option value="">Select a package</option>
                  <option value="Custom Package">
                    Custom Package
                  </option>
                  <optgroup label="Domestic Packages">
                    {domesticPackages.map((pkg) => (
                      <option key={pkg.id} value={pkg.title}>
                        {pkg.title}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="International Packages">
                    {internationalPackages.map((pkg) => (
                      <option key={pkg.id} value={pkg.title}>
                        {pkg.title}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label
                  htmlFor="travelDate"
                  className="block text-gray-700 mb-2"
                >
                  Preferred Travel Date
                </label>
                <input
                  type="date"
                  id="travelDate"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="travelers"
                  className="block text-gray-700 mb-2"
                >
                  Number of Travelers
                </label>
                <input
                  type="number"
                  id="travelers"
                  name="travelers"
                  value={formData.travelers}
                  onChange={handleInputChange}
                  min={1}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                  placeholder="e.g., 4"
                />
              </div>

              <div>
                <label
                  htmlFor="customPackage"
                  className="block text-gray-700 mb-2"
                >
                  Custom Package / Destination
                </label>
                <input
                  type="text"
                  id="customPackage"
                  name="customPackage"
                  value={formData.customPackage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Bali, Thailand, Leh-Ladakh"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 mb-2"
              >
                Your Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all resize-none"
                placeholder="Tell us about your travel plans, dates, number of people, or any special requirements..."
              />
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                Failed to send message. Please try again or contact us via WhatsApp.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FF6B35] text-white py-4 px-8 rounded-lg text-lg hover:bg-[#ff5722] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Preparing WhatsApp...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send via WhatsApp
                </>
              )}
            </button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
