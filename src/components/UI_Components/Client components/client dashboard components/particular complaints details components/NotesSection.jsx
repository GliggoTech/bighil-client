"use client";
import { useState, useEffect } from "react";
import NotesForm from "./NotesForm";
import { FiFileText } from "react-icons/fi";
import dateFormat from "dateformat";
import useAccessToken from "@/custom hooks/useAccessToken";
import useNotificationStore from "@/store/notificationStore";
import { useSocket } from "@/context/socketContext";
import { FiDownload, FiFile, FiImage } from "react-icons/fi";
import NoteCard from "./NoteCard";

const NotesSection = ({ notes, complaintId }) => {
  const [currentNotes, setCurrentNotes] = useState(notes);
  const { token } = useAccessToken();
  const { socket } = useSocket();
  const { userRole, userId } = useNotificationStore();

  useEffect(() => {
    if (!socket || !token) return;

    const handleNewNote = (newNote) => {
      setCurrentNotes((prevNotes) => {
        if (prevNotes.some((note) => note._id === newNote._id)) {
          return prevNotes;
        }
        return [newNote, ...prevNotes];
      });
    };

    if (
      userRole == "SUB ADMIN" ||
      // userRole == "ADMIN" ||
      userRole == "SUPER ADMIN"
    ) {
      socket.emit("joinComplaintRoom", `complaint_${complaintId}`);
      socket.on("fetch_admin_notes", handleNewNote);
    }

    return () => {
      if (socket) {
        socket.off("fetch_admin_notes", handleNewNote);
      }
    };
  }, [socket, token, complaintId, userRole, userId]);

  const addNewNote = (newNote) => {
    if (!newNote || !newNote._id) return;
    setCurrentNotes((prevNotes) => {
      if (prevNotes.some((note) => note._id === newNote._id)) {
        return prevNotes;
      }
      return [newNote, ...prevNotes];
    });
  };

  return (
    <div
      className="bg-white dark:bg-surface-dark rounded-xl p-3 
                    shadow-sm 
                    transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary-dark/10">
          <FiFileText className="w-5 h-5 text-primary dark:text-primary-light" />
        </div>
        <h2 className="text-xl font-semibold text-text_color dark:text-text-light">
          Notes
        </h2>
      </div>

      {/* Form */}
      <div
        className="bg-white dark:bg-surface-dark rounded-lg 
                      "
      >
        <NotesForm
          complaintId={complaintId}
          currentNotes={currentNotes}
          addNewNote={addNewNote}
        />
      </div>

      {/* Notes List */}
      <div className="mt-3 space-y-10 sm:space-y-5">
        {currentNotes?.map((note, index) => (
          <NoteCard key={`${note._id}+${index}`} note={note} />
        ))}
      </div>

      {/* Empty State */}
      {(!currentNotes || currentNotes.length === 0) && (
        <div className="text-center py-8 text-text_color dark:text-text-muted">
          No notes added yet.
        </div>
      )}
    </div>
  );
};

export default NotesSection;
