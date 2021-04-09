import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { db } from "../firebaseConfig";
import { useCollection } from "react-firebase-hooks/firestore";
import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import Messages from "./Messages";

const Chat = () => {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [roomDetails] = useCollection(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );
  const channelName = roomDetails ? roomDetails?.data()?.name : "";

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>{`# ${channelName}`}</strong>
              </h4>
              <StarBorderOutlined />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc, i) => {
              const { message, user, timestamp, userImage } = doc.data();
              return (
                <Messages
                  message={message}
                  user={user}
                  timestamp={timestamp}
                  userImage={userImage}
                  key={i}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            channelId={roomId}
            channelName={channelName}
            chatRef={chatRef}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;
const Header = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 > .MuiSvgIcon-root {
    margin-left: 20px;
    font-size: 18px;
  }
  > h4 {
    display: flex;
    text-transform: lowercase;
  }
`;
const HeaderRight = styled.div`
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 18px;
  }
  > p {
    display: flex;
    font-size: 16px;
    align-items: center;
  }
`;
const ChatContainer = styled.div`
  flex: 0.5;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const ChatMessages = styled.div``;
