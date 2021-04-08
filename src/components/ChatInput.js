import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { db } from "../firebaseConfig";
import firebase from "firebase";

const ChatInput = ({ channelName, channelId }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }
    db.collection("rooms").doc().collection("messages").add({
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessage("");
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={`Message #Room`}
        />
        <Button hidden onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
