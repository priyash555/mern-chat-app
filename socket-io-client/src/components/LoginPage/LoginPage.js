import React from "react";
import event from "../../events";
import { Grid, Header, Icon, Form, Message } from "semantic-ui-react";

export default function LoginPage(props) {
  const [uname, setUname] = useState("");
  const [error, setError] = useState("");

  const setUser = (user) => {
    let { socket } = this.state;
    props.setUser(user);
    socket.emit(events.NEW_USER, user);
  };

  const handleSubmit = () => {
    isvalid(state)
      ? socket.emit(event.IS_USER, nickname, setUser)
      : setError("Please input your nickname");
  };
  const handleChange = (e) => {
    setUname(e.target.value);
  };

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
            name="username"
            type="text"
            placeholder="Your username !"
            onChange={(e) => handleChange(e)}
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
          {error && <Message negative>{error}</Message>}
        </Form>
      </Grid.Column>
    </Grid>
  );
}
