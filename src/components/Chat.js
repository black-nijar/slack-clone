import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";

const Chat = () => {
  const roomId = useSelector(selectRoomId);
  return (
    <ChatContainer>
      <Header>
        <HeaderLeft>
          <h4>
            <strong>#ROOM</strong>
          </h4>
          <StarBorderOutlined />
        </HeaderLeft>
        <HeaderRight>
          <p>
            <InfoOutlined /> Details
          </p>
        </HeaderRight>
      </Header>
      <ChatMessages></ChatMessages>
      <ChatInput channelId={roomId} />
    </ChatContainer>
  );
};

export default Chat;

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
