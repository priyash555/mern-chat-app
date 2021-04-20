import React, { useState, useEffect } from "react";
import { Segment, Form, Icon } from "semantic-ui-react";

export default function MessageInput(props) {
  const [msg, setMsg] = useState("");
  const handleChange = (e) => setMsg(e.target.value);
  const handleSubmit = () => {
    props.sendMsg(msg);
    setMsg("");
  };
  const handleOnFocused = () => props.sendTyping(true);
  const handleOnBlur = () => props.sendTyping(false);
  return (
    <Segment>
      <Form onSubmit={msg.length > 0 ? this.handleSubmit : null}>
        <Form.Input
          fluid
          name="msg"
          value={msg}
          placeholder="Write your message"
          onChange={handleChange}
          onFocus={handleOnFocused}
          onBlur={handleOnBlur}
          icon={
            <Icon
              name="send"
              link
              circular
              inverted
              onClick={handleSubmit}
              disabled={msg.length < 1}
            />
          }
        />
      </Form>
    </Segment>
  );
}
