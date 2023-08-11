import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function handleCloseSnackbar(event, reason) {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  }

  function submitNote(event) {
    // Check if the note is empty (both title and content)
    if (note.title.trim() === "" && note.content.trim() === "") {
      // If the note is empty, do not proceed
      event.preventDefault();
      return;
    }
  
    // Add the note only if it's not empty
    props.onAdd(note);
  
    // Reset the note and show the Snackbar
    setNote({
      title: "",
      content: ""
    });
    setShowSnackbar(true);
  
    event.preventDefault();
  }
  

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <MuiAlert onClose={handleCloseSnackbar} severity="success" color="info">
          Note added!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default CreateArea;
