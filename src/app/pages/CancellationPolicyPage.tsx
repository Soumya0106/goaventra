import { useEffect } from "react";
import {
  FileText,
  AlertCircle,
  Calendar,
  RefreshCw,
  Users,
  Shield,
} from "lucide-react";

export function CancellationPolicyPage() {
  useEffect(() => {
    document.title = "Cancellation Policy | GoAventra";
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#014D4E] to-[#0F766E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <FileText className="w-12 h-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Cancellation Policy
            </h1>
          </div>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            At GoAventra, we understand that travel plans may
            change. This cancellation policy applies to all
            domestic and international travel packages and is
            designed to be transparent, fair, and easy to
            understand.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section 1: Customer Cancellations */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#FF6B35]">
            <div className="flex items-center mb-6">
              <AlertCircle className="w-8 h-8 text-[#FF6B35] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                1. Cancellation by Customer
              </h2>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Customer-Initiated Cancellations:
            </h3>

            {/* 30+ Days */}
            <div className="mb-6 p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-start mb-3">
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  ✓
                </div>
                <h4 className="text-xl font-semibold text-green-800">
                  30+ days before departure
                </h4>
              </div>
              <ul className="ml-11 space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong>Domestic:</strong> 100% refund minus
                    10% processing fee
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong>International:</strong> 100% refund
                    minus 15% processing fee (airline/hotel
                    charges may apply)
                  </span>
                </li>
              </ul>
            </div>

            {/* 15-29 Days */}
            <div className="mb-6 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start mb-3">
                <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  !
                </div>
                <h4 className="text-xl font-semibold text-yellow-800">
                  15–29 days before departure
                </h4>
              </div>
              <ul className="ml-11 space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong>Domestic:</strong> 50% refund
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong>International:</strong> 50% refund
                    (may vary based on airline/hotel rules)
                  </span>
                </li>
              </ul>
            </div>

            {/* Less than 15 Days */}
            <div className="mb-6 p-6 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start mb-3">
                <div className="flex-shrink-0 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  ✕
                </div>
                <h4 className="text-xl font-semibold text-red-800">
                  Less than 15 days before departure
                </h4>
              </div>
              <ul className="ml-11 space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong>Domestic:</strong> No refund
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong>International:</strong> No refund
                  </span>
                </li>
              </ul>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h4 className="font-semibold text-blue-900 mb-3">
                Important Notes:
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  <span>
                    All cancellation requests must be submitted{" "}
                    <strong>
                      in writing via Email or WhatsApp
                    </strong>{" "}
                    by the person who made the booking.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  <span>
                    Refunds for flights, hotels, permits, or
                    third-party services are subject to the
                    respective supplier's rules.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  <span>
                    For international trips, additional bank
                    charges, currency conversion, and airline
                    rules may apply.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Cancellation by GoAventra */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#014D4E]">
            <div className="flex items-center mb-6">
              <RefreshCw className="w-8 h-8 text-[#014D4E] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                2. Cancellation by GoAventra
              </h2>
            </div>
            <p className="text-gray-700 mb-4">
              If GoAventra cancels a trip due to unforeseen
              circumstances (natural disasters, political
              unrest, pandemics, strikes, government
              restrictions, etc.):
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-3">
                  ✓
                </span>
                <span>
                  Customers will receive a{" "}
                  <strong>full refund</strong>, or
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-3">
                  ✓
                </span>
                <span>
                  Option to{" "}
                  <strong>
                    reschedule the trip without additional
                    charges
                  </strong>
                  .
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Modifications */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#FF6B35]">
            <div className="flex items-center mb-6">
              <Calendar className="w-8 h-8 text-[#FF6B35] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                3. Modifications & Date Changes
              </h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#014D4E] mr-2">•</span>
                <span>
                  Requests to change travel dates or itineraries
                  are subject to availability.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#014D4E] mr-2">•</span>
                <span>
                  Requests must be made{" "}
                  <strong>
                    at least 15 days prior to departure
                  </strong>
                  .
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#014D4E] mr-2">•</span>
                <span>
                  Additional charges may apply for international
                  trips due to flight changes, hotel
                  differences, or visa requirements.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 4: Group Bookings */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#014D4E]">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-[#014D4E] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                4. Group Bookings
              </h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#014D4E] mr-2">•</span>
                <span>
                  For group trips, cancellation terms may differ
                  and will be communicated at the time of
                  booking.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#014D4E] mr-2">•</span>
                <span>
                  Large group bookings may require earlier
                  payments or stricter cancellation rules.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Travel Insurance */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#FF6B35]">
            <div className="flex items-center mb-6">
              <Shield className="w-8 h-8 text-[#FF6B35] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                5. Travel Insurance Recommendation
              </h2>
            </div>
            <p className="text-gray-700 mb-4 font-semibold">
              All travelers are strongly encouraged to purchase
              travel insurance, covering:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-2">
                  ✓
                </span>
                <span className="text-gray-700">
                  Trip cancellations
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-2">
                  ✓
                </span>
                <span className="text-gray-700">
                  Medical emergencies
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-2">
                  ✓
                </span>
                <span className="text-gray-700">
                  Lost baggage or belongings
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-[#FF6B35] font-bold mr-2">
                  ✓
                </span>
                <span className="text-gray-700">
                  Flight delays or interruptions
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Refund Processing */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-[#014D4E]">
            <div className="flex items-center mb-6">
              <RefreshCw className="w-8 h-8 text-[#FF6B35] mr-3" />
              <h2 className="text-3xl font-bold text-[#014D4E]">
                6. Refund Processing
              </h2>
            </div>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-[#014D4E] mr-2">•</span>
                <span>
                  Refunds will be processed within{" "}
                  <strong>14 working days</strong> via the
                  original payment method.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#014D4E] mr-2">•</span>
                <span>
                  For international payments, additional bank
                  processing time or currency conversion may
                  apply.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Agreement Notice */}
        <div className="bg-gradient-to-r from-[#014D4E] to-[#0F766E] text-white rounded-lg shadow-xl p-8 text-center">
          <p className="text-xl font-semibold">
            ✅ By booking a GoAventra domestic or international
            trip, you agree to this Cancellation Policy.
          </p>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-[#014D4E] mb-4">
            Have Questions?
          </h3>
          <p className="text-gray-700 mb-6">
            If you have any questions about our cancellation
            policy, please don't hesitate to contact us.
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
              href="https://wa.me/917060893636?text=Hi%20GoAventra%2C%20I%20have%20a%20question%20about%20your%20cancellation%20policy."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF6B35] text-white px-6 py-3 rounded-lg hover:bg-[#E55A25] transition-colors font-semibold"
            >
              Inquiry on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
