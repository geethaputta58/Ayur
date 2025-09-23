import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Layout/Header";
import { Footer } from "@/components/Layout/Footer";
import { ChatBot } from "@/components/ChatBot/ChatBot";
// import MedicalRecords from "./pages/Patient/MedicalRecords";
// Pages
import MedicalRecords from "./pages/Patient/MedicalRecords";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PatientDashboard from "./pages/Patient/Dashboard";
import PractitionerDashboard from "./pages/Practitioner/Dashboard";
import AdminDashboard from "./pages/Admin/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
import React from "react";
import Appointments from "./pages/Patient/Appointments";

// REMOVE THIS BLOCK:
// function App() {
//   return (
//     <div>
//       <Appointments />
//     </div>
//   );
// }

// KEEP ONLY THIS:
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-background">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<PatientDashboard />} />
              <Route path="/appointments" element={<Appointments />} />
              {/* <Route path="/medical-records" element={<MedicalRecords />} />
               */}
               <Route path="/medical-records" element={<MedicalRecords />} />
              <Route path="/practitioner/dashboard" element={<PractitionerDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ChatBot />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;