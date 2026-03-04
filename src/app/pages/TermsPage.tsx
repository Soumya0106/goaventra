import { useEffect } from "react";
import {
  ScrollText,
  CreditCard,
  MapPin,
  Users,
  UserCheck,
  AlertTriangle,
  FileCheck,
  Shield,
  Camera,
} from "lucide-react";

export function TermsPage() {
  useEffect(() => {
    document.title = "Terms & Conditions | GoAventra";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#014D4E] to-[#0F766E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <ScrollText className="w-12 h-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Please read these terms and conditions carefully
            before booking any travel packages with GoAventra.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section 1: Booking & Payments */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#FF6B35]">
            <div className="flex items-center mb-6">
              <CreditCard className="w-8 h-8 text-[#FF6B35] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                1. Booking & Payments
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-[#014D4E] mb-2">
                  Advance Payment
                </h3>
                <p className="text-gray-700">
                  A minimum <strong>50% advance</strong> is
                  required to confirm a booking.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-[#014D4E] mb-2">
                  Full Payment
                </h3>
                <p className="text-gray-700">
                  Full payment must be made{" "}
                  <strong>
                    at least 7 days prior to departure
                  </strong>
                  . Pending payments may result in automatic
                  cancellation of the trip.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-[#014D4E] mb-2">
                  Balance Payment
                </h3>
                <p className="text-gray-700">
                  Must be paid as per the agreed schedule.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Itinerary & Services */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#014D4E]">
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-[#014D4E] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                2. Itinerary & Services
              </h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-3 mt-1">
                  •
                </span>
                <span>
                  <strong>Check-in time</strong> for hotels is
                  generally <strong>11:00 AM</strong>; early
                  check-in is subject to availability.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-3 mt-1">
                  •
                </span>
                <span>
                  <strong>Transportation</strong> will be
                  provided as per itinerary; vehicles are not at
                  personal disposal, and AC may not work in
                  hilly terrain.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-3 mt-1">
                  •
                </span>
                <span>
                  Packages and itineraries are{" "}
                  <strong>subject to change</strong> due to
                  weather, traffic, overbooking, festivals,
                  strikes, or government restrictions. Suitable
                  alternatives will be arranged, but GoAventra
                  is not liable for refunds or compensation in
                  such cases.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Conduct & Responsibility */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#FF6B35]">
            <div className="flex items-center mb-6">
              <UserCheck className="w-8 h-8 text-[#FF6B35] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                3. Conduct & Responsibility of Travelers
              </h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#014D4E] font-bold mr-3 mt-1">
                  →
                </span>
                <span>
                  Guests must follow all rules and instructions
                  provided by the <strong>Trip Manager</strong>.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#014D4E] font-bold mr-3 mt-1">
                  →
                </span>
                <span>
                  <strong className="text-red-600">
                    Misbehavior, harassment, or illegal
                    activities
                  </strong>{" "}
                  (e.g., carrying banned substances, disrespect
                  to staff or other guests) may result in
                  immediate removal from the trip without
                  refund.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#014D4E] font-bold mr-3 mt-1">
                  →
                </span>
                <span>
                  Travelers are responsible for their
                  belongings; GoAventra is{" "}
                  <strong>not liable</strong> for lost or stolen
                  items.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#014D4E] font-bold mr-3 mt-1">
                  →
                </span>
                <span>
                  <strong>
                    Drinking or smoking in vehicles
                  </strong>{" "}
                  is strictly prohibited.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#014D4E] font-bold mr-3 mt-1">
                  →
                </span>
                <span>
                  Guests must depart at scheduled times; missing
                  transportation or activities does not entitle
                  a refund.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Accommodation & Travel */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#014D4E]">
            <div className="flex items-center mb-6">
              <MapPin className="w-8 h-8 text-[#014D4E] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                4. Accommodation & Travel
              </h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-3 mt-1">
                  •
                </span>
                <span>
                  Hotels will be provided as per the selected
                  category;{" "}
                  <strong>alternatives may be arranged</strong>{" "}
                  if the original hotel is unavailable.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-3 mt-1">
                  •
                </span>
                <span>
                  In case of <strong>vehicle breakdown</strong>,
                  travelers may wait for repairs or be provided
                  alternate transport.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-3 mt-1">
                  •
                </span>
                <span>
                  Special vehicles (e.g., 4x4) required due to
                  snow, road jams, or terrain will incur{" "}
                  <strong>additional charges</strong>.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Travel Documents */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#FF6B35]">
            <div className="flex items-center mb-6">
              <FileCheck className="w-8 h-8 text-[#FF6B35] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                5. Travel Documents & Visas
              </h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#014D4E] font-bold mr-3 mt-1">
                  •
                </span>
                <span>
                  Guests are responsible for{" "}
                  <strong>
                    valid passports, visas, permits, and
                    vaccinations
                  </strong>
                  .
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#014D4E] font-bold mr-3 mt-1">
                  •
                </span>
                <span>
                  GoAventra is <strong>not liable</strong> for
                  denied entry, visa rejections, or delays.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 6: Liability */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#014D4E]">
            <div className="flex items-center mb-6">
              <AlertTriangle className="w-8 h-8 text-[#014D4E] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                6. Liability
              </h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-3 mt-1">
                  !
                </span>
                <span>
                  GoAventra is <strong>not responsible</strong>{" "}
                  for loss, injury, delay, or damages caused by
                  third-party service providers.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-red-600 font-bold mr-3 mt-1">
                  !
                </span>
                <span>
                  No liability for disruptions caused by{" "}
                  <strong>force majeure events</strong> such as
                  natural disasters, pandemics, political
                  unrest, strikes, or government restrictions.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 7: Travel Insurance */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#FF6B35]">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-[#FF6B35] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                7. Travel Insurance
              </h2>
            </div>
            <p className="text-gray-700 text-lg">
              Travelers are <strong>strongly encouraged</strong>{" "}
              to purchase travel insurance to cover emergencies,
              medical needs, or loss of belongings.
            </p>
          </div>
        </section>

        {/* Section 8: Virtual Travel Manager */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#014D4E]">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-[#FF6B35] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                8. Virtual Travel Manager
              </h2>
            </div>
            <p className="text-gray-700">
              A <strong>Virtual Travel Manager</strong> may be
              appointed for coordination, guidance, and support
              during the trip.
            </p>
          </div>
        </section>

        {/* Section 9: Photography */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#FF6B35]">
            <div className="flex items-center mb-6">
              <Camera className="w-8 h-8 text-[#014D4E] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                9. Photography & Promotion
              </h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-3 mt-1">
                  •
                </span>
                <span>
                  GoAventra may take{" "}
                  <strong>photographs or videos</strong> during
                  the trip for promotional purposes.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-3 mt-1">
                  •
                </span>
                <span>
                  Travelers who do not wish to be photographed
                  must notify the Trip Manager at the start of
                  the trip.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Agreement Notice */}
        <div className="bg-gradient-to-r from-[#014D4E] to-[#0F766E] text-white rounded-lg shadow-xl p-8 text-center">
          <p className="text-xl font-semibold">
            ✅ By booking a GoAventra trip, you agree to these
            Terms & Conditions.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-[#014D4E] mb-4">
            Questions About Our Terms?
          </h3>
          <p className="text-gray-700 mb-6">
            If you need clarification on any of our terms and
            conditions, our team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/917060893636"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] text-white px-6 py-3 rounded-lg hover:bg-[#128C7E] transition-colors font-semibold"
            >
              WhatsApp Us
            </a>
            <a
              href="mailto:info@goaventra.com"
              className="bg-[#FF6B35] text-white px-6 py-3 rounded-lg hover:bg-[#E55A25] transition-colors font-semibold"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}