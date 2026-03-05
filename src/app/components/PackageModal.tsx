import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calendar, Users, Utensils, Car, Hotel, Camera, Check, Phone, Mail } from 'lucide-react';
import { ImageWithFallback } from './media/ImageWithFallback';
import { useEffect, useState } from 'react';
import { InquiryModal } from './InquiryModal';

interface Package {
  id: number;
  title: string;
  location: string;
  duration: string;
  groupSize: string;
  price: string;
  departure: string;
  image: string;
  inclusions: string[];
  category: string;
  featured?: boolean;
  link?: string;
  description?: string;
  highlights?: string[];
  itinerary?: Array<{ day: string; description: string }>;
}

interface PackageModalProps {
  package: Package;
  isOpen: boolean;
  onClose: () => void;
}

const inclusionIcons: Record<string, any> = {
  Meals: Utensils,
  Transport: Car,
  Stay: Hotel,
  Sightseeing: Camera,
  'Team Activities': Users,
};

export function PackageModal({ package: pkg, isOpen, onClose }: PackageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const [showInquiryModal, setShowInquiryModal] = useState(false);

  // Generate default highlights if not provided
  const highlights = pkg.highlights || [
    `Experience the best of ${pkg.location}`,
    'Expert local guides',
    'Comfortable accommodations',
    'All meals included',
    'Small group experience',
    'Hassle-free transportation'
  ];

  // Generate default itinerary if not provided
  const itinerary = pkg.itinerary || [
    { day: 'Day 1', description: `Arrival at ${pkg.location} and check-in to hotel. Welcome dinner and trip briefing.` },
    { day: 'Day 2-3', description: 'Main sightseeing activities and cultural experiences. Visit key attractions and local markets.' },
    { day: 'Day 4', description: 'Optional activities and free time to explore on your own. Group dinner in the evening.' },
    { day: 'Last Day', description: 'Checkout and departure. Airport transfers included.' }
  ];

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1">
              {/* Hero Image */}
              <div className="relative h-64 md:h-96">
                <ImageWithFallback
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                  <div className="max-w-4xl mx-auto">
                    {pkg.featured && (
                      <div className="inline-block bg-[#FF6B35] px-4 py-2 rounded-full text-sm mb-3">
                        ⭐ Featured Package
                      </div>
                    )}
                    <h2 className="text-3xl md:text-5xl mb-2">{pkg.title}</h2>
                    <p className="text-xl text-gray-200">{pkg.category}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
                {/* Quick Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 text-[#014D4E] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Location</p>
                        <p className="text-[#014D4E]">{pkg.location}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-6 h-6 text-[#FF6B35] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Duration</p>
                        <p className="text-[#FF6B35]">{pkg.duration}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-start gap-3">
                      <Users className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Group Size</p>
                        <p className="text-green-700">{pkg.groupSize}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-2xl text-[#014D4E] mb-4">About This Package</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {pkg.description || `Embark on an unforgettable journey to ${pkg.location}. This carefully curated ${pkg.duration} experience offers the perfect blend of adventure, culture, and relaxation. Our expert guides will ensure you experience the very best of what ${pkg.location} has to offer, creating memories that will last a lifetime.`}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mb-8">
                  <h3 className="text-2xl text-[#014D4E] mb-4">Package Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Inclusions */}
                <div className="mb-8">
                  <h3 className="text-2xl text-[#014D4E] mb-4">Package Includes</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {pkg.inclusions.map((inclusion) => {
                      const Icon = inclusionIcons[inclusion] || Camera;
                      return (
                        <div key={inclusion} className="flex flex-col items-center text-center p-4 bg-gray-50 rounded-xl">
                          <Icon className="w-8 h-8 text-[#FF6B35] mb-2" />
                          <span className="text-sm text-gray-700">{inclusion}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Itinerary */}
                <div className="mb-8">
                  <h3 className="text-2xl text-[#014D4E] mb-4">Itinerary Overview</h3>
                  <div className="space-y-4">
                    {itinerary.map((day, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex-shrink-0 w-16 h-16 bg-[#FF6B35] rounded-full flex items-center justify-center text-white">
                          {index + 1}
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="text-lg text-[#014D4E] mb-1">{day.day}</h4>
                          <p className="text-gray-700">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Departure Dates */}
                <div className="mb-8">
                  <h3 className="text-2xl text-[#014D4E] mb-4">Departure Dates</h3>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                    <p className="text-lg text-[#014D4E]">{pkg.departure}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Custom dates available for group bookings. Contact us for more information.
                    </p>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="bg-gradient-to-r from-[#014D4E] to-[#0F766E] rounded-2xl p-8 text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <p className="text-lg text-gray-200 mb-2">Package Price</p>
                      <p className="text-5xl mb-2">{pkg.price}</p>
                      <p className="text-gray-200">per person (inclusive of all taxes)</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                      <a
                        href="https://wa.me/917060893636"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 bg-[#FF6B35] hover:bg-[#ff5722] text-white px-8 py-4 rounded-full transition-colors text-lg whitespace-nowrap"
                      >
                        <Phone className="w-5 h-5" />
                        Book Now
                      </a>
                      <button
                        type="button"
                        onClick={() => setShowInquiryModal(true)}
                        className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#014D4E] px-8 py-4 rounded-full transition-colors text-lg whitespace-nowrap"
                      >
                        <Mail className="w-5 h-5" />
                        Inquiry
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-white/20 text-center">
                    <p className="text-gray-200 mb-2">Have questions? Call us directly:</p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <a href="tel:+917060893636" className="hover:text-[#FF6B35] transition-colors">
                        +91 7060893636
                      </a>
                      <span className="text-gray-400">|</span>
                      <a href="tel:+917457042625" className="hover:text-[#FF6B35] transition-colors">
                        +91 7457042625
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    <InquiryModal
      isOpen={showInquiryModal}
      onClose={() => setShowInquiryModal(false)}
      packageName={pkg.title}
    />
    </>
  );
}

