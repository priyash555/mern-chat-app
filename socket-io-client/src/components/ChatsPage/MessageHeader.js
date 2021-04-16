import React from "react";

export default function MessageHeader(props) {
  return (
    <Segment>
      <Header as="h2">
        <Icon name="bullhorn" />
        <Header.Content>
          {props.activeChannel.name[0].toUpperCase() +
            props.activeChannel.name.slice(1)}
        </Header.Content>
        <Header.Subheader>
          Description :{" "}
          <span>
            {props.activeChannel.description[0].toUpperCase() +
              props.activeChannel.description.slice(1)}
          </span>
        </Header.Subheader>
      </Header>
    </Segment>
  );
}
