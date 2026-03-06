import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import { domesticPackages, internationalPackages } from "../data/packages";
import { packageTitleToSlug } from "../data/packageRouting";
import { packageDetailsBySlug } from "../data/packageDetails";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
  customDepartureDate: string;
  specialRequests: string;
};

export function InquiryModal({ isOpen, onClose, packageName = "", pickup = "" }: InquiryModalProps) {
  const domesticPackageOptions = useMemo(
    () => Array.from(new Set(domesticPackages.map((pkg) => pkg.title))).sort((a, b) => a.localeCompare(b)),
    [],
  );
  const internationalPackageOptions = useMemo(
    () => Array.from(new Set(internationalPackages.map((pkg) => pkg.title))).sort((a, b) => a.localeCompare(b)),
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
    customDepartureDate: "",
    specialRequests: "",
  });
  const [packageTypeError, setPackageTypeError] = useState("");

  const selectedPackagePickup = useMemo(() => {
    if (!formData.packageName || formData.packageName === "Custom Package") {
      return "On Request";
    }
    const slug = packageTitleToSlug(formData.packageName);
    return packageDetailsBySlug[slug]?.pickup ?? "";
  }, [formData.packageName]);

  const isSpiritualPackage = useMemo(() => {
    const name = formData.packageName.trim().toLowerCase();
    if (!name || name === "custom package") {
      return false;
    }
    return ["chardham", "kedarnath", "badrinath", "gangotri", "yamunotri"].some((keyword) =>
      name.includes(keyword),
    );
  }, [formData.packageName]);

  const pickupOptions = useMemo(() => {
    if (!formData.packageName || formData.packageName === "Custom Package") {
      return ["On Request"];
    }
    const options = Array.from(
      new Set([selectedPackagePickup, pickup, matchedPickup].filter(Boolean)),
    );
    return options.length > 0 ? options : ["On Request"];
  }, [formData.packageName, selectedPackagePickup, pickup, matchedPickup]);

  useEffect(() => {
    if (!pickupOptions.includes(formData.pickupPoint)) {
      setFormData((prev) => ({ ...prev, pickupPoint: pickupOptions[0] ?? "On Request" }));
    }
  }, [pickupOptions, formData.pickupPoint]);

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
    if (!formData.packageName) {
      setPackageTypeError("Please select a package type.");
      return;
    }
    setPackageTypeError("");
    const formattedDeparture = formData.departureDate === 'Custom' 
      ? `*Custom Date:* ${formData.customDepartureDate}` 
      : formData.departureDate;
      
    const message = `*Package Inquiry from GoAventra Website*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email || "Not Provided"}\n*Number of People:* ${formData.travelers}\n*Package Type:* ${formData.packageName}\n*Pickup Point:* ${formData.pickupPoint}\n*Preferred Departure Date:* ${formattedDeparture}\n*Special Requests:* ${formData.specialRequests || "None"}`;
    window.open(`https://wa.me/917060893636?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  const handlePackageTypeChange = (nextPackage: string) => {
    const slug = packageTitleToSlug(nextPackage);
    const inferredPickup = packageDetailsBySlug[slug]?.pickup ?? "";
    setFormData((prev) => ({
      ...prev,
      packageName: nextPackage,
      pickupPoint: nextPackage === "Custom Package" ? "On Request" : inferredPickup || prev.pickupPoint,
    }));
    setPackageTypeError("");
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
                      Email
                    </label>
                    <input
                      id="modal-inq-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                      placeholder="your@email.com (Optional)"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-inq-travelers" className="block text-gray-700 text-sm mb-1.5">
                      Number of People *
                    </label>
                    <input
                      type="number"
                      id="modal-inq-travelers"
                      required
                      min={1}
                      value={formData.travelers}
                      onChange={(e) => setFormData((prev) => ({ ...prev, travelers: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                      placeholder="e.g., 4"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="modal-inq-package" className="block text-gray-700 text-sm mb-1.5">
                      Package Type *
                    </label>
                    <Select value={formData.packageName} onValueChange={handlePackageTypeChange}>
                      <SelectTrigger
                        id="modal-inq-package"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm bg-white ${
                          packageTypeError ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <SelectValue placeholder="Select package" />
                      </SelectTrigger>
                      <SelectContent side="bottom" sideOffset={6} className="max-h-72 z-[80]">
                        <SelectItem value="Custom Package">Custom Package</SelectItem>
                        <SelectSeparator className="my-1 bg-gray-200" />
                        <SelectGroup>
                          <SelectLabel className="text-black font-bold text-base bg-gray-100 rounded-sm px-2 py-1.5 mt-1 mb-1">
                            Domestic Packages
                          </SelectLabel>
                          {domesticPackageOptions.map((pkg) => (
                            <SelectItem key={pkg} value={pkg}>
                              {pkg}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                        <SelectSeparator className="my-1 bg-gray-200" />
                        <SelectGroup>
                          <SelectLabel className="text-black font-bold text-base bg-gray-100 rounded-sm px-2 py-1.5 mt-1 mb-1">
                            International Packages
                          </SelectLabel>
                          {internationalPackageOptions.map((pkg) => (
                            <SelectItem key={pkg} value={pkg}>
                              {pkg}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {packageTypeError && (
                      <p className="mt-1 text-xs text-red-600">{packageTypeError}</p>
                    )}
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
                      {pickupOptions.map((p) => (
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
                  <div className="space-y-4">
                    {isSpiritualPackage ? (
                      <>
                        <select
                          id="modal-inq-departure"
                          value={formData.departureDate}
                          onChange={(e) => setFormData((prev) => ({ ...prev, departureDate: e.target.value }))}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                        >
                          <option value="">Select departure date</option>
                          <option value="May 2026 - 1st">May 2026 - 1st</option>
                          <option value="May 2026 - 6th">May 2026 - 6th</option>
                          <option value="May 2026 - 11th">May 2026 - 11th</option>
                          <option value="May 2026 - 16th">May 2026 - 16th</option>
                          <option value="May 2026 - 21st">May 2026 - 21st</option>
                          <option value="May 2026 - 26th">May 2026 - 26th</option>
                          <option value="May 2026 - 31st">May 2026 - 31st</option>
                          <option value="June 2026 - 5th">June 2026 - 5th</option>
                          <option value="June 2026 - 10th">June 2026 - 10th</option>
                          <option value="June 2026 - 15th">June 2026 - 15th</option>
                          <option value="June 2026 - 20th">June 2026 - 20th</option>
                          <option value="June 2026 - 25th">June 2026 - 25th</option>
                          <option value="June 2026 - 30th">June 2026 - 30th</option>
                          <option value="Custom">Custom Date</option>
                        </select>
                        
                        {formData.departureDate === 'Custom' && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <input
                              type="date"
                              required={formData.departureDate === 'Custom'}
                              value={formData.customDepartureDate}
                              onChange={(e) => setFormData((prev) => ({ ...prev, customDepartureDate: e.target.value }))}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                            />
                          </motion.div>
                        )}
                      </>
                    ) : (
                      <input
                        id="modal-inq-departure"
                        type="date"
                        value={formData.departureDate}
                        onChange={(e) => setFormData((prev) => ({ ...prev, departureDate: e.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none text-sm"
                      />
                    )}
                  </div>
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
