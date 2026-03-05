import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { allPackages } from "../data/packages";
import { packageTitleToSlug } from "../data/packageRouting";
import { packageDetailsBySlug } from "../data/packageDetails";

const defaultPickupOptions = [
  "Dehradun",
  "Haridwar",
  "Delhi",
  "Rishikesh",
  "Port Blair",
  "Srinagar",
  "Kochi",
  "On Request",
];

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pre-fill a package name */
  packageName?: string;
  /** Pre-fill a pickup point */
  pickup?: string;
}

type InquiryFormData = {
  name: string;
  phone: string;
  email: string;
  travelers: string;
  packageName: string;
  pickupPoint: string;
  departureDate: string;
  specialRequests: string;
};

export function InquiryModal({ isOpen, onClose, packageName = "", pickup = "" }: InquiryModalProps) {
  const packageOptions = useMemo(
    () => Array.from(new Set(allPackages.map((pkg) => pkg.title))).sort((a, b) => a.localeCompare(b)),
    [],
  );

  const matchedPickup = useMemo(() => {
    if (!packageName) return "";
    const slug = packageTitleToSlug(packageName);
    return packageDetailsBySlug[slug]?.pickup ?? "";
  }, [packageName]);

  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    phone: "",
    email: "",
    travelers: "2",
    packageName: packageName,
    pickupPoint: pickup || matchedPickup || "On Request",
    departureDate: "",
    specialRequests: "",
  });

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Sync prefilled props when they change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      packageName: packageName || prev.packageName,
      pickupPoint: pickup || matchedPickup || prev.pickupPoint,
    }));
  }, [packageName, pickup, matchedPickup]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = `*Package Inquiry from GoAventra Website*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Number of People:* ${formData.travelers}\n*Package Type:* ${formData.packageName}\n*Pickup Point:* ${formData.pickupPoint}\n*Preferred Departure Date:* ${formData.departureDate}\n*Special Requests:* ${formData.specialRequests || "None"}`;
    window.open(`https://wa.me/917060893636?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
                <div>
                  <p className="text-[#FF6B35] tracking-wider uppercase text-xs mb-0.5">Book Now</p>
                  <h2 className="text-xl text-[#014D4E] font-semibold">Book Your Yatra Now</h2>
                </div>
                <button
                  onClick={onClose}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="modal-inq-name" className="block text-gray-700 text-sm mb-1.5">
                      Full Name *
                    </label>
                    <input
                      id="modal-inq-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-inq-phone" className="block text-gray-700 text-sm mb-1.5">
                      Phone *
                    </label>
                    <input
                      id="modal-inq-phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="modal-inq-email" className="block text-gray-700 text-sm mb-1.5">
                      Email *
                    </label>
                    <input
                      id="modal-inq-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-inq-travelers" className="block text-gray-700 text-sm mb-1.5">
                      Number of People *
                    </label>
                    <select
                      id="modal-inq-travelers"
                      required
                      value={formData.travelers}
                      onChange={(e) => setFormData((prev) => ({ ...prev, travelers: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                    >
                      {Array.from({ length: 15 }, (_, i) => i + 1).map((count) => (
                        <option key={count} value={String(count)}>
                          {count} {count === 1 ? "Person" : "People"}
                        </option>
                      ))}
                      <option value="16+">16+ People</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="modal-inq-package" className="block text-gray-700 text-sm mb-1.5">
                      Package Type *
                    </label>
                    <select
                      id="modal-inq-package"
                      required
                      value={formData.packageName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, packageName: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                    >
                      <option value="">Select package</option>
                      {packageOptions.map((pkg) => (
                        <option key={pkg} value={pkg}>
                          {pkg}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="modal-inq-pickup" className="block text-gray-700 text-sm mb-1.5">
                      Pickup Point
                    </label>
                    <select
                      id="modal-inq-pickup"
                      value={formData.pickupPoint}
                      onChange={(e) => setFormData((prev) => ({ ...prev, pickupPoint: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                    >
                      {Array.from(new Set([...defaultPickupOptions, pickup, matchedPickup]))
                        .filter(Boolean)
                        .map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="modal-inq-departure" className="block text-gray-700 text-sm mb-1.5">
                    Preferred Departure Date
                  </label>
                  <input
                    id="modal-inq-departure"
                    type="date"
                    value={formData.departureDate}
                    onChange={(e) => setFormData((prev) => ({ ...prev, departureDate: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="modal-inq-special" className="block text-gray-700 text-sm mb-1.5">
                    Special Requests
                  </label>
                  <textarea
                    id="modal-inq-special"
                    rows={3}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm resize-none"
                    placeholder="Any special requirements..."
                  />
                </div>

                <div className="flex justify-center pt-1">
                  <button
                    type="submit"
                    className="px-10 h-12 rounded-full bg-[#FF6B35] text-white hover:bg-[#ff5722] transition-colors inline-flex items-center justify-center text-sm font-semibold"
                  >
                    Send Inquiry via WhatsApp
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
