import React, { memo } from "react";
import { FlexBox, StyledBody } from "../components/StyledElements";
import { MyEditor } from "../components";

const TextEditor = ({
  isLoading,
  sendNotice,
  noticeData,
  showToggle,
  toggle,
  changeToggled,
  handleChange,
  title,
  noticeSub,
}) => {
  return (
    <>
      <FlexBox
        just="space-between"
        height="62px"
        align="center"
        padding="20px 24px"
        minW="612px"
      >
        <StyledBody color="color rgb(33, 43, 54)" fontSize="18px" fontW="600">
          공지사항 관리
        </StyledBody>
      </FlexBox>
      {isLoading ? (
        <FlexBox padding="24px" just="center" width="100%">
          공지사항을 불러오는중입니다.
        </FlexBox>
      ) : (
        <MyEditor
          sendNotice={sendNotice}
          noticeData={noticeData}
          showToggle={showToggle}
          toggle={toggle}
          changeToggled={changeToggled}
          handleChange={handleChange}
          title={title}
          noticeSub={noticeSub}
        />
      )}
    </>
  );
};

export default memo(TextEditor);
