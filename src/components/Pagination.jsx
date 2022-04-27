import React from "react";
import { FlexBox } from "../components/StyledElements";
import { Button } from "./index";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  // console.log(total, limit, page, numPages);
  return total ? (
    <FlexBox just="center" height="76px">
      <Button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
        color="#ff9030"
        padding="6px"
        width="20px"
        title={<FaAngleLeft />}
        margin="0 2px"
        background="unset"
        display="flex"
        align="center"
        just="center"
      />
      {/* fill() 메서드는 배열의 시작 인덱스부터 끝 인덱스의 이전까지 정적인 값 하나로 채운다. */}
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            ariaCurrent={page === i + 1 ? "page" : null}
            title={i + 1}
            color={page === i + 1 ? "#ff9030" : "rgb(33, 43, 54)"}
            padding="6px"
            width="20px"
            margin="0 2px"
            // hover={true}
            background="unset"
            display="flex"
            align="center"
            just="center"
          />
        ))}
      <Button
        onClick={() => setPage(page + 1)}
        background="unset"
        disabled={page === numPages}
        color="#ff9030"
        padding="6px"
        width="20px"
        title={<FaAngleRight />}
        margin="0 2px"
        display="flex"
        align="center"
        just="center"
      />
    </FlexBox>
  ) : (
    <></>
  );
};
export default Pagination;
