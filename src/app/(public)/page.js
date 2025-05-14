import Main_ComplaintSection from "@/components/UI_Components/PUBLIC_Components/WebSite-Components/Main_ComplaintSection";
import Main_ContactSection from "@/components/UI_Components/PUBLIC_Components/WebSite-Components/Main_ContactSection";
import Main_FeaturesSection from "@/components/UI_Components/PUBLIC_Components/WebSite-Components/Main_FeaturesSection";
import Main_FooterSection from "@/components/UI_Components/PUBLIC_Components/WebSite-Components/Main_FooterSection";
import Main_Hero_Section from "@/components/UI_Components/PUBLIC_Components/WebSite-Components/Main_Hero_Section";
import Main_Navbar from "@/components/UI_Components/PUBLIC_Components/WebSite-Components/Main_Navbar";
import Main_PortalSection from "@/components/UI_Components/PUBLIC_Components/WebSite-Components/Main_PortalSection";

export default function Public_Home_Page() {
  return (
    <div className="text-text-color bg-default_bg relative">
      <Main_Navbar />
      <Main_Hero_Section />
      <Main_FeaturesSection />
      <Main_ComplaintSection />
      <Main_PortalSection />
      <Main_ContactSection />
      <Main_FooterSection />
    </div>
  );
}
