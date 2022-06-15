import React, { useState, useCallback, useRef } from "react";
import { FlexBox, StyledTitle } from "../../components/StyledElements";
import { DragDrop } from "../../views";

const StoreImageContainer = () => {
  const [files, setFiles] = useState([]);

  const fileId = useRef(0);

  const onChangeFiles = useCallback(
    (e) => {
      const maxSize = 3 * 1024 * 1024;
      let selectFiles = [];
      let tempFiles = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        if (maxSize < file.size) {
          alert("이미지 용량은 3MB 이내로 등록가능합니다.");
        } else {
          tempFiles = [
            ...tempFiles,
            {
              id: fileId.current++,
              object: file,
            },
          ];
        }
      }

      setFiles(tempFiles);
    },
    [files]
  );

  const handleFilterFile = useCallback(
    (id) => {
      setFiles(files.filter((file) => file.id !== id));
    },
    [files]
  );

  // 이미지업로드
  // const onFileChange = async (e) => {
  //   const maxSize = 10 * 1024 * 1024;
  //   const imgSize = e.target.files[0].size;

  //   if (imgSize > maxSize) {
  //     alert("이미지 용량은 10MB 이내로 등록가능합니다.");
  //   } else {
  //     const uploaded = await imageUploader.upload(e.target.files[0]);
  //     setState((prev) => ({
  //       ...prev,
  //       busi_num_img: uploaded,
  //     }));
  //     alert("사업자등록증이 등록되었습니다.");
  //   }

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">업체 이미지 관리</StyledTitle>
      <FlexBox
        width="100%"
        margin="24px 0 0"
        background="#fff"
        boxSizing="border-box"
        direction="column"
        rad="16px"
        shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
        padding="20px"
      >
        <DragDrop
          files={files}
          onChangeFiles={onChangeFiles}
          handleFilterFile={handleFilterFile}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default StoreImageContainer;
