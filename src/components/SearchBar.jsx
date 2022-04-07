import React from "react";
import { Input } from "./index";
import { FlexBox, StyledBody } from "../components/StyledElements";

const SearchBar = ({ handleChange, search }) => {
  return (
    <FlexBox align="center">
      <StyledBody margin="0 10px 20px 0">검색</StyledBody>
      <Input
        onChange={handleChange}
        id="search"
        type="text"
        value={search}
        width="140px"
        padding="10px 20px"
      />
    </FlexBox>
  );
};
export default SearchBar;
