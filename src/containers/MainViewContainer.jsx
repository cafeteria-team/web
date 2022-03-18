import React from "react";
import { useParams } from "react-router";
import {
  Overview,
  Manage,
  Member,
  Notice,
  Setting,
  Website,
  Request,
  Event,
  NotFound,
} from "../views";
import { useOutletContext } from "react-router-dom";

const MainViewContainer = () => {
  const params = useParams();
  const menuLists = params.name;

  const contextData = useOutletContext();

  console.log("container 값호출", contextData.userList);
  return (
    <>
      {(() => {
        switch (menuLists) {
          case "overview":
            return <Overview userList={contextData.userList} />;
          case "manage":
            return <Manage />;
          case "member":
            return (
              <Member
                userList={contextData.userList}
                onSearchList={contextData.onSearchList}
                deleteUser={contextData.deleteUser}
              />
            );
          case "request":
            return <Request />;
          case "event":
            return <Event />;
          case "notice":
            return <Notice />;
          case "setting":
            return <Setting />;
          case "website":
            return <Website />;
          default:
            return <NotFound />;
        }
      })()}
    </>
  );
};

export default MainViewContainer;
