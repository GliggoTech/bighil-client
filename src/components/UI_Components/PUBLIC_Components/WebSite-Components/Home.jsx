// app/page.tsx
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// // Components
// import Navbar from "@/components/custom/Navbar";
// import Footer from "@/components/custom/Footer";
// import FloatingShape from "@/components/custom/FloatingShape";
// import { STEPS } from "@/lib/dashboard constants/SidebarConstants";

export default function Home() {
  return (
    <div className="min-h-screen bg-primary w-full">
      <h1>Hello</h1>
    </div>
  );
}
