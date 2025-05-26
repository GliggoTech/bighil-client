import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import { Poppins } from "next/font/google";
import { QueryProvider } from "@/provider/QueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
export const metadata = {
  title: "Bighil",
  description: "Bighil – Modern Complaint & Feedback Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <QueryProvider>
          {children}
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
