import React, { useEffect, useState, useCallback } from "react";
import { Button, ImageInput } from "../components";
import {
  Form,
  FlexBox,
  StyledBody,
  StyledTitle,
} from "../components/StyledElements";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../utils/imageuploader";
import { useParams } from "react-router";
import TextField from "@mui/material/TextField";

import { FaImage, FaCamera } from "react-icons/fa";
import { observer } from "mobx-react";
import { useStores } from "../stores/Context";

import Spinner from "../components/Spinner";

// 이미지 클라우드
const imageUploader = new ImageUploader();

const imageStyle = {
  wrap: {
    width: "100%",
    height: "100%",
    padding: "20px",
    boxSizing: "border-box",
    maxHeight: "440px",
  },
  div: {
    position: "relative",
    paddingTop: "75%",
    overflow: "hidden",
    borderRadius: "4px",
  },
  image: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    maxWidth: "100%",
    height: "100%",
  },
};

const InputData = [
  {
    body: (selectedUser) => (
      <>
        <TextField
          label="아이디"
          fullWidth
          defaultValue={selectedUser.username}
          disabled
        />
      </>
    ),
  },
  {
    body: (selectedUser, handleChange) => (
      <>
        <TextField
          label="이메일"
          fullWidth
          id="email"
          defaultValue={selectedUser.email}
          onChange={(e) => handleChange(e)}
        />
      </>
    ),
  },
  {
    body: (selectedUser, handleChange, handleChangeStore) => (
      <>
        <TextField
          label="업체명"
          fullWidth
          id="name"
          defaultValue={selectedUser.store.name}
          onChange={(e) => handleChangeStore(e)}
        />
      </>
    ),
  },
  {
    body: (selectedUser, handleChange, handleChangeStore) => (
      <>
        <TextField
          fullWidth
          label="사업자번호"
          id="busi_num"
          defaultValue={selectedUser.store.busi_num}
          onChange={(e) => handleChangeStore(e)}
        />
      </>
    ),
  },
];

const UploadedImage = ({ onFileChange, editImage, selectedUser }) => {
  return (
    <FlexBox width="50%" direction="column" overflow="hidden">
      <FlexBox margin="0 10px 0 0" minW="100px" align="center">
        <StyledBody
          color="rgb(33, 43, 54)"
          fontSize="16px"
          fontW="600"
          margin="0 16px 0 0"
        >
          사업자 이미지
        </StyledBody>
        <ImageInput
          onChange={onFileChange}
          id="editImageInput"
          accept="image/*"
          editImage={editImage}
          FaCamera={FaCamera}
        />
      </FlexBox>
      <div style={imageStyle.wrap}>
        {selectedUser.store.busi_num_img !== "" ? (
          <div style={imageStyle.div}>
            <img
              src={selectedUser.store.busi_num_img}
              alt="사업자등록증"
              style={imageStyle.image}
            />
          </div>
        ) : (
          <FlexBox
            width="100%"
            height="100%"
            just="center"
            align="center"
            direction="column"
            border="1px dashed rgba(145,158,171,0.24)"
          >
            <FaImage
              style={{
                width: "60px",
                height: "60px",
                color: "rgba(145,158,171,0.12)",
                margin: "0 0 20px 0",
              }}
            />
            <StyledBody
              color="color rgb(33, 43, 54)"
              fontSize="14px"
              fontW="600"
            >
              등록된 이미지가 없습니다.
            </StyledBody>
          </FlexBox>
        )}
      </div>
    </FlexBox>
  );
};

const MemberEdit = observer(() => {
  const { ListStore } = useStores();

  const [selectedUser, setSelectedUser] = useState(null);

  const [loading, setLoading] = useState(false);

  const params = useParams();

  const navigate = useNavigate();

  const editImage = true;

  // 유저수정 완료
  const editUser = () => {
    ListStore.editUser(params.name, selectedUser).then((res) =>
      console.log(res, "sss")
    );

    // try {
    //   const response = await ListStore.editUser(params.name, selectedUser);
    //   console.log(response);
    //   // alert("회원정보가 수정되었습니다.");
    //   // return navigate("/main/member");
    // } catch (error) {
    //   alert("서버와의 연결이 끊어졌습니다. 다시한번 시도해주십시오.");
    // }
  };

  // 선택된 유저 불러오기
  const _getEditUser = useCallback(
    (userId) => {
      setLoading(true);
      const access = localStorage.getItem("access");
      ListStore.getEditUser(userId, access).then((res) => {
        setSelectedUser(res.data);
        setLoading(false);
      });
    },
    [ListStore]
  );

  useEffect(() => {
    _getEditUser(params.name);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setSelectedUser((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleChangeStore = (e) => {
    const { id, value } = e.target;
    setSelectedUser((prev) => ({
      ...prev,
      store: {
        ...prev.store,
        [id]: value,
      },
    }));
  };

  const goBacktoList = () => {
    navigate("/main/member", { replace: true });
  };

  // 이미지업로드
  const onFileChange = async (e) => {
    const maxSize = 10 * 1024 * 1024;
    const imgSize = e.target.files[0].size;
    if (imgSize > maxSize) {
      alert("이미지 용량은 10MB 이내로 등록가능합니다.");
    } else {
      setLoading(true);
      const uploaded = await imageUploader.upload(e.target.files[0]);
      setSelectedUser((prev) => ({
        ...prev,
        store: {
          ...prev.store,
          busi_num_img: uploaded,
        },
      }));
      setLoading(false);
    }
  };

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <Spinner loading={loading} />
      <StyledTitle margin="0 0 30px 0">회원정보관리 </StyledTitle>
      <FlexBox
        width="100%"
        background="#fff"
        boxSizing="border-box"
        direction="column"
        rad="16px"
        shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
      >
        <FlexBox
          just="space-between"
          height="62px"
          align="center"
          padding="20px 24px"
        >
          <StyledBody color="color rgb(33, 43, 54)" fontSize="18px" fontW="600">
            "회원관리" 님의 정보수정
          </StyledBody>
        </FlexBox>
        <Form method="POST" direction="column">
          <FlexBox width="100%" position="relative">
            <FlexBox direction="column" width="50%" margin="32px 0 0">
              {selectedUser ? (
                InputData.map((item, index) => (
                  <FlexBox align="center" margin="20px 30px" key={index}>
                    {item.body(selectedUser, handleChange, handleChangeStore)}
                  </FlexBox>
                ))
              ) : (
                <div
                  style={{
                    color: "rgb(33, 43, 54)",
                    fontSize: "14px",
                    textAlign: "center",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: "20px",
                  }}
                >
                  리스트를 불러오는중입니다.
                </div>
              )}
            </FlexBox>
            {selectedUser && (
              <UploadedImage
                onFileChange={onFileChange}
                editImage={editImage}
                selectedUser={selectedUser}
              />
            )}
          </FlexBox>
          <FlexBox margin="50px 0">
            <Button
              type="button"
              title="수정"
              width="140px"
              margin="0 20px 0 0"
              background="#ff9030"
              shadow="rgb(249 217 189) 0px 8px 16px 0px"
              onClick={editUser}
            />
            <Button
              type="button"
              title="목록"
              width="140px"
              margin="0"
              color="#ff9030"
              background="#fff"
              border="1px solid #ff9030"
              onClick={goBacktoList}
            />
          </FlexBox>
        </Form>
      </FlexBox>
    </FlexBox>
  );
});

export default MemberEdit;
