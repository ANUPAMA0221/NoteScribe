import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function App() {
  const [notes, setNotes] = useState([]);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deletedNote, setDeletedNote] = useState(null);

  function addNote(newNote) {
    if (newNote.title.trim() !== "" || newNote.content.trim() !== "") {
      setNotes((prevNotes) => {
        return [...prevNotes, newNote];
      });
    }
  }

  function deleteNote(id) {
    const deletedNote = notes[id]; // Store the deleted note temporarily
    setNotes((prevNotes) => prevNotes.filter((noteItem, index) => index !== id));

    // Store the deleted note and show the deletion alert
    setDeletedNote(deletedNote);
    setShowDeleteAlert(true);

    // Hide the deletion alert after a short delay
    setTimeout(() => {
      setShowDeleteAlert(false);
    }, 2000);
  }

  function handleDeleteAlertClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setDeletedNote(null);
    setShowDeleteAlert(false);
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
      <Snackbar
        open={showDeleteAlert}
        autoHideDuration={2000}
        onClose={handleDeleteAlertClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MuiAlert
          onClose={handleDeleteAlertClose}
          severity="success"
          color="info"
        >
          {deletedNote ? "Note deleted!" : ""}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default App;
