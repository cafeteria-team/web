import React from "react";
import { FlexBox } from "../components/StyledElements";
import { Input } from "../components";

const FacilityLists = ({ name }) => {
  return (
    <FlexBox align="center">
      <FlexBox margin="0 10px 0 0" minW="100px">
        목록
      </FlexBox>
      <Input
        type="email"
        id="email"
        margin="0"
        value={name}
        // onChange={(e) => handleChange(e)}
      />
    </FlexBox>
  );
};

export default FacilityLists;
