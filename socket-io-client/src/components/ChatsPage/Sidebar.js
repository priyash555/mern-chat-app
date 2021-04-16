import React, { useState, useEffect } from "react";
import events from "../../events";
import {
  Menu,
  Header,
  Icon,
  Button,
  Label,
  Modal,
  Form,
  Input,
  Message,
} from "semantic-ui-react";
import Loader from "react-dots-loader";
import "react-dots-loader/index.css";
import { isChannel } from "../../../../server-side/server/methods";

export default function Sidebar(props) {
  const [modal, setModal] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [error, setError] = useState(null);

  const displayChannels = (chats) =>
    chats.map((chat) => (
      <Menu.Item
        key={chat.name}
        onClick={() => props.setActiveChannel(chat.name)}
        active={props.activeChannel.name === chat.name}
      >
        # {chat.name}
        {chat.msgCount > 0 && (
          <Label size="mini" color="red">
            {" "}
            {chat.msgCount}{" "}
          </Label>
        )}
      </Menu.Item>
    ));

  const displayUsers = (users) => {
    let { user, setActivePChannel, pChats, activeChannel } = props;
    delete users[user.nickname];
    users = Object.assign({ "You...": user }, users);
    return Object.keys(users).map((user) => {
      let pChat = pChats.filter((pchat) => pchat.name === user);
      let msgCount = null;
      if (pChat[0] && pChat[0].name !== activeChannel.name) {
        if (pChat[0].msgCount > 0) {
          msgCount = pChat[0].msgCount;
        }
      }
      return (
        <Menu.Item
          key={user}
          onClick={user === "You..." ? null : () => setActivePChannel(user)}
          active={props.activeChannel.name === user}
        >
          # {user[0].toUpperCase() + user.slice(1)}
          <Loader
            style={{ marginLeft: "10px" }}
            size={4}
            color="grey"
            distance={3}
            visible={pChat[0] ? pChat[0].isTyping : false}
          />
          {msgCount && (
            <Label size="mini" color="red">
              {" "}
              {msgCount}{" "}
            </Label>
          )}
        </Menu.Item>
      );
    });
  };

  const openModal = () => setModal(true);

  const closeModal = () => {
    setModal(false);
    setChannelName("");
    setChannelDescription("");
    setError("");
  };

  const handleChange = (e) => {};

  const isFormValid = () => {
    if (channelDescription && channelName) {
      setError(null);
      return true;
    } else {
      setError("Name and Description required");
      return false;
    }
  };

  const handleSubmit = () => {
    setError(null);
    if (isFormValid()) {
      let { socket } = props;
      socket.emit(
        events.CHECK_CHANNEL,
        { channelName, channelDescription },
        checkChannel
      );
    }
  };

  const checkChannel = (isChannel) => {
    isChannel
      ? setError(`Channel "${channelName}" name alredy take`)
      : closeModal();
  };

  return (
    <>
      <Menu
        style={{ background: "#4c3c4c", paddingTop: "2em" }}
        vertical
        inverted
        fluid
        stackable
        size="large"
      >
        <Header inverted as="h3">
          <Icon name="chat" />
          <Header.Content> Simple Chat </Header.Content>
          <Header.Subheader>
            Login as : {user.nickname[0].toUpperCase() + user.nickname.slice(1)}
          </Header.Subheader>
        </Header>
        <Menu.Menu>
          <Menu.Item style={{ paddingLeft: "0" }}>
            <span style={{ fontSize: "1.2em" }}>
              <Icon name="bullhorn" /> Channel lists
            </span>
            <Icon name="add" onClick={openModal} />
          </Menu.Item>
          {chats[0] && displayChannels(chats)}
        </Menu.Menu>
        <br />
        <Menu.Menu>
          <Menu.Item style={{ paddingLeft: "0" }}>
            <span style={{ fontSize: "1.2em" }}>
              <Icon name="address book" /> Online Users
            </span>
          </Menu.Item>
          {users && chats[0] && displayUsers(users)}
        </Menu.Menu>
        <br />
        <Menu.Menu>
          <Menu.Item style={{ paddingLeft: "0" }}>
            <Button icon inverted labelPosition="right" onClick={logout}>
              <Icon name="sign-out alternate" />
              LogOut
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Modal open={modal} size="small">
        <Header icon="bullhorn" content="Add new Channel" />
        <Modal.Content>
          <Form>
            <Form.Field>
              <Input
                placeholder="Channel Name"
                name="channelName"
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="channelDescription"
                placeholder="Channel Description"
                onChange={handleChange}
              />
            </Form.Field>
          </Form>
          {error && (
            <Message error>
              <h4>Error</h4>
              {error}
            </Message>
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
          <Button color="green" inverted onClick={handleSubmit}>
            <Icon name="checkmark" /> Add
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
