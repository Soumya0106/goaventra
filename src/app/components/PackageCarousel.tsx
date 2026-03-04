import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { packageToDetailsPath } from "../data/packageRouting";

interface Package {
  id: number;
  title: string;
  location: string;
  duration: string;
  groupSize?: string;
  price: string;
  departure?: string;
  image: string;
  inclusions: string[];
  category: string;
  featured?: boolean;
  link?: string;
  description?: string;
  highlights?: string[];
  itinerary?: Array<{ day: string; description: string }>;
}

interface PackageCarouselProps {
  packages: Package[];
  title?: string;
  subtitle?: string;
}

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#014D4E] p-3 rounded-full shadow-lg transition-all hover:scale-110 hidden md:flex items-center justify-center"
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
      onClick={onClick}
      className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-[#014D4E] p-3 rounded-full shadow-lg transition-all hover:scale-110 hidden md:flex items-center justify-center"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );
}

export function PackageCarousel({
  packages,
  title = "Featured Packages",
  subtitle = "Explore our top-rated travel experiences",
}: PackageCarouselProps) {
  const hasMultipleSlides = packages.length > 1;
  const [slidesToShow, setSlidesToShow] = useState(3);

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
      infinite: hasMultipleSlides,
      speed: 600,
      slidesToShow: Math.min(slidesToShow, packages.length || 1),
      slidesToScroll: 1,
      autoplay: hasMultipleSlides && slidesToShow > 1,
      autoplaySpeed: 5000,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      arrows: slidesToShow > 1,
    }),
    [hasMultipleSlides, slidesToShow, packages.length],
  );

  return (
    <section className="py-8 md:py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl text-[#014D4E] font-semibold mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          <div className="w-20 h-1 bg-[#FF6B35] mx-auto mt-6" />
        </motion.div>

        <div className="carousel-wrapper relative px-0 md:px-6 touch-pan-y">
          <Slider {...settings}>
            {packages.map((pkg) => (
              <div key={pkg.id} className="px-3 py-2">
                <Link to={packageToDetailsPath(pkg)} className="block group">
                  <div className="relative h-[340px] sm:h-[400px] md:h-[480px] rounded-xl overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-xl">
                    <ImageWithFallback
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors duration-300" />
                    
                    {/* Centered Content - Matching the requested design */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                      <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-lg leading-tight">
                        {pkg.title}
                      </h3>
                      <p className="text-white/90 text-sm font-medium tracking-wide mb-6 uppercase">
                        {pkg.duration}
                      </p>
                      <div className="h-1 w-12 bg-[#FF6B35] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                      
                      <div className="mt-8 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <span className="inline-block px-6 py-2 bg-white text-[#014D4E] rounded-full text-sm font-bold shadow-lg">
                          {pkg.price}
                        </span>
                      </div>
                    </div>

                    {pkg.featured && (
                      <div className="absolute top-4 left-4 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                        Featured
                      </div>
                    )}
                    
                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-medium border border-white/30">
                      {pkg.category}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>

        {/* View All Packages Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <Link
            to="/packages"
            className="inline-flex items-center text-[#014D4E] font-bold text-lg hover:text-[#FF6B35] transition-colors group"
          >
            Explore All Packages
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <style>{`
        .carousel-wrapper .slick-dots {
          bottom: -50px;
        }
        .carousel-wrapper .slick-dots li button:before {
          color: #014D4E;
          font-size: 10px;
        }
        .carousel-wrapper .slick-dots li.slick-active button:before {
          color: #FF6B35;
        }
      `}</style>
    </section>
  );
}
