import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
// import ContactComponent from "@/components/UI_Components/PUBLIC_Components/ContactComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bighil",
  description: "Bighil — A modern platform for efficient complaint management.",
};

export default function Bighil_Layout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {/* <ContactComponent /> */}
      </body>
    </html>
  );
}
