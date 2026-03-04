import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-[#014D4E] to-[#0F766E] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-white"
      >
        <h1 className="text-9xl mb-4">404</h1>
        <h2 className="text-4xl mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-200 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center bg-[#FF6B35] text-white px-8 py-3 rounded-full hover:bg-[#ff5722] transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-3 rounded-full hover:bg-white hover:text-[#014D4E] transition-all"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
}
