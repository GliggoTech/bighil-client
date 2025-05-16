"use client";
import { useState, useEffect } from "react";
import NotesForm from "./NotesForm";
import { FiFileText } from "react-icons/fi";
import dateFormat from "dateformat";
import useAccessToken from "@/custom hooks/useAccessToken";
import useNotificationStore from "@/store/notificationStore";
import { useSocket } from "@/context/socketContext";

const NoteCard = ({ note }) => (
  <div
    className="relative p-5 bg-white/10 dark:bg-surface-dark 
                  rounded-xl shadow-lg 
                  transition-all duration-300 hover:shadow-md mt-10 sm:mt-0"
  >
    {/* Timestamp Badge */}
    <span
      className="absolute sm:-top-3 -top-6 right-4 px-3 py-1 text-xs
                    bg-warning/50 dark:bg-warning/20
                    text-text_color font-semibold dark:text-text-muted
                    rounded-full border border-warning/20"
    >
      {note.createdAt
        ? !isNaN(new Date(note.createdAt).getTime())
          ? dateFormat(
              new Date(note.createdAt),
              "dddd, mmmm dS, yyyy, h:MM:ss TT"
            )
          : "Invalid Date"
        : "Date not available"}
    </span>

    {/* Author and Content */}
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-info"></div>
        <span className="text-sm font-semibold text-text_color dark:text-text-light">
          {note.addedBy}
        </span>
      </div>

      <p
        className="text-text_color dark:text-text-muted leading-relaxed
                    pl-5 border-l-2 border-primary dark:border-border-dark"
      >
        {note.complaintNote}
      </p>
    </div>
  </div>
);

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
      userRole == "ADMIN" ||
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
