import React from "react";
import styled from "styled-components";
import {
  Add,
  Apps,
  BookmarkBorder,
  Create,
  Drafts,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
} from "@material-ui/icons";
import SidebarOption from "./SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebaseConfig";

function Sidebar() {
  const [channels, loading, error] = useCollection(db.collection("rooms"));

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Slack Fam HQ</h2>
          <h3>
            <FiberManualRecord />
            Nijarudeen
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>
      <SidebarOption Icon={InsertComment} title="Threads" />
      <SidebarOption Icon={Inbox} title="Mentions & reactions" />
      <SidebarOption Icon={Drafts} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorder} title="Channel Browser" />
      <SidebarOption Icon={FileCopy} title="People & user groups" />
      <SidebarOption Icon={PeopleAlt} title="Apps" />
      <SidebarOption Icon={Apps} title="File Browser" />
      <SidebarOption Icon={ExpandLess} title="Show less" />
      <hr />
      <SidebarOption Icon={ExpandMore} title="Threads" />
      <hr />
      <SidebarOption Icon={Add} title="Add Channel" addChannelOption />

      {channels?.docs.map((item) => (
        <SidebarOption key={item.id} id={item.id} title={item.data().name} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--slack-color);
  flex: 0.5;
  border-top: 1px solid #49274b;
  max-width: 260px;
  margin-top: 60px;
`;

const SidebarHeader = styled.div`
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #49274b;

  > .MuiSvgIcon-root {
    padding: 10px;
    color: #49274b;
    background-color: white;
    border-radius: 50px;
    font-size: 13px;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 12px;
    font-weight: 600;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
