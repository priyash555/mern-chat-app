import React, { useState, useEffect } from "react";
import events from "../../events";
import { Grid } from "semantic-ui-react";
import Sidebar from "./Sidebar";
import MessageHeader from "./MessageHeader";
import MessagesBody from "./MessagesBody";
import MessageInput from "./MessageInput";

export default function ChatsPage(props) {
  const [chats, setChats] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);

  useEffect(() => {
    let { socket } = this.props;
    socket.emit(events.INIT_CHATS, initChats);
    socket.on(events.MESSAGE_SEND, addMessage);
    socket.on(events.TYPING, addTyping);
    socket.on(events.P_MESSAGE_SEND, addPMessage);
    socket.on(events.P_TYPING, addPTyping);
    socket.on(events.CREATE_CHANNEL, updateChats);
  }, []);

  const initChats = (_chats) => updateChats(_chats, true);

  const updateChats = (_chats, init = false) => {
    let newChats = init ? [..._chats] : [...chats, _chats];
    setChats(newChats);
    setActiveChannel(() => {
      init ? _chats[0] : this.state.activeChannel;
    });
  };

  const addTyping = ({ channel, isTyping, sender }) => {
    if (sender === props.user.nickname) return;
    chats.map((chat) => {
      if (chat.name === channel) {
        if (isTyping && !chat.typingUser.includes(sender)) {
          chat.typingUser.push(sender);
        } else if (!isTyping && chat.typingUser.includes(sender)) {
          chat.typingUser = chat.typingUser.filter((u) => u !== sender);
        }
      }
      return null;
    });
    this.setState({ chats });
  };

  const addPTyping = ({ channel, isTyping }) => {
    console.log(channel, isTyping);
    let { pChats } = this.props;
    pChats.map((pChat) => {
      if (pChat.name === channel) {
        pChat.isTyping = isTyping;
      }
      return null;
    });
    this.setState({ pChats });
  };

  const addMessage = ({ channel, message }) => {
    chats.map((chat) => {
      if (chat.name === props.channel) {
        chat.messages.push(message);
        if (props.activeChannel.name !== props.channel) chat.msgCount++;
      }
      return null;
    });
    setChats(chats);
  };

  const addPMessage = ({ channel, message }) => {
    let { pChats } = this.props;

    pChats.map((pChat) => {
      if (pChat.name === channel) {
        pChat.messages.push(message);
        if (activeChannel.name !== channel) pChat.msgCount++;
      }
      return null;
    });
    setChats(pChats);
  };

  const sendMsg = (msg) => {
    let { socket, users } = this.props;
    let { activeChannel } = this.state;
    if (activeChannel.type) {
      let receiver = users[activeChannel.name];
      socket.emit(events.P_MESSAGE_SEND, { receiver, msg });
    } else {
      socket.emit(events.MESSAGE_SEND, { channel: activeChannel.name, msg });
    }
  };

  const sendTyping = (isTyping) => {
    let { socket, users } = this.props;
    if (activeChannel.type) {
      let receiver = users[activeChannel.name];
      socket.emit(events.P_TYPING, { receiver: receiver.socketId, isTyping });
    }
    socket.emit(events.TYPING, { channel: activeChannel.name, isTyping });
  };

  const ActiveChannel = (name) => {
    let newActive = chats.filter((chat) => chat.name === name);
    newActive[0].msgCount = 0;
    setActiveChannel(newActive[0]);
  };

  const setActivePChannel = (name) => {
    let newActive = props.pChats.filter((pChat) => pChat.name === name);
    newActive[0].msgCount = 0;
    setActiveChannel(newActive[0]);
  };

  return (
    <Grid style={{ height: "100vh", margin: "0px" }}>
      <Grid.Column
        computer={4}
        tablet={4}
        mobile={6}
        style={{ background: "#4c3c4c", height: "100%" }}
      >
        <Sidebar
          user={user}
          users={users}
          chats={chats}
          socket={socket}
          activeChannel={activeChannel}
          logout={logout}
          setActivePChannel={setActivePChannel}
          setActiveChannel={ActiveChannel}
          pChats={pChats}
        />
      </Grid.Column>
      <Grid.Column
        computer={12}
        tablet={12}
        mobile={10}
        style={{ background: "#eee", height: "100%" }}
      >
        {activeChannel && (
          <React.Fragment>
            <MessageHeader activeChannel={activeChannel} />
            <MessagesBody
              messages={activeChannel.messages}
              user={user}
              typingUser={activeChannel.typingUser}
            />
            <MessageInput sendMsg={sendMsg} sendTyping={sendTyping} />
          </React.Fragment>
        )}
      </Grid.Column>
    </Grid>
  );
}
