import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Text, Title } from "rizzui";
import toast from "react-hot-toast";
import axios from '../config/axios';

import parse from 'html-react-parser'; 
interface Note {
  title: string;
  content: string;
}

const ShareNote: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the shared ID from the URL
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSharedNote(id).then((res)=>{
        setNote(res);
    })
    .catch((err)=>{
        console.error(err);
        toast.error("Could not load the shared note");
    })
    .finally(()=> {
        setLoading(false);
      })
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto text-center py-10">
        <Text>Loading note...</Text>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="container mx-auto text-center py-10">
        <Text>Note not found or expired.</Text>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-xl mx-auto border rounded-lg shadow-md p-6">
        <Title as="h3" className="mb-4">
          {note.title}
        </Title>
        <Text>{parse(note.content)}</Text>
      </div>
    </div>
  );
};

export default ShareNote;

const getSharedNote = async (id:any) => {
    try {
        const response=  await axios.get(`/note/share/${id}`)
        return response.data
    } catch (error: any) {
        throw error
    }
  };