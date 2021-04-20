import React from "react";
import events from "../events";
import { useState, useEffect } from "react";
import io from "socket.io-client";
// import ChatPage from "./ChatsPage/ChatPage";
import LoginPage from "./LoginPage/LoginPage";

export default function Main() {
    const [socket, setSocket] = useState("");
    const [user, setUser] = useState("");
    const [users, setUsers] = useState({});
    const [pchats, setPchats] = useState([]);

    const socketUrl = "http://localhost:80/";

    useEffect(() => {
        let socket = io.connect(socketUrl);
        socket.on("connect", () => console.log("Connected"));
        socket.on(events.LOGOUT, setUsers(false));
        socket.on(events.NEW_USER, setUsers(true));
    }, []);

    return (
        // user ? (
        // <ChatPage
        //   user={user}
        //   users={users}
        //   pchats={pchats}
        //   socket={socket}
        //   setSocket={setSocket}
        // />
        // ) : (
        <LoginPage
            socket={socket}
            user={user}
            setUser={setUser}
            pchats={pchats}
            setPchats={setPchats}
        />
    );
}
