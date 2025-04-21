import ContactComponent from "@/components/UI_Components/PUBLIC_Components/ContactComponent";
import ComplaintFilter from "@/components/UI_Components/Standard_Components/ComplaintFilter";

export default async function ClientComplaintsPage({ searchParams }) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <ComplaintFilter />
      <ContactComponent />
    </div>
  );
}
