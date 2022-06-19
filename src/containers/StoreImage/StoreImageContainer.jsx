import React, { useState, useCallback, useRef, useEffect } from "react";
import { FlexBox, StyledTitle } from "../../components/StyledElements";
import { DragDrop } from "../../views";
import { useStores } from "../../stores/Context";
import Decode from "../../utils/decode";
import Spinner from "../../components/Spinner";

const StoreImageContainer = () => {
  const { AuthStore, ListStore } = useStores();

  const [files, setFiles] = useState([]);
  const [userData, setUserData] = useState({});
  const [user, setUser] = useState(null);

  const fileId = useRef(0);
  const [isLoading, setIsLoading] = useState(false);

  const [test, setTest] = useState({});

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
    if (files.length === 0) {
      alert("이미지를 먼저 등록해주세요.");
    } else {
      const dataToSend = userData;
      const formData = new FormData();
      files.map((file) => {
        formData.append("files", file.object);
      });
      setIsLoading(true);
      AuthStore.imageUpload(formData)
        .then((res) => {
          dataToSend.store.store_img = res.data;
          sendData(dataToSend);
        })
        .catch((err) => {
          alert("이미지 파일을 등록할수없습니다. 잠시후 다시 시도해주십시오.");
        });
    }
  };

  const sendData = (data) => {
    ListStore.editUser(user, data)
      .then(({ data }) => {
        let selectFiles = [];
        setUserData(data);

        // for(const file of data.store_img){
        //   selectFiles = [
        //     id:
        //   ]
        // }

        setFiles();
        alert("이미지 등록이완료되었습니다.");
        setIsLoading(false);
      })
      .catch((err) => {
        alert("이미지 파일을 등록할수없습니다. 잠시후 다시 시도해주십시오.");
        setIsLoading(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getImageFiles = ({ user_id }) => {
    ListStore.getEditUser(user_id)
      .then(({ data }) => {
        setUserData(data);
        if (data.store.store_img) {
          let selectFiles = [];
          let startIndex = 0;
          console.log(data.store.store_img.length);
          data.store.store_img.map((image) => {
            selectFiles = [
              {
                id: startIndex++,
                object: image,
              },
            ];
          });
          console.log(selectFiles);
          setFiles(selectFiles);
        }
        return;
      })
      .catch((err) =>
        alert("등록된 이미지를 불러올수없습니다. 잠시후 다시 시도해주십시오.")
      );
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
  }, [test]);

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
      </FlexBox>
    </FlexBox>
  );
};

export default StoreImageContainer;
