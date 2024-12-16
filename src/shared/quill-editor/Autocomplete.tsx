import { useState } from "react";
import ReactQuill from "react-quill"; // Rich-text editor
import Autosuggest from "react-autosuggest"; // Auto-suggestion library
import "react-quill/dist/quill.snow.css"; // Quill styles

const AutoCompleteEditor = () => {
  const [content, setContent] = useState(""); // Note content
  const [suggestions, setSuggestions] = useState<string[]>([]); // Suggestions
  const [currentWord, setCurrentWord] = useState(""); // Current word being typed

  // Example keyword suggestions
  const keywords = ["<h2>JavaScript</h2>", "React", "Node.js", "MongoDB", "Express","HII"];

  // Update editor content
  const handleContentChange = (value: string) => {
    setContent(value);

    // Extract the current word from the cursor position
    const words = value.split(/\s+/);
    const lastWord = words[words.length - 1];
    setCurrentWord(lastWord);

    // Update suggestions
    if (lastWord.length > 0) {
      const matchedSuggestions = keywords.filter((keyword) =>
        keyword.toLowerCase().startsWith(lastWord.toLowerCase())
      );
      setSuggestions(matchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion selection
  const onSuggestionSelected = (event: any, { suggestion }: any) => {
    const words = content.split(/\s+/);
    words[words.length - 1] = suggestion; // Replace the current word with the suggestion
    setContent(words.join(" ") + " "); // Add a space after the suggestion
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        className="mb-4"
      />
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={() => {}} // Not needed since we handle it in React state
        onSuggestionsClearRequested={() => setSuggestions([])}
        getSuggestionValue={(suggestion) => suggestion}
        renderSuggestion={(suggestion) => <div>{suggestion}</div>}
        onSuggestionSelected={onSuggestionSelected}
        inputProps={{
          value: currentWord,
          onChange: () => {handleContentChange}, // No-op since we're handling input in ReactQuill
          placeholder: "Start typing...",
        }}
        theme={{
          input: "hidden", // Hide default input since we're integrating with ReactQuill
          suggestionsContainer: "absolute bg-black border rounded mt-1 z-199",
        }}
      />
    </div>
  );
};

export default AutoCompleteEditor;
