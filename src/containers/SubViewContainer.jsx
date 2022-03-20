import React from "react";
import { useParams } from "react-router";
import { useOutletContext } from "react-router-dom";
import { MemberEdit, NotFound } from "../views";

const SubViewContainer = (props) => {
  const params = useParams();
  const menuLists = params.name;

  const contextData = useOutletContext();
  console.log(contextData);

  return (
    <>
      {(() => {
        switch (menuLists) {
          case "member":
            return (
              <MemberEdit
                selectedUser={contextData.selectedUser}
                id={contextData.id}
                editUser={contextData.editUser}
              />
            );
          default:
            return <NotFound />;
        }
      })()}
      ;
    </>
  );
};

export default SubViewContainer;
