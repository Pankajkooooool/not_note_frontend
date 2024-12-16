import React, { useState } from "react";
import { autoFill, createNote } from "../config/api";
import { ActionIcon, Button, Input, Modal, Title } from "rizzui";
import {  FaPen,  FaPenFancy,  FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import QuillEditor from "../shared/quill-editor/quill-editor";

interface CreateNoteProps {
  onNoteCreated: (newNote: any) => void;
}

const CreateNote: React.FC<CreateNoteProps> = ({ onNoteCreated }) => {
  const [title, setTitle] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");
  const [modalState, setModalState] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newNote = await createNote(title, content);
      onNoteCreated(newNote); // Update parent state
      setTitle("");
      setContent("");
      setModalState(false); // Close modal on success
      toast.success("Note Created")
    } catch (error) {
      console.error("Failed to create note:", error);
      toast.error("An Error Occoured")
    }
  };
  function handleAutoFill(){
    
    if(!title){
      setError("Title is Required");
      return;
    }
    setLoading(true)
    autoFill(title)
    .then((res)=>{
      setContent((prev)=>{ return (prev + res?.content)})
      toast.success("Content Autofilled")
    })
    .catch((err)=>{
      console.error("Failed to create note:", error);
      toast.error("An Error Occoured");
    })
    .finally(()=>{
      setLoading(false);
    })
  }

  return (
    <div className="container">
      {/* Button to open modal */}
      <div className="mx-auto flex justify-between ">
        <Title as="h5" className="hidden md:block">Notes</Title>
      <Button
       onClick={() => setModalState(true)}
        className="w-full md:max-w-fit md:px-8"
      >
        Create Note <FaPen  className="ml-4"/>
      </Button>
      </div>
     
      <Modal size="lg" isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="m-auto px-7 pt-6 pb-8">
          <div className="mb-7 flex items-center justify-between">
            <Title as="h3">Create A Note</Title>
            <ActionIcon
              size="sm"
              variant="text"
              onClick={() => setModalState(false)}
            >
              <FaPlus className="h-auto w-6 rotate-45" strokeWidth={1.8} />
            </ActionIcon>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-end w-full gap-4">
              <Input
              label="Title"
                type="text"
                placeholder="The Dark King"
                value={title}
                className="flex-grow"
                onChange={(e) => {
                  setTitle(e.target.value);
                  setError("");
                }}
                error={error}
              />
          <Button isLoading={isLoading} variant="outline" onClick={handleAutoFill} className="w-fit">
            <FaPenFancy className="mr-5" /> Autofill
            </Button>

              </div>
              {/* <Textarea
              label="Content"
                placeholder="As the Night passes the Dark king grows stronger..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                
              /> */}

               <QuillEditor
               label="Content"
                value={content}
                onChange={setContent}
                className="rounded-md border-none grow bg-gray-0 min-h-50 dark:bg-gray-50 w-auto"
                error={''}
                
              />
              {/* <AutoCompleteEditor/> */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setModalState(false)}
                  className="w-1/2 "
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-1/2"
                >
                  Save
                </Button>
              </div>
            </form>
        </div>
      </Modal>
     
    </div>
  );
};
export default CreateNote;
