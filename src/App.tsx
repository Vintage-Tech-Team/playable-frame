import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TrafficEstimator from "./pages/TrafficEstimator";
import TimezoneConverter from "./pages/TimezoneConverter";
import UnitConverter from "./pages/UnitConverter";
import RoutePlanner from "./pages/RoutePlanner";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/traffic-estimator" element={<TrafficEstimator />} />
            <Route path="/timezone-converter" element={<TimezoneConverter />} />
            <Route path="/unit-converter" element={<UnitConverter />} />
            <Route path="/route-planner" element={<RoutePlanner />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
