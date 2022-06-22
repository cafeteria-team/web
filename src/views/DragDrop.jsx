import React, { useState, useCallback, useEffect, useRef, memo } from "react";
import { FlexBox } from "../components/StyledElements";
import { FaFileImage, FaTrashAlt } from "react-icons/fa";
import { Button } from "../components";
import { v4 as uuidv4 } from "uuid";
import { throttle } from "lodash";

const DragDrop = ({
  files,
  onChangeFiles,
  handleFilterFile,
  onClick,
  name,
}) => {
  // 드래그 중일때와 아닐때의 스타일을 구분하기 위한 state 변수
  const [isDragging, setIsDragging] = useState(false);

  // 이미지 호버시
  const [showImage, setShowImage] = useState(null);
  const [top, setTop] = useState(null);
  const [left, setLeft] = useState(null);

  // 드래그 이벤트를 감지하는 ref 참조변수 (label 태그에 들어갈 예정)
  const dragRef = useRef(null);

  const handleDragIn = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer?.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragIn);
      dragRef.current.addEventListener("dragleave", handleDragOut);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)

    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragIn);
      dragRef.current.removeEventListener("dragleave", handleDragOut);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const mouseLeave = (e) => {
    setShowImage(null);
  };

  const mouseMove = useCallback(
    throttle((e, id) => {
      e.preventDefault();
      e.stopPropagation();
      setShowImage(id);
      setLeft(e.clientX + 20);
      setTop(e.clientY - 200);
    }, 80),
    []
  );

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  const ImageInput = memo(({ isDragging, onChangeFiles, dragRef }) => {
    return (
      <FlexBox
        background={
          isDragging ? "rgb(209,233,252)" : "rgba(145, 158, 171, 0.12)"
        }
        height="400px"
        rad="16px"
        just="center"
        align="center"
        border="1px dashed rgb(99, 115, 129)"
        margin="0 0 20px 0"
      >
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          multiple={true}
          onChange={onChangeFiles}
        />

        <label
          htmlFor="fileUpload"
          ref={dragRef}
          style={{
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
        >
          <FlexBox
            direction="column"
            align="center"
            just="center"
            height="100%"
          >
            <FaFileImage
              style={{
                color: "rgb(99, 115, 129)",
                width: "36px",
                height: "36px",
                marginRight: "0px",
              }}
            />
            <FlexBox margin="20px 0 0 0" color="rgb(99, 115, 129)">
              이미지를
            </FlexBox>
            <FlexBox margin="6px 0 0 0" color="rgb(99, 115, 129)">
              등록해주세요.
            </FlexBox>
          </FlexBox>
        </label>
      </FlexBox>
    );
  });

  const ImageLists = memo(
    ({ files, mouseLeave, mouseMove, top, left, handleFilterFile, name }) => {
      return (
        <FlexBox direction="column">
          {files.length > 0 &&
            files.map((file) => {
              const { id, object } = file;

              return (
                <FlexBox
                  key={uuidv4()}
                  just="space-between"
                  align="center"
                  height="40px"
                  rad="8px"
                  padding="0 20px"
                  margin="0 0 20px 0"
                  background={
                    object?.name ? "rgba(145, 158, 171, 0.12)" : "#ffe4ce6e"
                  }
                  onMouseLeave={mouseLeave}
                  onMouseMove={(e) => {
                    if (!object?.name) {
                      mouseMove(e, id);
                    }
                  }}
                >
                  {showImage === id && (
                    <FlexBox
                      width="200px"
                      height="200px"
                      position="absolute"
                      top={`${top}px`}
                      left={`${left}px`}
                      overflow="hidden"
                    >
                      <img
                        src={object}
                        alt="images"
                        style={{ width: "auto", height: "100%" }}
                      />
                    </FlexBox>
                  )}
                  <FlexBox color="rgb(99, 115, 129)">
                    {object?.name?.replace(
                      `https://good-cafeteria.s3.ap-northeast-2.amazonaws.com/media/${name}/`,
                      ""
                    ) ||
                      object?.replace(
                        `https://good-cafeteria.s3.ap-northeast-2.amazonaws.com/media/${name}/`,
                        ""
                      )}
                  </FlexBox>
                  <div onClick={() => handleFilterFile(id)}>
                    <FaTrashAlt
                      style={{
                        color: "rgb(99, 115, 129)",
                        width: "18px",
                        height: "18px",
                        marginRight: "0px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </FlexBox>
              );
            })}
        </FlexBox>
      );
    }
  );

  const SaveBtn = memo(({ onClick }) => {
    return (
      <Button
        width="120px"
        margin="0px auto 10px"
        padding="18.25px 20px"
        background="#ff9030"
        shadow="rgb(249 217 189) 0px 8px 16px 0px"
        title="저장"
        onClick={onClick}
      />
    );
  });

  return (
    <>
      <ImageInput
        isDragging={isDragging}
        onChangeFiles={onChangeFiles}
        dragRef={dragRef}
      />
      <ImageLists
        files={files}
        mouseLeave={mouseLeave}
        mouseMove={mouseMove}
        top={top}
        left={left}
        handleFilterFile={handleFilterFile}
        name={name}
      />
      <SaveBtn onClick={onClick} />
    </>
  );
};

export default DragDrop;
