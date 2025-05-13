// import ContactComponent from "@/components/UI_Components/PUBLIC_Components/ContactComponent";
import { PortalFooter } from "@/components/UI_Components/PUBLIC_Components/PortalFooter";
import ComplaintForm from "@/components/UI_Components/USER_Components/USER_Dashboard_Components/ComplaintForm";

export default function UserDashboard_page() {
  return (
    <div className="min-h-screen  p-4 sm:p-6 lg:p-8">
      <ComplaintForm />
      {/* <ContactComponent /> */}
      {/* <PortalFooter /> */}
    </div>
  );
}
