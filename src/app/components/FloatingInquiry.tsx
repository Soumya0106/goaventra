import { motion } from 'motion/react';
import { useState } from 'react';
import { InquiryModal } from './InquiryModal';

export function FloatingInquiry() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setShowModal(true)}
        className="group fixed bottom-[calc(max(1rem,env(safe-area-inset-bottom))+4.5rem)] right-[max(1rem,env(safe-area-inset-right))] bg-[#FF6B35] text-white rounded-full p-3 sm:p-4 shadow-2xl hover:bg-[#ff5722] transition-colors z-30 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        aria-label="Open Inquiry Form"
      >
        {/* Notepad with pen icon */}
        <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
        <motion.span
          className="absolute right-full mr-3 bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg"
        >
          Inquiry
        </motion.span>
      </motion.button>
      <InquiryModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
