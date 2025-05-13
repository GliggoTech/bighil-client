import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
export const metadata = {
  title: "Bighil — User Dashboard",
  description: "Manage and respond to complaints from your clients on Bighil.",
};

export default function User_Layout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        {children}

        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
