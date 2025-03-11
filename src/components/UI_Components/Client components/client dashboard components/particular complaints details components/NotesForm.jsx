"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/custome hooks/useFetch";
import { getBackendUrl } from "@/lib/getBackendUrl";
import useAccessToken from "@/custome hooks/useAccessToken";

const NotesForm = ({ complaintId, currentNotes, addNewNote }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: { note: "" },
  });

  const { loading, error, fetchData } = useFetch();
  const token = useAccessToken();
  const noteValue = watch("note"); // Watch textarea value

  const onSubmit = async (data) => {
    if (!data.note.trim()) return; // Prevent empty or whitespace-only submissions

    const url = getBackendUrl();
    const res = await fetchData(
      `${url}/api/client/add-note/${complaintId}`,
      "POST",
      data,
      token,
      false
    );

    if (res.success) {
      addNewNote(res.data);
    }

    reset(); // Clear input after submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Textarea
        {...register("note", { required: "Note cannot be empty" })}
        placeholder="Add a new note..."
        className="min-h-[100px]"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevent new line
            handleSubmit(onSubmit)(); // Submit the form
          }
        }}
      />

      <Button
        disabled={loading || !noteValue.trim()} // Disable when empty
        type="submit"
        className="bg-primary-light text-text-primary hover:bg-primary hover:text-text-light"
      >
        {loading ? "Adding.." : "Add New Note"}
      </Button>

      {error && <div className="text-red-500">{error.message}</div>}
    </form>
  );
};

export default NotesForm;
