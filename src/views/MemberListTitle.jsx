import React, { memo } from "react";
import { Ul, Li } from "../components/StyledElements";

const MemberListTitle = memo(() => {
  return (
    <Ul
      borderB="1px solid #e2e6e7"
      width="100%"
      padding="14px 24px"
      boxSizing="border-box"
      just="space-around"
      color="rgb(33, 43, 54)"
      fontW="600"
      fontSize="14px"
      height="68px"
      align="center"
    >
      <Li just="center" align="center" width="16.6666666667%">
        번호
      </Li>
      <Li just="center" align="center" width="16.6666666667%">
        가입일시
      </Li>
      <Li just="center" align="center" width="16.6666666667%">
        아이디
      </Li>
      <Li just="center" align="center" width="16.6666666667%">
        구분
      </Li>
      <Li just="center" align="center" width="16.6666666667%">
        업체명
      </Li>
      <Li just="center" align="center" width="16.6666666667%">
        관리
      </Li>
    </Ul>
  );
});
export default MemberListTitle;
