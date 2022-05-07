import React from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
function Note() {
  const [note, setNote] = useState([]);

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    getNote();
    // eslint-disable-next-line
  }, [id]);

  const getNote = async () => {
    const res = await fetch(`http://localhost:5000/notes/${id}`);
    const data = await res.json();
    setNote(data);
  };

  const addNote = async () => {
    await fetch(`http://localhost:5000/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const updateNote = async () => {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    });
  };

  const deleteNote = async () => {
    await fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    navigate("/");
  };

  const submiteNote = async () => {
    if (id !== "new" && !note.body) {
      deleteNote();
    } else if (!note.body) {
      deleteNote();
    } else if (id !== "new") {
      updateNote();
    } else if (id === "new" && note !== null) {
      addNote();
    }
    navigate("/");
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft onClick={submiteNote} />
          </Link>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={submiteNote}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value });
        }}
        value={note?.body}
      ></textarea>
    </div>
  );
}
export default Note;
