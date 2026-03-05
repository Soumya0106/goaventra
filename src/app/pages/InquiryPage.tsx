import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { allPackages } from "../data/packages";
import { packageTitleToSlug } from "../data/packageRouting";
import { packageDetailsBySlug } from "../data/packageDetails";

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

export function InquiryPage() {
  const [searchParams] = useSearchParams();
  const prefilledPackage = searchParams.get("package") ?? "";
  const prefilledPickup = searchParams.get("pickup") ?? "";

  const packageOptions = useMemo(
    () => Array.from(new Set(allPackages.map((pkg) => pkg.title))).sort((a, b) => a.localeCompare(b)),
    [],
  );

  const matchedPickup = useMemo(() => {
    if (!prefilledPackage) {
      return "";
    }
    const slug = packageTitleToSlug(prefilledPackage);
    return packageDetailsBySlug[slug]?.pickup ?? "";
  }, [prefilledPackage]);

  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    phone: "",
    email: "",
    travelers: "2",
    packageName: prefilledPackage,
    pickupPoint: prefilledPickup || matchedPickup || "On Request",
    departureDate: "",
    specialRequests: "",
  });

  useEffect(() => {
    document.title = "Package Inquiry | GoAventra";
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      packageName: prefilledPackage || prev.packageName,
      pickupPoint: prefilledPickup || matchedPickup || prev.pickupPoint,
    }));
  }, [prefilledPackage, prefilledPickup, matchedPickup]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = `*Package Inquiry from GoAventra Website*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Number of People:* ${formData.travelers}\n*Package Type:* ${formData.packageName}\n*Pickup Point:* ${formData.pickupPoint}\n*Preferred Departure Date:* ${formData.departureDate}\n*Special Requests:* ${formData.specialRequests || "None"}`;
    window.open(`https://wa.me/917060893636?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="py-12 md:py-16 bg-[#f4f5f7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-10">
          <p className="text-center text-[#FF6B35] tracking-wider uppercase text-sm mb-2">Book Now</p>
          <h1 className="text-center text-[#014D4E] text-3xl md:text-4xl mb-3">Book Your Yatra Now</h1>
          <p className="text-center text-gray-500 mb-8">
            Fill the form and we&apos;ll contact you via WhatsApp
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="inq-name" className="block text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="inq-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="inq-phone" className="block text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  id="inq-phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="inq-email" className="block text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  id="inq-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="inq-travelers" className="block text-gray-700 mb-2">
                  Number of People *
                </label>
                <select
                  id="inq-travelers"
                  required
                  value={formData.travelers}
                  onChange={(e) => setFormData((prev) => ({ ...prev, travelers: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="inq-package" className="block text-gray-700 mb-2">
                  Package Type *
                </label>
                <select
                  id="inq-package"
                  required
                  value={formData.packageName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, packageName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
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
                <label htmlFor="inq-pickup" className="block text-gray-700 mb-2">
                  Pickup Point
                </label>
                <select
                  id="inq-pickup"
                  value={formData.pickupPoint}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pickupPoint: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                >
                  {Array.from(new Set([...defaultPickupOptions, prefilledPickup, matchedPickup]))
                    .filter(Boolean)
                    .map((pickup) => (
                      <option key={pickup} value={pickup}>
                        {pickup}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="inq-departure" className="block text-gray-700 mb-2">
                Preferred Departure Date
              </label>
              <input
                id="inq-departure"
                type="date"
                value={formData.departureDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, departureDate: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label htmlFor="inq-special" className="block text-gray-700 mb-2">
                Special Requests
              </label>
              <textarea
                id="inq-special"
                rows={4}
                value={formData.specialRequests}
                onChange={(e) => setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none"
                placeholder="Any special requirements..."
              />
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="px-10 h-14 rounded-full bg-[#FF6B35] text-white hover:bg-[#ff5722] transition-colors inline-flex items-center justify-center"
              >
                Send Inquiry via WhatsApp
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
