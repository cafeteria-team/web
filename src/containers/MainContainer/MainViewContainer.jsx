import React from "react";
import { useParams } from "react-router";
import { useOutletContext } from "react-router-dom";
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
  Password,
} from "../../views";

const MainViewContainer = () => {
  const params = useParams();
  const menuLists = params.name;

  const contextData = useOutletContext();

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
                getEditUser={contextData.getEditUser}
                editUser={contextData.editUser}
                selectedUser={contextData.selectedUser}
                approveUser={contextData.approveUser}
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
          case "password":
            return <Password />;
          default:
            return <NotFound />;
        }
      })()}
    </>
  );
};

export default MainViewContainer;
