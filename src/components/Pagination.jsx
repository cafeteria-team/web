import React from "react";
import { FlexBox } from "../components/StyledElements";
import { Button } from "./index";

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  // console.log(total, limit, page, numPages);
  return total ? (
    <FlexBox just="center" margin="32px -10px 0 -10px">
      <Button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
        color="white"
        padding="6px"
        width="20px"
        title="&lt;"
        margin="0 2px"
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
            color="white"
            padding="6px"
            width="20px"
            margin="0 2px"
            hover={true}
            background={page === i + 1 ? "#FF8400" : "#808080"}
          />
        ))}
      <Button
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        color="white"
        padding="6px"
        width="20px"
        title=" &gt;"
        margin="0 2px"
      />
    </FlexBox>
  ) : (
    <></>
  );
};
export default Pagination;
