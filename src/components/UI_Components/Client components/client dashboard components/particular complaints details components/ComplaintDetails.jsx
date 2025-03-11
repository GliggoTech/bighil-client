import { FiInfo } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";

// Reusable Detail Field Component
const DetailField = ({ label, children, className = "" }) => (
  <div className="space-y-1.5">
    <p className="text-sm font-medium text-text-secondary dark:text-text-muted">
      {label}
    </p>
    <div className={className}>{children}</div>
  </div>
);

// Reusable Section Card Component
const SectionCard = ({ icon: Icon, title, children }) => (
  <div
    className="bg-surface-light dark:bg-surface-dark rounded-xl p-6 
                  shadow-sm border border-border-light dark:border-border-dark
                  transition-all duration-300 ease-in-out hover:shadow-md"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 rounded-lg bg-primary-light/10 dark:bg-primary-dark/10">
        <Icon className="w-5 h-5 text-primary dark:text-primary-light" />
      </div>
      <h2 className="text-xl font-semibold text-text-primary dark:text-text-light">
        {title}
      </h2>
    </div>
    {children}
  </div>
);

const ComplaintDetails = ({ complaint }) => {
  return (
    <SectionCard icon={FiInfo} title="Case Details">
      <div className="space-y-8">
        {/* Grid Layout for ID and Complaint Against */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case ID */}
          <DetailField label="Case ID">
            <p
              className="font-mono text-primary dark:text-primary-light 
                        bg-primary-light/5 dark:bg-primary-dark/5 
                        py-1.5 px-3 rounded-lg inline-block"
            >
              {complaint.complaintId}
            </p>
          </DetailField>

          {/* Complaint Against */}
          <DetailField label="Complaint Against">
            <p className="text-text-primary dark:text-text-light">
              {complaint.complaintAgainst}
            </p>
          </DetailField>
        </div>

        {/* Complaint Message */}
        <DetailField label="Complaint Message">
          <div
            className="mt-2 text-text-primary dark:text-text-light 
                        bg-background-secondary dark:bg-surface-medium/10 
                        p-4 rounded-xl border border-border-light dark:border-border-dark
                        leading-relaxed"
          >
            {complaint.complaintMessage}
          </div>
        </DetailField>

        {/* Categories/Tags */}
        <DetailField label="Categories">
          <div className="flex gap-2 flex-wrap mt-2">
            {complaint.tags?.map((tag) => (
              <Badge
                key={tag}
                className="px-3 py-1.5 text-sm font-medium
                         bg-secondary-light/10 dark:bg-secondary-dark/10 
                         text-secondary dark:text-secondary-light
                         border border-secondary-light/20 dark:border-secondary-dark/20
                         hover:bg-secondary-light/20 dark:hover:bg-secondary-dark/20
                         transition-colors duration-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </DetailField>
      </div>
    </SectionCard>
  );
};

// Optional: Export reusable components if needed elsewhere
export { DetailField, SectionCard };
export default ComplaintDetails;
