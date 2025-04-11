import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

// Lazy load heavy components
const Index = lazy(() => import('@/pages/Index'));
const Work = lazy(() => import('@/pages/Work'));
const Project = lazy(() => import('@/pages/Project'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red"></div>
  </div>
);

const AnimatedRoutes = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Index />
              </motion.div>
            </AnimatePresence>
          } />
          <Route path="/work" element={
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Work />
              </motion.div>
            </AnimatePresence>
          } />
          <Route path="/work/:id" element={
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Project />
              </motion.div>
            </AnimatePresence>
          } />
          <Route path="/contact" element={
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Contact />
              </motion.div>
            </AnimatePresence>
          } />
          <Route path="*" element={
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <NotFound />
              </motion.div>
            </AnimatePresence>
          } />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Layout>
              <Suspense fallback={<Loading />}>
                <AnimatedRoutes />
              </Suspense>
            </Layout>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </QueryClientProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
