import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  MapPin,
  Users,
  Wifi,
  Car,
  BadgeCheck,
  CircleX,
  Phone,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "../components/media/ImageWithFallback";
import { allPackages } from "../data/packages";
import {
  packageTitleToSlug,
  packageToDetailsPath,
} from "../data/packageRouting";
import {
  packageDetailsBySlug,
} from "../data/packageDetails";

const iconByFacilityKeyword: Array<{ key: string; icon: any }> = [
  { key: "wifi", icon: Wifi },
  { key: "transport", icon: Car },
  { key: "pickup", icon: Car },
];

function getFacilityIcon(facility: string) {
  const normalized = facility.toLowerCase();
  const found = iconByFacilityKeyword.find((entry) => normalized.includes(entry.key));
  return found?.icon || BadgeCheck;
}

export function PackageDetailsPage() {
  const { slug } = useParams();
  const pkg = allPackages.find((entry) => packageTitleToSlug(entry.title) === slug);
  const details = slug ? packageDetailsBySlug[slug] : undefined;
  const fallbackPackage = details
    ? {
        id: -1,
        title:
          slug
            ?.split("-")
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(" ") ?? "Package",
        location: details.pickup,
        duration: `${Math.max(details.itinerary.length, 1)} Days`,
        groupSize: "On Request",
        departure: "On Request",
        price: details.pricingOptions?.[0]?.price ?? "On Request",
        originalPrice: details.pricingOptions?.[0]?.originalPrice ?? "",
        image: allPackages[0]?.image ?? "",
        category: details.travelStyles[0] ?? "Tour",
      }
    : undefined;
  const packageData = pkg ?? fallbackPackage;
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [selectedPricingIndex, setSelectedPricingIndex] = useState(0);
  // For packages that exist in packages.ts, use that as single source of truth for pricing.
  const pricingOptions = pkg ? [] : details?.pricingOptions ?? [];

  const similarPackages = useMemo(() => {
    if (!packageData) {
      return allPackages.slice(0, 3);
    }

    return allPackages
      .filter((entry) => entry.id !== packageData.id)
      .sort(
        (a, b) =>
          Number(b.category === packageData.category) -
          Number(a.category === packageData.category),
      )
      .slice(0, 3);
  }, [packageData]);

  useEffect(() => {
    setSelectedPricingIndex(0);
  }, [slug]);

  useEffect(() => {
    document.title = packageData
      ? `${packageData.title} | GoAventra`
      : "Package Details | GoAventra";
  }, [packageData]);

  if (!details || !packageData) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl text-[#014D4E] mb-4">Package Not Found</h1>
          <p className="text-gray-600 mb-8">
            The package details you are looking for are unavailable.
          </p>
          <Link
            to="/packages"
            className="inline-flex items-center bg-[#FF6B35] text-white px-6 py-3 rounded-full hover:bg-[#ff5722] transition-colors"
          >
            Browse Packages
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    );
  }

  const originalPrice =
    packageData.originalPrice &&
    packageData.originalPrice !== packageData.price
      ? packageData.originalPrice
      : null;
  const selectedPricingOption = pricingOptions[selectedPricingIndex] ?? pricingOptions[0];
  const selectedOriginalPrice = selectedPricingOption?.originalPrice ?? originalPrice;
  const displayedPrice = selectedPricingOption?.price ?? packageData.price;

  return (
    <div className="bg-gray-50">
      <section className="relative h-[300px] md:h-[320px] overflow-hidden">
        <ImageWithFallback src={packageData.image} alt={packageData.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#014D4E]/85 via-[#014D4E]/55 to-black/35" />
        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-end pb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-white">
              <p className="inline-flex items-center gap-2 text-sm md:text-base bg-white/15 px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-4 h-4" />
                {packageData.category}
              </p>
              <h1 className="text-4xl md:text-5xl mb-2">{packageData.title}</h1>
              <p className="text-white/90 text-lg">{packageData.location}</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 items-start">
            <div className="space-y-8">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  <div className="flex items-center gap-3">
                    <Clock3 className="w-5 h-5 text-[#014D4E]" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-[#014D4E]">{packageData.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#014D4E]" />
                    <div>
                      <p className="text-xs text-gray-500">Group Size</p>
                      <p className="text-[#014D4E]">{packageData.groupSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#014D4E]" />
                    <div>
                      <p className="text-xs text-gray-500">Departure</p>
                      <p className="text-[#014D4E]">{packageData.departure}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#014D4E]" />
                    <div>
                      <p className="text-xs text-gray-500">Min Age</p>
                      <p className="text-[#014D4E]">{details.minAge}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-[#014D4E]" />
                    <div>
                      <p className="text-xs text-gray-500">Pickup</p>
                      <p className="text-[#014D4E]">{details.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#014D4E]" />
                    <div>
                      <p className="text-xs text-gray-500">Best Season</p>
                      <p className="text-[#014D4E]">{details.bestSeason}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-sm">
                <h2 className="text-3xl text-[#014D4E] mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {`Start and end this journey with comfort, curated sightseeing, and local experiences across ${packageData.location}. This ${packageData.duration} package is designed for travelers who want seamless planning and memorable moments.`}
                </p>

                <h3 className="text-xl text-[#014D4E] mb-3">Highlights</h3>
                <ul className="space-y-2 mb-8">
                  {details.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-gray-700">
                      <CheckCircle2 className="w-4 h-4 mt-1 text-[#FF6B35] flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg text-[#014D4E] mb-3">Price Includes</h4>
                    <ul className="space-y-2">
                      {details.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle2 className="w-4 h-4 mt-1 text-green-600 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg text-[#014D4E] mb-3">Price Excludes</h4>
                    <ul className="space-y-2">
                      {details.excludes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-gray-700">
                          <CircleX className="w-4 h-4 mt-1 text-[#FF6B35] flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-sm">
                <h2 className="text-3xl text-[#014D4E] mb-6">Itinerary</h2>
                <div className="space-y-4">
                  {details.itinerary.map((item, index) => (
                    <div key={`${item.day}-${item.title}`} className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                      <p className="text-sm text-[#FF6B35] mb-1">{item.day}</p>
                      <h3 className="text-xl text-[#014D4E] mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.description}</p>
                      {index < details.itinerary.length - 1 && <div className="mt-4 border-b border-dashed border-gray-200" />}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
                <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-sm">
                  <h3 className="text-2xl text-[#014D4E] mb-4">Travel Styles</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {details.travelStyles.map((style) => (
                      <div key={style} className="inline-flex items-center gap-2 text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#FF6B35]" />
                        {style}
                      </div>
                    ))}
                  </div>
                </div>
                <aside className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-sm">
                  <h3 className="text-2xl text-[#014D4E] mb-4">Why Book With Us?</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="w-4 h-4 mt-1 text-[#FF6B35]" />
                      No-hassle best price guidance
                    </li>
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="w-4 h-4 mt-1 text-[#FF6B35]" />
                      Customer support 24/7
                    </li>
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="w-4 h-4 mt-1 text-[#FF6B35]" />
                      Hand-picked stays and activities
                    </li>
                  </ul>
                </aside>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-sm">
                <h3 className="text-2xl text-[#014D4E] mb-4">Facilities</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {details.facilities.map((facility) => {
                    const FacilityIcon = getFacilityIcon(facility);
                    return (
                      <div key={facility} className="flex items-center gap-3 text-gray-700">
                        <FacilityIcon className="w-4 h-4 text-[#014D4E]" />
                        {facility}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-sm">
                <h2 className="text-3xl text-[#014D4E] mb-5">FAQs</h2>
                <div className="space-y-3">
                  {details.faqs.map((faq, index) => {
                    const isOpen = openFaqIndex === index;
                    return (
                      <div key={faq.question} className="border border-gray-100 rounded-xl overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                          className="w-full px-4 py-4 flex items-center justify-between text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-[#014D4E]">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#014D4E]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#014D4E]" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 py-4 text-gray-700 bg-white">{faq.answer}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-7 shadow-sm">
                <h2 className="text-3xl text-[#014D4E] mb-6">You Might Also Like</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {similarPackages.map((item) => (
                    <Link
                      key={item.id}
                      to={packageToDetailsPath(item)}
                      className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="h-40 overflow-hidden">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-lg text-[#014D4E] line-clamp-2 mb-2">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.location}</p>
                        <p className="text-green-600 mt-2">{item.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <aside className="sticky top-24 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <p className="text-gray-500 text-sm mb-1">From</p>
                {selectedOriginalPrice && (
                  <p className="text-gray-400 line-through text-lg">{selectedOriginalPrice}</p>
                )}
                {originalPrice && pricingOptions.length === 0 && !selectedOriginalPrice && (
                  <p className="text-gray-400 line-through text-lg">{originalPrice}</p>
                )}
                <p className="text-4xl text-green-600">{displayedPrice}</p>
                <p className="text-sm text-gray-500 mt-1">per person</p>
                {selectedPricingOption && (
                  <p className="text-sm text-[#014D4E] mt-2">
                    Selected: {selectedPricingOption.label}
                  </p>
                )}
                {pricingOptions.length > 0 && (
                  <div className="mt-4">
                    <label htmlFor="pricing-tier" className="block text-xs text-gray-500 mb-2">
                      Choose package category
                    </label>
                    <select
                      id="pricing-tier"
                      value={selectedPricingIndex}
                      onChange={(e) => setSelectedPricingIndex(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-[#014D4E] focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                    >
                      {pricingOptions.map((option, index) => (
                        <option key={option.label} value={index}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="p-6 space-y-4">
                <a
                  href="https://wa.me/917060893636"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center bg-[#FF6B35] text-white py-3 rounded-lg hover:bg-[#ff5722] transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Book Now
                </a>
                <a
                  href="mailto:info@goaventra.com"
                  className="w-full inline-flex items-center justify-center border border-[#014D4E] text-[#014D4E] py-3 rounded-lg hover:bg-[#014D4E] hover:text-white transition-colors"
                >
                  Enquiry
                </a>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Final fare depends on departure date, group size, and room sharing preference.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

