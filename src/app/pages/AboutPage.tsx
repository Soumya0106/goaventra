import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Shield, Users, Heart, Target, Eye } from 'lucide-react';
import { ImageWithFallback } from '../components/media/ImageWithFallback';

const values = [
  {
    icon: Shield,
    title: 'Trust & Transparency',
    description: 'We believe in complete transparency with no hidden charges and honest communication.',
  },
  {
    icon: Heart,
    title: 'Customer First',
    description: 'Your satisfaction and experience are our top priorities in every journey we create.',
  },
  {
    icon: Award,
    title: 'Quality Service',
    description: 'We maintain the highest standards in accommodation, transport, and tour guidance.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Our experienced team ensures every detail of your trip is perfectly executed.',
  },
];

const stats = [
  { number: '500+', label: 'Happy Travelers' },
  { number: '50+', label: 'Destinations' },
  { number: '4.9/5', label: 'Customer Rating' },
  { number: '5+', label: 'Years Experience' },
];

export function AboutPage() {
  useEffect(() => {
    document.title = "About Us | GoAventra";
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#014D4E] to-[#0F766E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl mb-4">About GoAventra</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Your trusted partner in creating unforgettable travel experiences across India and beyond
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl text-[#014D4E] mb-6">Our Story</h2>
              <p className="text-gray-700 text-lg mb-4">
                GoAventra was born from a passion for travel and a desire to make authentic experiences accessible
                to everyone. What started as a small team of travel enthusiasts has grown into a trusted travel
                company serving hundreds of satisfied travelers.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                We specialize in spiritual journeys, adventure tours, and corporate trips across India and
                international destinations. Our commitment to quality, transparency, and customer satisfaction
                has made us a preferred choice for travelers seeking meaningful experiences.
              </p>
              <p className="text-gray-700 text-lg">
                As an MSME registered travel company, we adhere to the highest standards of service and
                professionalism, ensuring every journey with us is safe, comfortable, and memorable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1768410318398-fcd1dc09dfc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHRyYXZlbCUyMGFkdmVudHVyZSUyMHRvdXJ8ZW58MXx8fHwxNzcwNTc0MDA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Group Travel"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#014D4E] to-[#0F766E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center text-white"
              >
                <div className="text-5xl md:text-6xl mb-2">{stat.number}</div>
                <div className="text-lg text-gray-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6B35]/10 rounded-full mb-6">
                <Target className="w-8 h-8 text-[#FF6B35]" />
              </div>
              <h2 className="text-3xl text-[#014D4E] mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg">
                To provide exceptional travel experiences that inspire, educate, and create lasting memories. We
                strive to make every journey affordable, comfortable, and meaningful while maintaining the highest
                standards of service and transparency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6B35]/10 rounded-full mb-6">
                <Eye className="w-8 h-8 text-[#FF6B35]" />
              </div>
              <h2 className="text-3xl text-[#014D4E] mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg">
                To become India's most trusted travel company, known for our integrity, quality service, and
                customer-centric approach. We envision a world where everyone has the opportunity to explore,
                discover, and connect with diverse cultures and beautiful destinations.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl text-[#014D4E] mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6B35]/10 rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-[#FF6B35]" />
                </div>
                <h3 className="text-xl text-[#014D4E] mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MSME Registered */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-[#014D4E] to-[#0F766E] rounded-2xl p-8 md:p-12 text-white text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl mb-4">MSME Registered Trust</h2>
            <p className="text-xl text-gray-200 mb-6">
              GoAventra is officially registered with the Ministry of Micro, Small and Medium Enterprises (MSME),
              Government of India. This certification reflects our commitment to maintaining the highest standards
              of professionalism and service quality.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                ✓ Government Registered
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                ✓ Verified Trust
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                ✓ Licensed Tour Operator
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl text-[#014D4E] mb-4">Why Choose GoAventra?</h2>
            <p className="text-xl text-gray-600">Your journey, our commitment</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'No Hidden Charges',
                description: 'Complete transparency in pricing. What you see is what you pay.',
              },
              {
                title: 'All-Inclusive Pricing',
                description: 'Simple package pricing with complete transparency.',
              },
              {
                title: 'Experienced Guides',
                description: 'Certified and knowledgeable tour guides for every journey.',
              },
              {
                title: 'Quality Accommodation',
                description: 'Carefully selected hotels and stays for your comfort.',
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock customer support during your trip.',
              },
              {
                title: 'Flexible Booking',
                description: 'Easy booking process with customizable packages.',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all"
              >
                <h3 className="text-xl text-[#014D4E] mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

