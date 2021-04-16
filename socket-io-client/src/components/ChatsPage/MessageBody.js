import React, { useState, useEffect } from "react";
import { Segment, Card } from "semantic-ui-react";
import moment from "moment";


export default function MessageBody(props) {
  
  useEffect(() => {
    scrollDown();
  }, [])
  
  const scrollDown(){
    const { contaniner } = refs;
    contaniner.scrollTop = contaniner.scrollHeight;
  }
  
  return (
    <Segment style={{ height: "calc( 100vh - 56px - 147px)" }}>
      <div
        ref="contaniner"
        style={{
          height: "calc( 100vh - 56px - 147px - 35px)",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: ".1em",
            paddingRight: ".5em",
          }}
        >
          {messages.length > 0 &&
            messages.map((message) => (
              <Card key={message.id} fluid style={{ marginTop: "0px" }}>
                <Card.Content
                  style={{ padding: "3px 10px" }}
                  textAlign={
                    message.sender === user.nickname ? "right" : "left"
                  }
                >
                  <h3>{message.message}</h3>
                  {message.sender[0].toUpperCase() +
                    message.sender.slice(1)}{" "}
                  Send @ {moment(message.timef).fromNow()}
                </Card.Content>
              </Card>
            ))}
          {typingUser &&
            typingUser.map((name) => (
              <div key={name} className="typing-user">
                {`${name[0].toUpperCase() + name.slice(1)} is typing . . .`}
              </div>
            ))}
        </div>
      </div>
    </Segment>
  );
}
