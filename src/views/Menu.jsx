import React, { useState } from "react";
import { FlexBox, StyledBody } from "../components/StyledElements";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";

const Menu = () => {
  const [value, setValue] = useState(null);

  return (
    <>
      <FlexBox
        just="space-between"
        height="62px"
        align="center"
        padding="20px 24px"
        // minW="612px"
      >
        <StyledBody color="color rgb(33, 43, 54)" fontSize="18px" fontW="600">
          메뉴등록
        </StyledBody>
      </FlexBox>
      <FlexBox padding="24px" width="372px" direction="column">
        <StyledBody
          color="color rgb(33, 43, 54)"
          fontSize="14px"
          fontW="600"
          width="100%"
          margin="0 0 20px"
        >
          날짜 선택
        </StyledBody>
        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
          <DatePicker
            label="원하시는 날짜를 선택 또는 기입해주세요."
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FlexBox>
      <FlexBox padding="24px">
        <StyledBody
          color="color rgb(33, 43, 54)"
          fontSize="14px"
          fontW="600"
          width="100%"
          margin="0 0 20px"
        >
          메뉴 리스트
        </StyledBody>
      </FlexBox>
    </>
  );
};

export default Menu;
