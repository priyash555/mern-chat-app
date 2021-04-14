import React, { useState, useEffect } from "react";
import events from "../../events";
// import { Grid } from "semantic-ui-react";
// import Sidebar from "./Sidebar";
// import MessageHeader from "./MessageHeader";
// import MessagesBody from "./MessagesBody";
// import MessageInput from "./MessageInput";

export default function ChatsPage(props) {
  useEffect(() => {
    let { socket } = this.props;
    socket.emit(events.INIT_CHATS, this.initChats);
    socket.on(events.MESSAGE_SEND, this.addMessage);
    socket.on(events.TYPING, this.addTyping);
    socket.on(events.P_MESSAGE_SEND, this.addPMessage);
    socket.on(events.P_TYPING, this.addPTyping);
    socket.on(events.CREATE_CHANNEL, this.updateChats);
  }, []);

  return <div></div>;
}
