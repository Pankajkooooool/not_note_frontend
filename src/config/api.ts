import axios from "axios";

export const API = axios.create({
  baseURL:  'https://not-note-backend.onrender.com/',
  // baseURL: import.meta.env.VITE_BASE_URL ,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fetch all notes
export const fetchNotes = async () => {
  try {
    const response = await API.get("/note");
    return response.data; // Array of notes
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

// Create a new note
export const createNote = async (title: string, content: string) => {
  try {
    const response = await API.post("/note/", { title, content });
    return response.data; // Newly created note
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

// Delete a note
export const deleteNote = async (id: string) => {
  try {
    await API.delete(`/note/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};

export const shareNote = async (noteId: string) => {
  try {
  const response = await API.post(`/note/${noteId}/share`)
  return response.data
  }
  catch(err){
    throw err;
  }
};

export const autoFill = async (title: string) => {
  try {
    let data = {
      "title":title
    }
    const response = await API.post("/note/content", data);
    return response.data; 
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};




