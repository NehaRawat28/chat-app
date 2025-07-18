import React, { Component } from "react";
import "./App.css";
import Sidebar from './containers/Sidebar';
import { MessagesList } from "./containers/MessagesList";
import { AddMessage } from "./containers/AddMessage";
import Login from "./Login";
import setupSocket from "./sockets"; // ✅ Only connect after login

class App extends Component {
  state = {
    username: null,
    socket: null,
  };

  handleLogin = (name) => {
    // ✅ Create WebSocket connection only after login
    const socket = setupSocket(window.store.dispatch, name);


    this.setState({ username: name, socket });
  };

  handleLogout = () => {
    if (this.state.socket) {
      this.state.socket.close(); // ✅ disconnect WebSocket
    }
    this.setState({ username: null, socket: null }); // Back to login
  };

  render() {
    const { username } = this.state;

    if (!username) {
      return <Login onLogin={this.handleLogin} />;
    }

    return (
      <div id="container">
        {/* Sidebar for Users */}
        <Sidebar />

        {/* Main Chat Section */}
        <section id="main">
          {/* ✅ Chat Header with Logout */}
          <header className="chat-header">
            Welcome to Connectly
            <button className="logout-btn" onClick={this.handleLogout}>
               Logout
            </button>
          </header>

          {/* Messages */}
          <MessagesList />

          {/* Input Box */}
          <AddMessage />
        </section>
      </div>
    );
  }
}

export default App;
