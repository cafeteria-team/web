import React, { memo } from "react";
import { Ul, Li } from "../components/StyledElements";

const MemberListTitle = memo(() => {
  return (
    <Ul
      width="100%"
      background="#FF8400"
      padding="14px"
      boxSizing="border-box"
      just="space-around"
      color="#fff"
    >
      <Li just="center" width="16.6666666667%">
        번호
      </Li>
      <Li just="center" width="16.6666666667%">
        가입일시
      </Li>
      <Li just="center" width="16.6666666667%">
        아이디
      </Li>
      <Li just="center" width="16.6666666667%">
        구분
      </Li>
      <Li just="center" width="16.6666666667%">
        업체명
      </Li>
      <Li just="center" width="16.6666666667%">
        관리
      </Li>
    </Ul>
  );
});
export default MemberListTitle;
