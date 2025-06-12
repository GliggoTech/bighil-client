import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import TabCloseProvider from "@/context/TabCloseProvider";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
export const metadata = {
  title: "Bighil — Client Dashboard",
  description: "Manage and respond to complaints from your clients on Bighil.",
};

export default function Client_Layout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <TabCloseProvider>
          {children}

          <Toaster position="top-right" richColors />
        </TabCloseProvider>
      </body>
    </html>
  );
}
