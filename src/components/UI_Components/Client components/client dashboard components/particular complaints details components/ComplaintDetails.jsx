import { FiInfo } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";

// Reusable Detail Field Component
const DetailField = ({ label, children, className = "" }) => (
  <div className="space-y-">
    <p className="text-sm font-semibold text-primary dark:text-text-muted">
      {label}
    </p>
    <div className={className}>{children}</div>
  </div>
);

// Reusable Section Card Component
const SectionCard = ({ icon: Icon, title, children }) => (
  <div
    className="bg-surface-light dark:bg-surface-dark rounded-xl p-3
                  shadow-sm 
                  transition-all duration-300 ease-in-out hover:shadow-md"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary-dark/10">
        <Icon className="w-5 h-5 text-primary dark:text-primary-light" />
      </div>
      <h2 className="text-xl font-semibold text-text_color dark:text-text-light">
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const ComplaintDetails = ({ complaint }) => {
  console.log("complaint", complaint);
  return (
    <SectionCard icon={FiInfo} title="Case Details">
      <div className="space-y-3">
        {/* Complaint Message */}
        <DetailField label="Complaint Message">
          <div
            className="mt-1 text-sm text-text_color font-light bg-default_bg shadow-md dark:text-text-light 
                  text-wrap
                        p-2 rounded-sm 
                        leading-relaxed"
          >
            {complaint.complaintMessage}
          </div>
        </DetailField>
        {complaint.tags.length > 0 && (
          <DetailField label="Categories">
            <div className="flex gap-2 flex-wrap mt-2">
              {complaint.tags?.map((tag) => (
                <Badge
                  key={tag}
                  className="px-3 py-1.5 text-sm font-light
                         bg-light/10 dark:bg-dark/10 
                         text-text_color dark:text-light
                         border border-light/20 dark:border-dark/20
                         hover:bg-light/20 dark:hover:bg-dark/20
                         transition-colors duration-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </DetailField>
        )}
      </div>
    </SectionCard>
  );
};

// Optional: Export reusable components if needed elsewhere
export { DetailField, SectionCard };
export default ComplaintDetails;
