import { Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { HomePage } from "./pages/HomePage";

const PackagesPage = lazy(() =>
  import("./pages/PackagesPage").then((module) => ({
    default: module.PackagesPage,
  })),
);
const PackageDetailsPage = lazy(() =>
  import("./pages/PackageDetailsPage").then((module) => ({
    default: module.PackageDetailsPage,
  })),
);
const CharDhamPage = lazy(() =>
  import("./pages/CharDhamPage").then((module) => ({
    default: module.CharDhamPage,
  })),
);
const AboutPage = lazy(() =>
  import("./pages/AboutPage").then((module) => ({
    default: module.AboutPage,
  })),
);
const GalleryPage = lazy(() =>
  import("./pages/GalleryPage").then((module) => ({
    default: module.GalleryPage,
  })),
);
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then((module) => ({
    default: module.ContactPage,
  })),
);
const CancellationPolicyPage = lazy(() =>
  import("./pages/CancellationPolicyPage").then((module) => ({
    default: module.CancellationPolicyPage,
  })),
);
const TermsPage = lazy(() =>
  import("./pages/TermsPage").then((module) => ({
    default: module.TermsPage,
  })),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then((module) => ({
    default: module.NotFoundPage,
  })),
);

function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />
        {/* Spacer for fixed navbar */}
        <div className="h-16 md:h-20" />
        <main className="flex-1 w-full min-w-0 pb-20 md:pb-0">
          <Suspense
            fallback={
              <div className="min-h-[40vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-4 border-[#014D4E]/20 border-t-[#014D4E] rounded-full animate-spin" />
                  <span className="text-sm text-[#014D4E]/70">Loading...</span>
                </div>
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/packages"
                element={<PackagesPage />}
              />
              <Route
                path="/packages/:slug"
                element={<PackageDetailsPage />}
              />
              <Route
                path="/chardham-yatra"
                element={<CharDhamPage />}
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route
                path="/cancellation-policy"
                element={<CancellationPolicyPage />}
              />
              <Route
                path="/terms-and-conditions"
                element={<TermsPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  );
}
