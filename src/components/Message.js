import React, { useState } from "react";
import PropTypes from "prop-types";

const Message = ({
  id,
  message,
  author,
  timestamp,
  status,
  edited,
  deleted,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newMessage, setNewMessage] = useState(message);

  const saveEdit = () => {
    onEdit(id, newMessage);
    setIsEditing(false);
  };

  // ✅ If message is deleted, show placeholder
  if (deleted) {
    return (
      <div className={`message deleted`}>
        <div className="bubble deleted-text">
          🗑 <i>This message was deleted</i>
        </div>
        <div className="meta">
          <small>{timestamp}</small>
        </div>
      </div>
    );
  }

  return (
    <div className={`message ${author === "Me" ? "me" : "other"}`}>
      <div className="author">{author}</div>
      <div className="bubble">
        {isEditing ? (
          <>
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={saveEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            {message} {edited && <span className="edited">(edited)</span>}
          </>
        )}
      </div>
      <div className="meta">
        <small>{timestamp}</small> · <small>{status}</small>
      </div>

      {/* Only allow editing/deleting your own messages */}
      {author === "Me" && !isEditing && (
        <div className="actions">
          <button onClick={() => setIsEditing(true)}>✏ Edit</button>
          <button onClick={() => onDelete(id)}>🗑 Delete</button>
        </div>
      )}
    </div>
  );
};

Message.propTypes = {
  id: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.string,
  status: PropTypes.string,
  edited: PropTypes.bool,
  deleted: PropTypes.bool, // ✅ added deleted flag
  onDelete: PropTypes.func,
  onEdit: PropTypes.func
};

export default Message;
