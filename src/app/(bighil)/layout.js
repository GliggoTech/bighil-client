import "../../app/globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Bighil",
  description: "Bighil — A modern platform for efficient complaint management.",
};

export default async function Bighil_Layout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        {children}
   
      </body>
    </html>
  );
}
