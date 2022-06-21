import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledSpan,
} from "../../components/StyledElements";
import { DragDrop } from "../../views";
import { useStores } from "../../stores/Context";
import Decode from "../../utils/decode";
import Spinner from "../../components/Spinner";
import { v4 as uuidv4 } from "uuid";

const StoreImageContainer = () => {
  const { AuthStore, ListStore } = useStores();

  const [files, setFiles] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState(null);

  const [fileId, setFileId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeFiles = useCallback(
    (e) => {
      const maxSize = 3 * 1024 * 1024;
      const maxNum = 3;
      let selectFiles = [];
      let tempFiles = [...files];

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }
      if (tempFiles.length !== maxNum) {
        for (const file of selectFiles) {
          if (maxSize < file.size) {
            alert("이미지 용량은 3MB 이내로 등록가능합니다.");
          } else {
            tempFiles = [
              ...tempFiles,
              {
                id: uuidv4(),
                object: file,
              },
            ];
          }
        }
        setFiles(tempFiles);
      } else {
        alert("이미지는 최대 3장까지 등록 가능합니다.");
      }
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
    let dataToSend = { ...userData };
    const copiedFiles = [...files];
    const formData = new FormData();
    let imagesArray = [];
    for (const file of copiedFiles) {
      formData.append("files", file.object);
    }

    setIsLoading(true);
    AuthStore.imageUpload(formData)
      .then((res) => {
        let newData = copiedFiles.filter(
          (file) => typeof file.object === "string"
        );
        for (const file of res.data) {
          newData = [...newData, { id: uuidv4(), object: file }];
        }
        imagesArray = newData.map((item) => {
          return item.object;
        });
        setFiles(newData);
        dataToSend = {
          ...dataToSend,
          store: { ...dataToSend.store, store_img: imagesArray },
        };
        sendData(dataToSend);
      })
      .catch((err) => {
        alert("이미지 파일을 등록할수없습니다. 잠시후 다시 시도해주십시오.");
      });
  };

  const sendData = (data) => {
    ListStore.editUser(user, data)
      .then(({ data }) => {
        console.log(data);
        let selectFiles = [];
        setUserData(data);
        for (const file of data.store.store_img) {
          selectFiles = [
            ...selectFiles,
            {
              id: uuidv4(),
              object: file,
            },
          ];
        }
        setFiles(selectFiles);
        alert("이미지 등록이완료되었습니다.");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert("이미지 파일을 등록할수없습니다. 잠시후 다시 시도해주십시오.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getImageFiles = ({ user_id }) => {
    setIsLoading(true);
    ListStore.getEditUser(user_id)
      .then(({ data }) => {
        setUserData(data);
        setUploadImages(data.store.store_img);
        if (data.store.store_img.length !== 0) {
          let selectFiles = [];
          for (const file of data.store.store_img) {
            selectFiles = [
              ...selectFiles,
              {
                id: uuidv4(),
                object: file,
                // object: file.replace(
                //   "https://good-cafeteria.s3.ap-northeast-2.amazonaws.com/media/root/",
                //   ""
                // ),
              },
            ];
          }
          setFiles(selectFiles);
          setIsLoading(false);
        }
        setIsLoading(false);
        return;
      })
      .catch((err) => {
        alert("등록된 이미지를 불러올수없습니다. 잠시후 다시 시도해주십시오.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setUserId = () => {
    const decode = new Decode();
    const access = localStorage.getItem("access");
    const data = decode.getUserId(access);
    setUser(data.user_id);
    getImageFiles(data);
  };

  useEffect(() => {
    setUserId();
  }, []);

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <Spinner loading={isLoading} />
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
        <StyledSpan font="12px" color="#838383">
          *이미지 등록 또는 삭제 후 "저장" 버튼을 꼭 눌러주세요.
        </StyledSpan>
      </FlexBox>
    </FlexBox>
  );
};

export default StoreImageContainer;
