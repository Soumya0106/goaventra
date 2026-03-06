import { useState, useEffect, FormEvent } from "react";
import { motion } from "motion/react";
import {
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Loader2,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";

const faqData = [
  {
    question: "What is included in the tour packages?",
    answer:
      "Our packages include accommodation, meals, transportation, sightseeing, and an experienced guide. Specific inclusions vary by package.",
  },
  {
    question: "How do I book a tour?",
    answer:
      "You can book directly through WhatsApp, call us, or fill out the inquiry form. We'll guide you through the booking process.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Cancellation policies vary by package. Generally, cancellations made 30+ days in advance receive full refunds minus processing fees.",
  },
  {
    question: "Do you offer customized packages?",
    answer:
      "Yes! We specialize in creating personalized itineraries based on your preferences, budget, and schedule.",
  },
];

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Inject FAQPage JSON-LD structured data for SEO
  useEffect(() => {
    document.title = "Contact Us | GoAventra";

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqData.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-jsonld";
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById("faq-jsonld");
      if (existing) existing.remove();
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const message = `*New Inquiry from GoAventra Website*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email || "Not Provided"}\n*Phone:* ${formData.phone}\n*Subject:* ${formData.subject}\n*Message:* ${formData.message}`;
      const whatsappUrl = `https://wa.me/917060893636?text=${encodeURIComponent(message)}`;
      
      window.open(whatsappUrl, "_blank");

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to redirect to WhatsApp:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <section className="relative py-20 bg-gradient-to-r from-[#014D4E] to-[#0F766E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-200">
              We're here to help plan your perfect journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-2xl text-[#014D4E] mb-6">
                  Get in Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[#FF6B35]" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-[#014D4E] mb-1">
                        Phone
                      </h3>
                      <a
                        href="tel:+917060893636"
                        className="text-gray-700 hover:text-[#FF6B35] transition-colors block"
                      >
                        +91 7457042625
                      </a>
                      <a
                        href="tel:+917457042625"
                        className="text-gray-700 hover:text-[#FF6B35] transition-colors block"
                      >
                        +91 7060893636
                      </a>
                      <p className="text-sm text-gray-500 mt-1">
                        Mon-Sat: 9 AM - 8 PM
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-[#FF6B35]" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-[#014D4E] mb-1">
                        WhatsApp
                      </h3>
                      <a
                        href="https://wa.me/917060893636?text=Hi%20GoAventra%2C%20I%20want%20to%20inquire%20about%20a%20tour%20package."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-[#FF6B35] transition-colors"
                      >
                        +91 7060893636
                      </a>
                      <p className="text-sm text-gray-500 mt-1">
                        Quick response during business hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-[#FF6B35]" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-[#014D4E] mb-1">
                        Location
                      </h3>
                      <div className="mb-2">
                        <span className="text-gray-700 font-medium text-sm">Head Office</span>
                        <p className="text-gray-600 text-sm">Dehradun, Uttarakhand</p>
                      </div>
                      <div>
                        <span className="text-gray-700 font-medium text-sm">Branch Offices</span>
                        <p className="text-gray-600 text-sm">Noida, Uttar Pradesh</p>
                        <p className="text-gray-600 text-sm">Haridwar, Uttarakhand</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Serving clients across India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[#FF6B35]" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-[#014D4E] mb-1">
                        Business Hours
                      </h3>
                      <p className="text-gray-700">
                        Monday - Saturday
                      </p>
                      <p className="text-sm text-gray-500">
                        9:00 AM - 8:00 PM IST
                      </p>
                      <p className="text-sm text-gray-500">
                        Sunday: By Appointment
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* WhatsApp Quick Contact */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-br from-[#25D366] to-[#20BA5A] rounded-2xl p-6 text-white shadow-lg"
              >
                <svg
                  className="w-12 h-12 mb-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>

                <h3 className="text-xl mb-2">Quick Connect</h3>
                <p className="mb-4">
                  Get instant response on WhatsApp
                </p>
                <a
                  href="https://wa.me/917060893636?text=Hi%20GoAventra%2C%20I%27d%20like%20to%20inquire%20about%20your%20tour%20packages"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-white text-[#25D366] py-3 rounded-lg text-center hover:bg-gray-100 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <h2 className="text-3xl text-[#014D4E] mb-2">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to
                  you as soon as possible
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition"
                        placeholder="john@example.com (Optional)"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-gray-700 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-gray-700 mb-2"
                      >
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition"
                      >
                        <option value="">
                          Select a subject
                        </option>
                        <option value="Chardham">
                          Chardham
                        </option>
                        <option value="group-tour">
                          Group Tour Inquiry
                        </option>
                        <option value="corporate">
                          Corporate Trip
                        </option>
                        <option value="custom">
                          Custom Package
                        </option>
                        <option value="general">
                          General Inquiry
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-700 mb-2"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent outline-none transition resize-none"
                      placeholder="Tell us about your travel plans, dates, number of people, and any specific requirements..."
                    />
                  </div>

                  {/* Status Messages */}
                  {submitStatus === "success" && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                      ✓ Message sent successfully! We'll get
                      back to you within 24 hours.
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                      ✗ Failed to send message. Please try again
                      or contact us via phone/WhatsApp.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#FF6B35] text-white h-16 rounded-full hover:bg-[#ff5722] transition-colors flex items-center justify-center text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By submitting this form, you agree to be
                    contacted by GoAventra regarding your
                    inquiry
                  </p>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="mb-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 inline-block">
              <p className="text-[#014D4E] text-lg font-medium">
                For business inquiries, message us on WhatsApp:{" "}
                <a
                  href="https://wa.me/917060893636?text=Hi%20GoAventra%2C%20I%20have%20a%20business%20inquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF6B35] hover:underline ml-1"
                >
                  +91 7060893636
                </a>
              </p>
            </div>
            
            <h2 className="text-3xl md:text-4xl text-[#014D4E] mb-4">
              Find Us
            </h2>
            <p className="text-xl text-gray-600">
              We're based in Dehradun, Uttarakhand
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center"
          >
            <div className="text-center text-gray-600">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-[#FF6B35]" />
              <p className="text-lg">
                Map Integration Available
              </p>
              <p className="text-sm">Dehradun, Uttarakhand</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl text-[#014D4E] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Accordion
              type="single"
              collapsible
              className="space-y-4"
            >
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="bg-white rounded-xl shadow-md border-none px-6"
                >
                  <AccordionTrigger className="text-lg text-[#014D4E] font-semibold hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
