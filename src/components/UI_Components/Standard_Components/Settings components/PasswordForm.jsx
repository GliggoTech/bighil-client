import { Form } from "@/components/ui/form";
import PasswordFields from "./PasswordFields";
import SubmitButton from "./SubmitButton";

const PasswordForm = ({ form, onSubmit, loading, error }) => {
  const handleSubmit = async (values) => {
    const res = await onSubmit(values);
    if (res) {
      form.reset();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <PasswordFields form={form} />
        <SubmitButton loading={loading} />
        {/* {error && <ErrorMessage message={error} />} */}
      </form>
    </Form>
  );
};

export default PasswordForm;
