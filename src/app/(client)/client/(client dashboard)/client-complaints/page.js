import ContactComponent from "@/components/UI_Components/PUBLIC_Components/ContactComponent";
import ComplaintFilter from "@/components/UI_Components/Standard_Components/ComplaintFilter";

export default async function ClientComplaintsPage({ searchParams }) {
  return (
    <div>
      <ComplaintFilter />
      <ContactComponent />
    </div>
  );
}
