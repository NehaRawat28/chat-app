import React from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import { useDispatch } from "react-redux";
import { deleteMessage, editMessage } from "../actions";

const MessagesList = ({ messages }) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => dispatch(deleteMessage(id));
  const handleEdit = (id, newMessage) => dispatch(editMessage(id, newMessage));

  return (
    <section id="messages-list">
      <ul>
        {messages.map((msg) => (
          <Message
            key={msg.id}
            {...msg}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    </section>
  );
};

MessagesList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      message: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired
};

export default MessagesList;
