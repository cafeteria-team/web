import React, { useState, useCallback, useRef, useEffect } from "react";
import { FlexBox, StyledTitle } from "../../components/StyledElements";
import { DragDrop } from "../../views";
import { useStores } from "../../stores/Context";
import Decode from "../../utils/decode";

const StoreImageContainer = () => {
  const { ListStore } = useStores();

  const [files, setFiles] = useState([]);
  const [user, setUser] = useState(null);

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

  const submitImage = () => {
    ListStore.editUser(user, files)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getImageFiles = ({ user_id }) => {
    ListStore.getEditUser(user_id)
      .then(
        ({
          data: {
            store: { store_img },
          },
        }) => {
          if (store_img) {
            setFiles(store_img);
          }
          return;
        }
      )
      .catch((err) =>
        alert("등록된 이미지를 불러올수없습니다. 잠시후 다시 시도해주십시오.")
      );
  };

  useEffect(() => {
    const decode = new Decode();
    const access = localStorage.getItem("access");
    const data = decode.getUserId(access);
    setUser(data.user_id);
    getImageFiles(data);
  }, []);

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
          onClick={submitImage}
        />
      </FlexBox>
    </FlexBox>
  );
};

export default StoreImageContainer;
