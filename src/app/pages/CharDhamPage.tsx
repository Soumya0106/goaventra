import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { ImageWithFallback } from '../components/media/ImageWithFallback';
import chardhamImage from '../photos/chardham.png';
import kedarnathImage from '../photos/kedarnath.png';
import kedarBadriImage from '../photos/kedarnathandbadrinath.png';
import badrinathImage from '../photos/badrinath.png';
import { domesticPackages } from '../data/packages';
import { packageTitleToSlug } from '../data/packageRouting';

// Chardham Departure Dates
const charDhamDates = [
  { month: 'May 2026', dates: ['1st', '6th', '11th', '16th', '21st', '26th', '31st'] },
  { month: 'June 2026', dates: ['5th', '10th', '15th', '20th', '25th', '30th'] },
];

type CharDhamPackage = {
  title: string;
  pickup: string;
  pickupCity: 'Dehradun' | 'Haridwar' | 'Delhi';
  price: string;
  duration: string;
  route: string;
  category: string;
  image: string;
  link: string;
  transport: 'Helicopter' | 'Road Trip';
};

type DomesticPackage = (typeof domesticPackages)[number];
const packageByLink = new Map<string, DomesticPackage>(
  domesticPackages.map((pkg) => [`/packages/${packageTitleToSlug(pkg.title)}`, pkg]),
);

const getPackageTitle = (link: string, fallbackTitle: string) =>
  packageByLink.get(link)?.title ?? fallbackTitle;

const getPackagePrice = (link: string, fallbackPrice: string) =>
  packageByLink.get(link)?.price ?? fallbackPrice;

const getPackageDuration = (link: string, fallbackDuration: string) =>
  packageByLink.get(link)?.duration ?? fallbackDuration;

const getPackageRoute = (link: string, fallbackRoute: string) =>
  packageByLink.get(link)?.location ?? fallbackRoute;

const getPackageImage = (link: string, fallbackImage: string) =>
  packageByLink.get(link)?.image ?? fallbackImage;

const charDhamPackages: CharDhamPackage[] = [
  {
    title: 'Chardham Yatra by Helicopter (May-June 2026)',
    pickup: 'Ex-Dehradun',
    pickupCity: 'Dehradun',
    price: getPackagePrice('/packages/chardham-yatra-by-helicopter-may-june-2026', 'Rs 2,40,000'),
    duration: getPackageDuration('/packages/chardham-yatra-by-helicopter-may-june-2026', '4 Nights / 5 Days'),
    route: getPackageRoute('/packages/chardham-yatra-by-helicopter-may-june-2026', 'Yamunotri - Gangotri - Kedarnath - Badrinath'),
    category: 'All Inclusive',
    transport: 'Helicopter',
    image: getPackageImage('/packages/chardham-yatra-by-helicopter-may-june-2026', chardhamImage),
    link: '/packages/chardham-yatra-by-helicopter-may-june-2026',
  },
  {
    title: getPackageTitle('/packages/kedarnath-and-badrinath-package-haridwar-to-haridwar', 'Kedarnath & Badrinath Package'),
    pickup: 'Haridwar to Haridwar',
    pickupCity: 'Haridwar',
    price: getPackagePrice('/packages/kedarnath-and-badrinath-package-haridwar-to-haridwar', 'Rs 12,500'),
    duration: getPackageDuration('/packages/kedarnath-and-badrinath-package-haridwar-to-haridwar', '5 Nights / 6 Days'),
    route: getPackageRoute('/packages/kedarnath-and-badrinath-package-haridwar-to-haridwar', 'Sonprayag - Kedarnath - Badrinath - Rishikesh'),
    category: 'Rs 12,500 per person',
    transport: 'Road Trip',
    image: getPackageImage('/packages/kedarnath-and-badrinath-package-haridwar-to-haridwar', kedarBadriImage),
    link: '/packages/kedarnath-and-badrinath-package-haridwar-to-haridwar',
  },
  {
    title: getPackageTitle('/packages/kedarnath-and-badrinath-package-delhi-to-delhi', 'Kedarnath & Badrinath Package'),
    pickup: 'Delhi to Delhi',
    pickupCity: 'Delhi',
    price: getPackagePrice('/packages/kedarnath-and-badrinath-package-delhi-to-delhi', 'Rs 14,500'),
    duration: getPackageDuration('/packages/kedarnath-and-badrinath-package-delhi-to-delhi', '6 Nights / 7 Days'),
    route: getPackageRoute('/packages/kedarnath-and-badrinath-package-delhi-to-delhi', 'Delhi - Haridwar - Sonprayag - Kedarnath - Badrinath - Rishikesh - Delhi'),
    category: 'Rs 14,500 per person',
    transport: 'Road Trip',
    image: getPackageImage('/packages/kedarnath-and-badrinath-package-delhi-to-delhi', kedarBadriImage),
    link: '/packages/kedarnath-and-badrinath-package-delhi-to-delhi',
  },
  {
    title: getPackageTitle('/packages/chardham-package-haridwar-to-haridwar', 'Chardham Package'),
    pickup: 'Haridwar to Haridwar',
    pickupCity: 'Haridwar',
    price: getPackagePrice('/packages/chardham-package-haridwar-to-haridwar', 'On Request'),
    duration: getPackageDuration('/packages/chardham-package-haridwar-to-haridwar', '9 Nights / 10 Days'),
    route: getPackageRoute('/packages/chardham-package-haridwar-to-haridwar', 'Yamunotri - Gangotri - Kedarnath - Badrinath'),
    category: 'Meals: Breakfast & Dinner | Cab / Tempo Traveller / Urbania / Bus',
    transport: 'Road Trip',
    image: getPackageImage('/packages/chardham-package-haridwar-to-haridwar', chardhamImage),
    link: '/packages/chardham-package-haridwar-to-haridwar',
  },
  {
    title: getPackageTitle('/packages/chardham-package-delhi-to-delhi', 'Chardham Package'),
    pickup: 'Delhi to Delhi',
    pickupCity: 'Delhi',
    price: getPackagePrice('/packages/chardham-package-delhi-to-delhi', 'Rs 20,500'),
    duration: getPackageDuration('/packages/chardham-package-delhi-to-delhi', '10 Nights / 11 Days'),
    route: getPackageRoute('/packages/chardham-package-delhi-to-delhi', 'Delhi - Haridwar - Barkot - Uttarkashi - Kedarnath - Badrinath - Delhi'),
    category: 'Rs 20,500 per person',
    transport: 'Road Trip',
    image: getPackageImage('/packages/chardham-package-delhi-to-delhi', chardhamImage),
    link: '/packages/chardham-package-delhi-to-delhi',
  },
  {
    title: getPackageTitle('/packages/gangotri-and-yamunotri-yatra-haridwar-to-haridwar', 'Gangotri & Yamunotri Yatra'),
    pickup: 'Haridwar to Haridwar',
    pickupCity: 'Haridwar',
    price: getPackagePrice('/packages/gangotri-and-yamunotri-yatra-haridwar-to-haridwar', 'Rs 12,500'),
    duration: getPackageDuration('/packages/gangotri-and-yamunotri-yatra-haridwar-to-haridwar', '4 Nights / 5 Days'),
    route: getPackageRoute('/packages/gangotri-and-yamunotri-yatra-haridwar-to-haridwar', 'Haridwar - Barkot - Uttarkashi - Harsil - Haridwar'),
    category: 'Rs 12,500 per person',
    transport: 'Road Trip',
    image: getPackageImage('/packages/gangotri-and-yamunotri-yatra-haridwar-to-haridwar', 'https://images.unsplash.com/photo-1713063968789-adf139c4a1eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5hbGklMjB2YWxsZXklMjBuYXR1cmUlMjBtb3VudGFpbnxlbnwxfHx8fDE3NzA1NzQwMDV8MA&ixlib=rb-4.1.0&q=80&w=1080'),
    link: '/packages/gangotri-and-yamunotri-yatra-haridwar-to-haridwar',
  },
  {
    title: getPackageTitle('/packages/gangotri-and-yamunotri-yatra-delhi-to-delhi', 'Gangotri & Yamunotri Yatra'),
    pickup: 'Delhi to Delhi',
    pickupCity: 'Delhi',
    price: getPackagePrice('/packages/gangotri-and-yamunotri-yatra-delhi-to-delhi', 'Rs 14,500'),
    duration: getPackageDuration('/packages/gangotri-and-yamunotri-yatra-delhi-to-delhi', '5 Nights / 6 Days'),
    route: getPackageRoute('/packages/gangotri-and-yamunotri-yatra-delhi-to-delhi', 'Delhi - Haridwar - Barkot - Uttarkashi - Harsil - Delhi'),
    category: 'Rs 14,500 per person',
    transport: 'Road Trip',
    image: getPackageImage('/packages/gangotri-and-yamunotri-yatra-delhi-to-delhi', 'https://images.unsplash.com/photo-1713063968789-adf139c4a1eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5hbGklMjB2YWxsZXklMjBuYXR1cmUlMjBtb3VudGFpbnxlbnwxfHx8fDE3NzA1NzQwMDV8MA&ixlib=rb-4.1.0&q=80&w=1080'),
    link: '/packages/gangotri-and-yamunotri-yatra-delhi-to-delhi',
  },
  {
    title: getPackageTitle('/packages/kedarnath-yatra-haridwar-to-haridwar', 'Kedarnath Yatra'),
    pickup: 'Haridwar to Haridwar',
    pickupCity: 'Haridwar',
    price: getPackagePrice('/packages/kedarnath-yatra-haridwar-to-haridwar', 'Rs 8,500'),
    duration: getPackageDuration('/packages/kedarnath-yatra-haridwar-to-haridwar', '3 Nights / 4 Days'),
    route: getPackageRoute('/packages/kedarnath-yatra-haridwar-to-haridwar', 'Haridwar - Guptkashi - Kedarnath - Haridwar'),
    category: 'Rs 8,500 per person',
    transport: 'Road Trip',
    image: getPackageImage('/packages/kedarnath-yatra-haridwar-to-haridwar', kedarnathImage),
    link: '/packages/kedarnath-yatra-haridwar-to-haridwar',
  },
  {
    title: getPackageTitle('/packages/kedarnath-yatra-delhi-to-delhi', 'Kedarnath Yatra'),
    pickup: 'Delhi to Delhi',
    pickupCity: 'Delhi',
    price: getPackagePrice('/packages/kedarnath-yatra-delhi-to-delhi', 'Rs 10,500'),
    duration: getPackageDuration('/packages/kedarnath-yatra-delhi-to-delhi', '4 Nights / 5 Days'),
    route: getPackageRoute('/packages/kedarnath-yatra-delhi-to-delhi', 'Delhi - Rishikesh - Phata/Sirsi - Kedarnath - Srinagar - Delhi'),
    category: 'Rs 10,500 per person',
    transport: 'Road Trip',
    image: getPackageImage('/packages/kedarnath-yatra-delhi-to-delhi', kedarnathImage),
    link: '/packages/kedarnath-yatra-delhi-to-delhi',
  },
  {
    title: getPackageTitle('/packages/badrinath-yatra-delhi-to-delhi', 'Badrinath Yatra'),
    pickup: 'Delhi to Delhi',
    pickupCity: 'Delhi',
    price: getPackagePrice('/packages/badrinath-yatra-delhi-to-delhi', 'Rs 10,500'),
    duration: getPackageDuration('/packages/badrinath-yatra-delhi-to-delhi', '4 Nights / 5 Days'),
    route: getPackageRoute('/packages/badrinath-yatra-delhi-to-delhi', 'Delhi - Rudraprayag - Badrinath - Rishikesh - Delhi'),
    category: 'Rs 10,500 per person',
    transport: 'Road Trip',
    image: getPackageImage('/packages/badrinath-yatra-delhi-to-delhi', badrinathImage),
    link: '/packages/badrinath-yatra-delhi-to-delhi',
  },
  {
    title: getPackageTitle('/packages/badrinath-yatra-haridwar-to-haridwar', 'Badrinath Yatra'),
    pickup: 'Haridwar to Haridwar',
    pickupCity: 'Haridwar',
    price: getPackagePrice('/packages/badrinath-yatra-haridwar-to-haridwar', 'Rs 8,500'),
    duration: getPackageDuration('/packages/badrinath-yatra-haridwar-to-haridwar', '4 Nights / 5 Days'),
    route: getPackageRoute('/packages/badrinath-yatra-haridwar-to-haridwar', 'Haridwar - Rudraprayag - Badrinath - Rishikesh - Haridwar'),
    category: 'Rs 8,500 per person',
    transport: 'Road Trip',
    image: getPackageImage('/packages/badrinath-yatra-haridwar-to-haridwar', badrinathImage),
    link: '/packages/badrinath-yatra-haridwar-to-haridwar',
  },
];

export function CharDhamPage() {
  type PackageType = 'chardhamHeli' | 'kedarBadriHH' | 'kedarBadriDD' | 'chardhamHH';
  type PickupFilter = 'All' | 'Dehradun' | 'Haridwar' | 'Delhi';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    adults: '2',
    departure: '',
    pickupPoint: 'Dehradun',
    packageType: 'chardhamHeli' as PackageType,
    message: '',
  });
  const [pickupFilter, setPickupFilter] = useState<PickupFilter>('All');

  useEffect(() => {
    document.title = "Chardham Yatra 2026 - Advance Booking | GoAventra";
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const packageNames = {
      chardhamHeli: 'Chardham Yatra by Helicopter',
      kedarBadriHH: 'Kedarnath & Badrinath Package (Haridwar to Haridwar)',
      kedarBadriDD: 'Kedarnath & Badrinath Package (Delhi to Delhi)',
      chardhamHH: 'Chardham Package (Haridwar to Haridwar)',
    };
    const whatsappMessage = `Hi GoAventra! I'm interested in ${packageNames[formData.packageType as keyof typeof packageNames]}.\\n\\nName: ${formData.name}\\nEmail: ${formData.email}\\nPhone: ${formData.phone}\\nAdults: ${formData.adults}\\nDeparture: ${formData.departure}\\nPickup Point: ${formData.pickupPoint}\\nMessage: ${formData.message}`;
    window.open(`https://wa.me/917060893636?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (e.target.name === 'packageType') {
      const selected = e.target.value as PackageType;
      const pickupByPackage: Record<PackageType, string> = {
        chardhamHeli: 'Dehradun',
        kedarBadriHH: 'Haridwar',
        kedarBadriDD: 'Delhi',
        chardhamHH: 'Haridwar',
      };
      setFormData({
        ...formData,
        packageType: selected,
        pickupPoint: pickupByPackage[selected],
      });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCurrentDates = () => charDhamDates;
  const pickupFilters: PickupFilter[] = ['All', 'Dehradun', 'Haridwar', 'Delhi'];
  const visiblePackages = useMemo(
    () =>
      pickupFilter === 'All'
        ? charDhamPackages
        : charDhamPackages.filter((pkg) => pkg.pickupCity === pickupFilter),
    [pickupFilter]
  );

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[420px] md:h-[480px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={chardhamImage}
            alt="Chardham"
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
              🕉️ Advance Booking 2026
            </motion.div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 font-extrabold" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>Chardham Yatra</h1>
            <p className="text-xl md:text-2xl mb-3 text-gray-100 font-medium" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.3)' }}>
              Journey of a Lifetime
            </p>
            <p className="text-base md:text-lg text-gray-200/90">
              Advance Booking Open Now!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages & Pricing Section */}
      <section className="py-16 md:py-20 bg-[#faf8f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[#FF6B35] font-medium tracking-wider uppercase text-sm mb-2">Our Offerings</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#014D4E] mb-4">Packages & Pricing</h2>
            <p className="text-lg text-gray-600">Available Chardham-related packages</p>
            <div className="w-16 h-1 bg-[#FF6B35] mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {pickupFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setPickupFilter(filter)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  pickupFilter === filter
                    ? 'bg-[#014D4E] text-white shadow-md shadow-[#014D4E]/20'
                    : 'bg-white text-[#014D4E] border border-gray-200 hover:border-[#014D4E]/30 hover:shadow-sm hover:-translate-y-0.5'
                }`}
              >
                {filter === 'All' ? 'All Pickups' : `From ${filter}`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visiblePackages.map((pkg, index) => {
              const tiers = pkg.category
                .split('|')
                .map((item) => item.trim())
                .filter(Boolean);

              return (
              <motion.div
                key={`${pkg.title}-${pkg.pickup}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Link
                  to={pkg.link}
                  className="group block h-full overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-52 md:h-60 overflow-hidden">
                    <ImageWithFallback
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 bg-[#014D4E] text-white text-xs font-medium px-3 py-1.5 rounded-full shadow-md">
                      {pkg.transport}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#014D4E] text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                      {pkg.pickup}
                    </div>
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-bold text-[#014D4E] leading-snug line-clamp-2 mb-3">
                      {pkg.title}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <p className="inline-flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#FF6B35]" />
                        <span className="line-clamp-1">{pkg.pickup}</span>
                      </p>
                      <p className="inline-flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#FF6B35]" />
                        <span>{pkg.duration}</span>
                      </p>
                    </div>

                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      <span className="font-medium text-gray-700">Route:</span> {pkg.route}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tiers.slice(0, 2).map((tier) => (
                        <span
                          key={tier}
                          className="text-xs px-2.5 py-1 rounded-full bg-[#014D4E]/8 text-[#014D4E] font-medium"
                        >
                          {tier}
                        </span>
                      ))}
                      {tiers.length > 2 && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500 font-medium">
                          +{tiers.length - 2} more
                        </span>
                      )}
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wide">Starting from</p>
                        <p className="text-2xl font-extrabold text-green-600 leading-none mt-1">{pkg.price}</p>
                      </div>
                      <span className="text-[#014D4E] font-semibold text-sm group-hover:translate-x-1 transition-transform flex items-center whitespace-nowrap">
                        View Details <ArrowRight className="ml-1 w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100 text-[#014D4E] relative overflow-hidden"
          >
            {/* Orange accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FF6B35] to-[#ff8f5e]" />
            <p className="text-[#FF6B35] font-medium tracking-wider uppercase text-sm mb-2 text-center">Book Now</p>
            <h3 className="text-2xl font-bold mb-2 text-center">Book Your Yatra Now</h3>
            <p className="text-center mb-8 text-gray-500">Fill the form and we'll contact you via WhatsApp</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Number of People *</label>
                  <select
                    name="adults"
                    required
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Package Type *</label>
                  <select
                    name="packageType"
                    required
                    value={formData.packageType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                  >
                    <option value="chardhamHeli">Chardham Yatra by Helicopter</option>
                    <option value="kedarBadriHH">Kedarnath & Badrinath Package (Haridwar to Haridwar)</option>
                    <option value="kedarBadriDD">Kedarnath & Badrinath Package (Delhi to Delhi)</option>
                    <option value="chardhamHH">Chardham Package (Haridwar to Haridwar)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Pickup Point *</label>
                  <select
                    name="pickupPoint"
                    required
                    value={formData.pickupPoint}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                  >
                    <option value="Dehradun">Dehradun</option>
                    <option value="Haridwar">Haridwar</option>
                    <option value="Delhi">Delhi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Preferred Departure Date *</label>
                <select
                  name="departure"
                  required
                  value={formData.departure}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                >
                  <option value="">Select departure date</option>
                  {getCurrentDates().map((month) =>
                    month.dates.map((date) => (
                      <option key={`${month.month}-${date}`} value={`${month.month} - ${date}`}>
                        {month.month} - {date}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Special Requests</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition-all"
                  placeholder="Any special requirements..."
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-10 bg-[#FF6B35] text-white h-14 rounded-full hover:bg-[#ff5722] transition-colors inline-flex items-center justify-center text-base group"
                >
                  Send Inquiry via WhatsApp
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </motion.div>
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
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">Ready to Begin Your Divine Journey?</h2>
            <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto">
              Reserve your seat today and experience a peaceful, well-planned pilgrimage.
            </p>
            <a
              href="https://wa.me/917060893636?text=Hi%2C%20I%27m%20interested%20in%20Char%20Dham"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#FF6B35] text-white h-14 px-8 rounded-full text-base font-semibold hover:bg-[#ff5722] transition-all shadow-lg shadow-[#FF6B35]/30 hover:shadow-xl hover:-translate-y-0.5"
            >
              WhatsApp Now for Instant Booking
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

