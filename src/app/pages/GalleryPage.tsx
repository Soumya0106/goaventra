import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Instagram, ExternalLink, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const galleryImages = [
  {
    url: 'https://images.unsplash.com/photo-1653675838191-2f17f0cdf278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyZGhhbSUyMHRlbXBsZSUyMHNwaXJpdHVhbCUyMGluZGlhfGVufDF8fHx8MTc3MDU3NDAwNHww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Chardham - Sacred Journey',
    location: 'Uttarakhand',
  },
  {
    url: 'https://images.unsplash.com/photo-1713063968789-adf139c4a1eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5hbGklMjB2YWxsZXklMjBuYXR1cmUlMjBtb3VudGFpbnxlbnwxfHx8fDE3NzA1NzQwMDV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Manali Valley Adventure',
    location: 'Himachal Pradesh',
  },
  {
    url: 'https://images.unsplash.com/photo-1707292098561-a251b9aa4014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtJTIwaGFsb25nJTIwYmF5JTIwdHJhdmVsfGVufDF8fHx8MTc3MDU3NDAwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Vietnam Halong Bay',
    location: 'Vietnam',
  },
  {
    url: 'https://images.unsplash.com/photo-1584395631432-7542a139c76f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaW1hbGF5YW4lMjBtb3VudGFpbnMlMjBhZHZlbnR1cmUlMjB0cmF2ZWx8ZW58MXx8fHwxNzcwNTc0MDA0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Himalayan Peaks',
    location: 'Himalayas',
  },
  {
    url: 'https://images.unsplash.com/photo-1612092208229-55bc45975f06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNzb29yaWUlMjBoaWxscyUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NzA1NzQwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Mussoorie Hills',
    location: 'Uttarakhand',
  },
  {
    url: 'https://images.unsplash.com/photo-1768410318398-fcd1dc09dfc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMHRyYXZlbCUyMGFkdmVudHVyZSUyMHRvdXJ8ZW58MXx8fHwxNzcwNTc0MDA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Group Adventures',
    location: 'India',
  },
  {
    url: 'https://images.unsplash.com/photo-1748951447152-5a9992576e6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMHRyYXZlbCUyMHRhaiUyMG1haGFsfGVufDF8fHx8MTc3MDU3NDAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Taj Mahal Wonders',
    location: 'Agra',
  },
  {
    url: 'https://images.unsplash.com/photo-1743586418842-742b3e80c9eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0ZWFtJTIwdHJhdmVsfGVufDF8fHx8MTc3MDU3NDAwN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    caption: 'Corporate Team Building',
    location: 'Various Locations',
  },
];

export function GalleryPage() {
  useEffect(() => {
    document.title = "Gallery | GoAventra";
  }, []);

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
            <h1 className="text-5xl md:text-6xl mb-4">Gallery</h1>
            <p className="text-xl text-gray-200">
              Explore the beauty and adventure of our travel destinations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <Instagram className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl text-[#014D4E] mb-2">Follow Us on Instagram</h2>
            <p className="text-gray-600 mb-6">
              Stay updated with our latest trips and travel inspiration
            </p>
            <a
              href="https://instagram.com/goaventra"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              <Instagram className="w-5 h-5 mr-2" />
              @goaventra
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl text-[#014D4E] mb-4">Recent Adventures</h2>
            <p className="text-xl text-gray-600">Memories captured on our journeys</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
              >
                <ImageWithFallback
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg mb-1">{image.caption}</h3>
                    <p className="text-sm text-gray-300">{image.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Embed Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl text-[#014D4E] mb-8">Latest Instagram Posts</h2>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-12 border-2 border-dashed border-purple-300">
              <Instagram className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <p className="text-gray-700 text-lg mb-4">
                View our latest posts and stories on Instagram
              </p>
              <a
                href="https://instagram.com/goaventra"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Visit @goaventra
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl text-[#014D4E] mb-4">Travel Videos</h2>
            <p className="text-xl text-gray-600">Experience our journeys through videos</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: item * 0.1 }}
                className="aspect-video bg-gradient-to-br from-[#014D4E] to-[#0F766E] rounded-xl flex items-center justify-center text-white"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1" />
                  </div>
                  <p className="text-lg">Travel Video {item}</p>
                  <p className="text-sm text-gray-300 mt-2">View on Instagram</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#014D4E] to-[#0F766E] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl mb-4">Want to Be Featured?</h2>
            <p className="text-xl mb-8 text-gray-200">
              Join our next trip and share your adventure with the world!
            </p>
            <a
              href="https://wa.me/917060893636"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#FF6B35] text-white px-8 py-4 rounded-full text-lg hover:bg-[#ff5722] transition-colors"
            >
              Book Your Adventure
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
