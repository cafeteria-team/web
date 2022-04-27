import React from "react";
import ReactLoading from "react-loading";
import { FlexBox } from "./StyledElements";

const Spinner = ({ loading }) => {
  return loading ? (
    <FlexBox
      position="fixed"
      width="100%"
      height="100%"
      align="center"
      just="center"
      background="#50505038"
      left="0"
      top="0"
    >
      <ReactLoading type="bubbles" color="#ff9030" height={200} width={100} />
    </FlexBox>
  ) : (
    <></>
  );
};

export default Spinner;
