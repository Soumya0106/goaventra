import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./media/ImageWithFallback";
import { Link } from "react-router-dom";

interface LocationSlide {
  name: string;
  customers: string;
  image: string;
}

interface TopPackage {
  name: string;
  duration: string;
  price: string;
  image: string;
  slug: string;
}

const topPackages: TopPackage[] = [
  {
    name: "Chardham",
    duration: "12D / 11N",
    price: "From Rs 24,999",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    slug: "chardham-yatra",
  },
  {
    name: "Kashmir Valley Escape",
    duration: "6D / 5N",
    price: "From Rs 17,499",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    slug: "kashmir-valley-escape",
  },
  {
    name: "Kerala Backwaters Retreat",
    duration: "5D / 4N",
    price: "From Rs 15,999",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    slug: "kerala-backwaters-retreat",
  },
];

const locations: LocationSlide[] = [
  {
    name: "Himachal Pradesh",
    customers: "70k Customers Visited",
    image:
      "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Jammu and Kashmir",
    customers: "25k Customers Visited",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Kerala",
    customers: "14k Customers Visited",
    image:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Uttarakhand",
    customers: "60k Customers Visited",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Bali",
    customers: "32k Customers Visited",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Vietnam",
    customers: "28k Customers Visited",
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
  },
];

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#014D4E] p-3 rounded-full shadow-lg transition-all hover:scale-110 hidden md:flex items-center justify-center"
      aria-label="Next slide"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#014D4E] p-3 rounded-full shadow-lg transition-all hover:scale-110 hidden md:flex items-center justify-center"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

function TopPackageCard({ pkg }: { pkg: TopPackage }) {
  return (
    <Link to={`/packages/${pkg.slug}`} className="block">
      <article className="relative h-[320px] sm:h-[380px] md:h-[450px] rounded-xl overflow-hidden shadow-md group cursor-pointer">
        <ImageWithFallback
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <h4 className="text-2xl font-semibold text-white mb-2 drop-shadow-md">
            {pkg.name}
          </h4>
          <div className="h-1 w-12 bg-[#FF6B35] mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
          <span
            className="px-6 py-2 bg-white text-[#014D4E] rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0"
          >
            Explore Now
          </span>
        </div>
      </article>
    </Link>
  );
}

export function TopLocationsSlideshow() {
  const [isMobile, setIsMobile] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(3);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateIsMobile = () => setIsMobile(mediaQuery.matches);

    updateIsMobile();
    mediaQuery.addEventListener("change", updateIsMobile);
    return () => mediaQuery.removeEventListener("change", updateIsMobile);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = useMemo(
    () => ({
      dots: slidesToShow > 1,
      infinite: slidesToShow > 1,
      speed: 600,
      slidesToShow: slidesToShow,
      slidesToScroll: 1,
      autoplay: !isMobile && slidesToShow > 1,
      autoplaySpeed: 4000,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      arrows: slidesToShow > 1,
    }),
    [isMobile, slidesToShow],
  );

  return (
    <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl text-[#014D4E] font-semibold mb-4">
              Our Top 3 Packages
            </h2>
            <div className="w-20 h-1 bg-[#FF6B35] mx-auto" />
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topPackages.map((pkg) => (
              <TopPackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#FF6B35] font-medium tracking-wider uppercase text-sm mb-2">
            GoAventra Favorites
          </p>
          <h2 className="text-3xl md:text-4xl text-[#014D4E] font-semibold mb-4">
            Most Loved Travel Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the most trending and highly rated destinations chosen by our travelers.
          </p>
        </motion.div>

        <div className="locations-slider relative px-0 md:px-8 touch-pan-y">
          <Slider {...settings}>
            {locations.map((location) => (
              <div key={location.name} className="px-3 py-2">
                <div className="relative h-[320px] sm:h-[380px] md:h-[450px] rounded-xl overflow-hidden shadow-sm group cursor-pointer">
                  <ImageWithFallback
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                      {location.name}
                    </h3>
                    <p className="text-white/90 text-sm font-medium tracking-wide">
                      {location.customers}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <style>{`
        .locations-slider .slick-dots {
          bottom: -40px;
        }
        .locations-slider .slick-dots li button:before {
          color: #014D4E;
          font-size: 10px;
        }
        .locations-slider .slick-dots li.slick-active button:before {
          color: #FF6B35;
        }
      `}</style>
    </section>
  );
}

