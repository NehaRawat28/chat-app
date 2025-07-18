import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Sidebar = ({ users }) => {
  console.log("👥 Sidebar received users:", users);

  return (
    <aside className="sidebar">
      <h2>👥 Online Users</h2>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))
        ) : (
          <li>No users online</li>
        )}
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// ✅ Map Redux state to props
const mapStateToProps = (state) => {
  console.log("📊 mapStateToProps -> state.users:", state.users);
  return { users: state.users };
};

export default connect(mapStateToProps)(Sidebar);
