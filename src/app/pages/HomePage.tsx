import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Users, MapPin, Star, Search } from 'lucide-react';
import Slider from "react-slick";
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { PackageCarousel } from '../components/PackageCarousel';
import { TopLocationsSlideshow } from '../components/TopLocationsSlideshow';
import { allPackages } from '../data/packages';
import { useState, useEffect, useRef } from 'react';
import chardhamHero from '../photos/chardham.png';
import kedarnathHero from '../photos/kedarnath.png';
import badrinathHero from '../photos/badrinath.png';
import gangotriYamnotriHero from '../photos/gangoti and yamnotri.png';
import kedarnathandbadrinathHero from '../photos/kedarnathandbadrinath.png';

const whyChooseUs = [
  {
    icon: Shield,
    title: 'Transparent Pricing',
    description: 'No hidden charges, clear pricing structure',
  },
  {
    icon: Users,
    title: 'Expert Guides',
    description: 'Experienced and certified tour guides',
  },
  {
    icon: MapPin,
    title: 'Best Destinations',
    description: 'Carefully curated travel experiences',
  },
  {
    icon: Star,
    title: 'MSME Registered',
    description: 'Government registered travel company',
  },
];

const testimonials = [
  {
    name: 'Rajesh Kumar',
    tour: 'Chardham',
    rating: 5,
    comment: 'Our Chardham was perfectly paced. The team was incredibly patient with the elders in our group and the hotel selections were much better than what we saw elsewhere. Proactive communication made all the difference.',
    avatar: 'RK',
  },
  {
    name: 'Priya Sharma',
    tour: 'Mussoorie Hill Station',
    rating: 5,
    comment: 'The experience was wonderful. The itinerary was well planned and the guides were very knowledgeable.',
    avatar: 'PS',
  },
  {
    name: 'Amit Patel',
    tour: 'Corporate Trip',
    rating: 5,
    comment: 'GoAventra made our corporate trip seamless and enjoyable. The team was responsive and attentive to our needs.',
    avatar: 'AP',
  },
  {
    name: 'Siddharth Mehra',
    tour: 'Manali-Kasol Adventure Tour',
    rating: 5,
    comment: 'The Manali-Kasol tour was an unforgettable experience. The guides were knowledgeable and the itinerary was perfectly paced. I highly recommend GoAventra for your next adventure!',
    avatar: 'SM',
  },
  {
    name: 'Anjali Deshmukh',
    tour: 'Dubai Discovery Tour',
    rating: 5,
    comment: 'The Dubai tour was a fantastic experience. The team was very responsive and the itinerary was well planned. Highly recommend GoAventra for your next trip!',
    avatar: 'AD',
  },
  {
    name: 'Vikram Sethi',
    tour: 'Vietnam Explorer',
    rating: 5,
    comment: 'The Vietnam tour was an unforgettable experience. The guides were knowledgeable and the itinerary was perfectly paced. I highly recommend GoAventra for your next adventure!',
    avatar: 'VS',
  },
];

const heroImages = [
  chardhamHero,
  kedarnathHero,
  badrinathHero,
  gangotriYamnotriHero,
  kedarnathandbadrinathHero,
];

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredPackages, setFilteredPackages] = useState<typeof allPackages>([]);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    phone: "",
    destination: "",
    travelers: "",
    message: "",
  });
  const navigate = useNavigate();
  const searchRef = useRef<HTMLFormElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    document.title = "GoAventra - Where Adventure Begins | Tours & Travel";
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);
    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);

    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        .slice(0, 5);
      setFilteredPackages(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setFilteredPackages([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchQuery.trim().toLowerCase() === 'international') {
        navigate('/packages?type=international');
      } else {
        navigate(`/packages?search=${encodeURIComponent(searchQuery.trim())}`);
      }
      setSearchQuery("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (packageTitle: string) => {
    navigate(`/packages?search=${encodeURIComponent(packageTitle)}`);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Quote Request from GoAventra Website*\n\n*Name:* ${quoteForm.name}\n*Phone:* ${quoteForm.phone}\n*Preferred Destination:* ${quoteForm.destination || "Not specified"}\n*Travelers:* ${quoteForm.travelers || "Not specified"}\n*Message:* ${quoteForm.message || "Not specified"}`;
    window.open(`https://wa.me/917060893636?text=${encodeURIComponent(message)}`, "_blank");
    setQuoteForm({
      name: "",
      phone: "",
      destination: "",
      travelers: "",
      message: "",
    });
    setShowQuoteForm(false);
  };

  const [testimonialSlides, setTestimonialSlides] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setTestimonialSlides(1);
      else if (window.innerWidth < 1024) setTestimonialSlides(2);
      else setTestimonialSlides(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonialSettings = {
    dots: false,
    arrows: false,
    infinite: testimonials.length > 3,
    speed: 500,
    slidesToShow: Math.min(testimonialSlides, testimonials.length),
    slidesToScroll: 1,
    autoplay: testimonials.length > 3,
    autoplaySpeed: 4200,
    pauseOnHover: true,
  };

  const heroSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 900,
    fade: !isMobile,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    draggable: true,
    swipe: true,
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[520px] md:h-[600px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[#0F3F40]">
          <Slider {...heroSettings} className="h-full w-full">
            {heroImages.map((img, index) => (
              <div key={index} className="outline-none h-full">
                <img
                  src={img}
                  alt={`Hero Background ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  className="w-full h-full min-h-[520px] md:min-h-[600px] object-cover"
                />
              </div>
            ))}
          </Slider>
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#014D4E]/80 to-[#014D4E]/40 pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white max-w-5xl text-center px-2 w-full pt-10 sm:pt-4 md:pt-0 pb-20 sm:pb-14"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
              Where Adventure Begins!
            </h1>
            <p className="text-base md:text-xl mb-8 text-gray-100 max-w-3xl mx-auto" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
              Explore spiritual journeys, mountain adventures, and create unforgettable memories with GoAventra
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center max-w-3xl mx-auto w-full">
              <Link
                to="/packages"
                className="bg-[#FF6B35] text-white h-12 md:h-14 px-6 md:px-8 rounded-full text-sm md:text-base font-semibold hover:bg-[#ff5722] active:bg-[#ff5722] transition-all flex items-center justify-center shadow-lg shadow-[#FF6B35]/30 hover:shadow-xl hover:shadow-[#FF6B35]/40 hover:-translate-y-0.5"
              >
                Explore Packages
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/917060893636"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white h-12 md:h-14 px-6 md:px-8 rounded-full hidden md:flex items-center justify-center text-sm md:text-base font-semibold shadow-lg shadow-[#25D366]/30 hover:bg-[#20ba5a] active:bg-[#20ba5a] hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                WhatsApp Now
              </a>
              <Link
                to="/packages?type=domestic"
                className="bg-white text-[#014D4E] md:bg-white/15 md:backdrop-blur-md md:text-white md:border md:border-white/30 h-12 md:h-14 px-6 md:px-8 rounded-full text-sm md:text-base font-semibold hover:bg-gray-100 md:hover:bg-white/25 active:bg-gray-100 md:active:bg-white/25 transition-all flex items-center justify-center shadow-lg md:shadow-none"
              >
                Customize Trip
              </Link>
              <Link
                to="/contact"
                className="bg-white/15 backdrop-blur-md text-white border border-white/30 h-12 md:h-14 px-6 md:px-8 rounded-full hidden md:flex items-center justify-center text-sm md:text-base font-semibold hover:bg-white/25 active:bg-white/25 transition-all"
              >
                Inquiry
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section — overlaps hero */}
      <section className="relative z-20 pb-10 sm:pb-12 bg-[#faf8f4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative transform -translate-y-10 sm:-translate-y-14"
          >
            <form ref={searchRef} onSubmit={handleSearch} className="relative">
              <div className="flex flex-row items-center bg-white/80 backdrop-blur-xl rounded-full shadow-2xl border border-white/60 p-1.5 sm:p-2 ring-1 ring-black/5">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => searchQuery && setShowSuggestions(true)}
                    placeholder="Search destinations..."
                    className="w-full px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-full focus:outline-none text-gray-700 text-sm sm:text-base bg-transparent placeholder:text-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#FF6B35] text-white w-10 h-10 sm:w-auto sm:h-auto sm:px-8 sm:py-3.5 rounded-full hover:bg-[#ff5722] transition-all hover:shadow-lg hover:shadow-[#FF6B35]/25 flex items-center justify-center gap-2 flex-shrink-0"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">Search</span>
                </button>
              </div>

              {/* Autocomplete Suggestions */}
              {showSuggestions && filteredPackages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200/60 overflow-hidden z-50"
                >
                  <div className="py-2">
                    {filteredPackages.map((pkg) => (
                      <button
                        type="button"
                        key={pkg.id}
                        onClick={() => handleSuggestionClick(pkg.title)}
                        className="w-full px-4 sm:px-6 py-4 text-left hover:bg-[#FF6B35] hover:text-white transition-colors group"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="font-semibold">
                              {pkg.title}
                            </div>
                            <div className="text-sm text-gray-500 group-hover:text-white/90 mt-1 flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              <span>{pkg.location}</span>
                              <span>&bull;</span>
                              <span>{pkg.price}</span>
                            </div>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white" />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-3 font-medium">Popular Searches:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Chardham', 'Manali', 'Bali', 'Vietnam', 'Kashmir', 'Dubai'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => navigate(`/packages?search=${encodeURIComponent(tag)}`)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:border-[#FF6B35] hover:text-[#FF6B35] hover:bg-[#FF6B35]/5 transition-all shadow-sm"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <TopLocationsSlideshow />

      {/* Featured Packages Carousel */}
      <PackageCarousel 
        packages={allPackages} 
        title="Top Travel Packages"
        subtitle="Discover our most popular destinations and experiences"
      />

      {/* Why Choose Us */}
      <section className="pt-10 pb-16 md:pt-14 md:pb-20 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #014D4E 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-[#FF6B35] font-medium tracking-wider uppercase text-sm mb-2">Why Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#014D4E] mb-4">Why Choose GoAventra?</h2>
            <p className="text-lg text-gray-600">Your trusted travel partner</p>
            <div className="w-16 h-1 bg-[#FF6B35] mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-[#faf8f4] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#FF6B35]/15 to-[#FF6B35]/5 rounded-2xl mb-5">
                  <item.icon className="w-9 h-9 text-[#FF6B35]" />
                </div>
                <h3 className="text-lg font-bold text-[#014D4E] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 bg-[#014D4E] rounded-2xl p-8 text-white text-center"
          >
            <h3 className="text-2xl md:text-3xl mb-4">No Hidden Charges | Transparent Pricing</h3>
            <p className="text-lg text-gray-200 mb-6">
              We believe in complete transparency. What you see is what you pay - no surprises!
            </p>
            <button
              type="button"
              onClick={() => setShowQuoteForm((prev) => !prev)}
              className="inline-flex items-center bg-[#FF6B35] text-white px-8 py-3 rounded-full hover:bg-[#ff5722] transition-colors"
            >
              Get a Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>

            {showQuoteForm && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleQuoteSubmit}
                className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-left grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label htmlFor="quote-name" className="block text-sm text-gray-100 mb-2">
                    Name *
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    required
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="quote-phone" className="block text-sm text-gray-100 mb-2">
                    Phone *
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    required
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
                    placeholder="+91 XXXXXXXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="quote-destination" className="block text-sm text-gray-100 mb-2">
                    Destination
                  </label>
                  <input
                    id="quote-destination"
                    type="text"
                    value={quoteForm.destination}
                    onChange={(e) => setQuoteForm((prev) => ({ ...prev, destination: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
                    placeholder="e.g. Bali, Dubai, Chardham"
                  />
                </div>
                <div>
                  <label htmlFor="quote-travelers" className="block text-sm text-gray-100 mb-2">
                    Travelers
                  </label>
                  <input
                    id="quote-travelers"
                    type="text"
                    value={quoteForm.travelers}
                    onChange={(e) => setQuoteForm((prev) => ({ ...prev, travelers: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
                    placeholder="e.g. 2 Adults"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="quote-message" className="block text-sm text-gray-100 mb-2">
                    Travel Details
                  </label>
                  <textarea
                    id="quote-message"
                    rows={3}
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm((prev) => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg text-gray-800 focus:outline-none resize-none"
                    placeholder="Share your preferred dates, destination/package, and requirements"
                  />
                </div>
                <div className="md:col-span-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="bg-[#FF6B35] text-white px-6 py-3 rounded-full hover:bg-[#ff5722] transition-colors"
                  >
                    Send Quote Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowQuoteForm(false)}
                    className="bg-white text-[#014D4E] px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="pt-10 pb-16 md:pt-14 md:pb-20 bg-[#faf8f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-[#FF6B35] font-medium tracking-wider uppercase text-sm mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#014D4E] mb-4">What Our Travelers Say</h2>
            <p className="text-lg text-gray-600">Real experiences from real people</p>
            <div className="w-16 h-1 bg-[#FF6B35] mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="testimonials-slider">
            <Slider {...testimonialSettings}>
              {testimonials.map((testimonial, index) => (
                <div key={`${testimonial.name}-${index}`} className="px-3 py-2 h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow h-full min-h-[280px] border border-gray-100 relative"
                  >
                    {/* Decorative quote mark */}
                    <span className="absolute top-4 right-5 text-5xl leading-none text-[#FF6B35]/10 font-serif">&ldquo;</span>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#014D4E] to-[#026d6f] text-white rounded-full flex items-center justify-center mr-4 font-semibold text-sm shadow-md">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#014D4E]">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.tour}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-[#FF6B35] fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">{testimonial.comment}</p>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#014D4E] via-[#016a6c] to-[#0a2e2f] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#25D366]/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Start Your Adventure?</h2>
            <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto">
              Book your dream vacation today or chat with us to customize your perfect trip
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Link
                to="/packages"
                className="bg-[#FF6B35] text-white min-h-[50px] h-12 px-8 rounded-full text-base font-semibold hover:bg-[#ff5722] active:bg-[#ff5722] transition-all flex items-center justify-center flex-1 shadow-lg shadow-[#FF6B35]/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                Book Your Trip
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/917060893636"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white min-h-[50px] h-12 px-8 rounded-full text-base font-semibold hover:bg-[#20ba5a] active:bg-[#20ba5a] transition-all flex items-center justify-center flex-1 shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:-translate-y-0.5"
              >
                WhatsApp Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
