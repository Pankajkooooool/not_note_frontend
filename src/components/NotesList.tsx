import React, { useState } from "react";
import { deleteNote, shareNote } from "../config/api";
import { ActionIcon, Button, Modal, Popover, Text, Title } from "rizzui";
import { FaPlus, FaTrash, FaShareAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import parse from 'html-react-parser'; 
interface Note {
  _id: string;
  title: string;
  content: string;
}

interface NotesAppProps {
  notes: Note[]; // Preloaded notes passed as props
  onDelete: (_id: string) => void; // Callback to delete a note
}

const NotesList: React.FC<NotesAppProps> = ({ notes, onDelete }) => {
  const [detailModalState, setDetailModalState] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const openDetailModal = (note: Note) => {
    setSelectedNote(note);
    setDetailModalState(true);
  };

  const handleDeleteNote = async (_id: string) => {
    try {
      await deleteNote(_id);
      onDelete(_id); // Notify parent to update the notes list
      toast.success("Note Deleted Successfully");
    } catch (error) {
      console.error("Failed to delete note:", error);
      toast.error("Failed to delete the note.");
    }
  };

  const handleShareNote = async (_id: string) => {
    
     shareNote(_id).then((res)=>{
      const shareUrl = `${window.location.origin}/share/${res.sharedId}`; // Generate the shareable link
      setShareLink(shareUrl); // Save the link for modal display or toast
      console.log(shareLink);
      navigator.clipboard.writeText(shareUrl);
      toast.success(`Shareable lin Copied to Clipboard`);
     }).catch((error)=> {
      console.error("Failed to share note:", error);
      toast.error("Failed to generate shareable link.");
    })
      
  };

  return (
    <div className="container mx-auto py-4">
      {/* Notes List */}
      <div className="grid gap-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="flex items-center justify-between p-4 border rounded shadow-sm"
          >
            <Text
              className="cursor-pointer"
              onClick={() => openDetailModal(note)}
            >
              {note.title.slice(0, 35)} {note.title.length > 35 && "..."}
            </Text>

            <div className="flex items-center gap-2">
              {/* Share Button */}
              <ActionIcon
                size="sm"
                variant="outline"
                onClick={() => handleShareNote(note._id)}
              >
                <FaShareAlt />
              </ActionIcon>

              {/* Delete Button */}
              <Popover>
                <Popover.Trigger>
                  <ActionIcon size="sm" variant="outline">
                    <FaTrash />
                  </ActionIcon>
                </Popover.Trigger>
                <Popover.Content>
                  {({ setOpen }) => (
                    <div className="w-56">
                      <Title as="h6">Delete the Note</Title>
                      <Text>Are you sure you want to delete this Note?</Text>
                      <div className="flex justify-end gap-3 mb-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setOpen(false)}
                        >
                          No
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            handleDeleteNote(note._id);
                            setOpen(false);
                          }}
                        >
                          Yes
                        </Button>
                      </div>
                    </div>
                  )}
                </Popover.Content>
              </Popover>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Note Details */}
      {selectedNote && (
        <Modal
        size="lg"
          isOpen={detailModalState}
          onClose={() => setDetailModalState(false)}
          className=""
        >
          <div className="m-auto px-7 pt-6 pb-8 min-h-80">
            <div className="mb-7 flex items-center justify-between">
              <Title as="h3">{selectedNote.title}</Title>
              <ActionIcon
                size="sm"
                variant="text"
                onClick={() => setDetailModalState(false)}
              >
                <FaPlus className="h-auto w-6 rotate-45" strokeWidth={1.8} />
              </ActionIcon>
            </div>
            <Text>{parse(selectedNote.content)}</Text>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NotesList;
