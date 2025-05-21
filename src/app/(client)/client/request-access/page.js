import ClientRequestForm from "@/components/UI_Components/Client components/auth components/ClientRequestForm";

export default function ClientRequestAccess() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 text-text_color space-y-8">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Welcome to Bighil Platform
        </h1>
        <p className="text-base text-muted-foreground">
          Bighil is a secure, efficient, and modern complaint management system
          tailored for businesses and organizations that prioritize transparency
          and accountability.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-text_color">Why Bighil?</h2>
        <ul className="list-disc list-inside text-sm leading-6">
          <li>
            <strong>Real-time Complaint Tracking:</strong> Get updates as issues
            are filed and resolved, ensuring complete transparency.
          </li>
          <li>
            <strong>Role-Based Access:</strong> Custom dashboards and controls
            for clients, admins, and users to manage responsibilities easily.
          </li>
          <li>
            <strong>Smart Notifications:</strong> Stay informed with timely
            alerts and reminders.
          </li>
          <li>
            <strong>Detailed Reporting:</strong> Gain insights into trends,
            resolution times, and department performance.
          </li>
          <li>
            <strong>Secure & Compliant:</strong> Built with security and privacy
            in mind to protect your organization’s data.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-text_color mb-2">
          Who is this platform for?
        </h2>
        <p className="text-sm text-muted-foreground">
          Bighil is designed for clients and partners who need structured,
          reliable channels for handling employee, customer, or departmental
          complaints. If you don’t have access yet, you can request access using
          the form below.
        </p>
      </section>

      {/* Placeholder for the future contact/request access form */}
      <section className="pt-8 border-t mt-8">
        <p className="text-base font-medium text-text_color">
          Ready to get started?
        </p>
        <p className="text-sm text-muted-foreground">
          Fill out the form below and we’ll get in touch with your access
          details.
        </p>

        {/* Replace this with the actual form later */}
        <div className="mt-4 ">
          <ClientRequestForm />
        </div>
      </section>
    </div>
  );
}
