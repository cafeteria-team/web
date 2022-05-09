import React from "react";
import { Input } from "./index";
import { FlexBox } from "../components/StyledElements";

import { FaSearch } from "react-icons/fa";

const SearchBar = ({ handleChange, search, margin }) => {
  return (
    <FlexBox align="center" position="relative">
      <FaSearch
        style={{
          position: "absolute",
          left: "14px",
          top: "15px",
          color: "#ccc",
        }}
      />
      <Input
        onChange={handleChange}
        id="search"
        type="text"
        value={search}
        width="200px"
        padding="14px 20px 14px 36px"
        placeholder="Search User..."
        margin={margin}
      />
    </FlexBox>
  );
};
export default SearchBar;
