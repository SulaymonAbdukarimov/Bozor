import React from "react";
import { Link } from "react-router-dom";

const getTitle = (note) => {
  let title = note.body.split("\n")[0];
  if (title.length > 40) {
    return title.slice(0, 40) + "...";
  }
  return title;
};

const getData = (data) => {
  return new Date(data.updated).toLocaleDateString();
};

const getContent = (note) => {
  let title = getTitle(note);
  let content = note.body.replaceAll("\n", "");
  content = content.replaceAll(title, "");

  if (content.length > 40) {
    return content.slice(0, 45) + "...";
  } else {
    return content;
  }
};

function ListItem(props) {
  return (
    <Link to={`/note/${props.note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(props.note)}</h3>
        <p>
          <span>{getData(props.note)}</span>
          {getContent(props.note)}
        </p>
      </div>
    </Link>
  );
}

export default ListItem;
