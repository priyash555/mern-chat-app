import React from "react";
import events from "../../events";
import { Grid, Header, Icon, Form, Message } from "semantic-ui-react";
import { useState } from "react";

export default function LoginPage(props) {
    const [nickname, setNickname] = useState("");
    const [error, setError] = useState("");

    const setUser = ({ user, isUser }) => {
        if (isUser) {
            setError("This username already exists");
        } else {
            setError("");
            props.setUser(user);
        }
    };

    const handleSubmit = () => {
        nickname
            ? props.socket.emit(events.IS_USER, nickname, setUser)
            : setError("Please input your nickname");
    };
    const handleChange = (e) => {
        setNickname(e.target.value);
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
