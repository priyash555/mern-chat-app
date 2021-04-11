import React from "react";
import event from "../../events";
import { Grid, Header, Icon, Form, Message } from "semantic-ui-react";

export default function LoginPage(props) {
  const handleSubmit = () => {};
  const handleChange = () => {};

  return (
    <Grid
      style={{ height: "100vh", padding: "0px", margin: "0px" }}
      textAlign="center"
      verticalAlign="middle"
    >
      <Grid.Column computer={6} tablet={8} mobile={14}>
        <Header as="h2" icon textAlign="center" color="blue">
          <Icon name="discussions" />
          Simple Chats.
        </Header>
        <Form size="small" onSubmit={handleSubmit}>
          <Form.Input
            name="nickname"
            type="text"
            placeholder="Your nickname !"
            onChange={handleChange}
            autoFocus
            icon={
              <Icon
                name="add user"
                link
                circular
                inverted
                onClick={handleSubmit}
              />
            }
          />
          {/* {this.state.error && <Message negative>{this.state.error}</Message>} */}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
