import React, { useEffect, useState } from "react";
import { Button, Input, ImageInput } from "../components";
import { Form, FlexBox, StyledBody } from "../components/StyledElements";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../utils/imageuploader";

// 이미지 클라우드
const imageUploader = new ImageUploader();

const imageStyle = {
  wrap: {
    width: "342px",
  },
  div: {
    position: "relative",
    paddingTop: "100%",
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
        <FlexBox margin="0 10px 0 0" minW="100px">
          아이디
        </FlexBox>
        <Input
          disabled
          type="text"
          id="username"
          margin="0"
          value={selectedUser?.username}
        />
      </>
    ),
  },
  {
    body: (selectedUser, handleChange, state) => (
      <>
        <FlexBox margin="0 10px 0 0" minW="100px">
          이메일
        </FlexBox>
        <Input
          type="email"
          id="email"
          margin="0"
          value={state.email}
          onChange={(e) => handleChange(e)}
        />
      </>
    ),
  },
  {
    body: (selectedUser, handleChange, state) => (
      <>
        <FlexBox margin="0 10px 0 0" minW="100px">
          가게명
        </FlexBox>
        <Input
          type="text"
          id="name"
          margin="0"
          value={state.name}
          onChange={(e) => handleChange(e)}
        />
      </>
    ),
  },
  {
    body: (selectedUser, handleChange, state) => (
      <>
        <FlexBox margin="0 10px 0 0" minW="100px">
          사업자번호
        </FlexBox>
        <Input
          type="text"
          id="busi_num"
          margin="0"
          value={state.busi_num}
          onChange={(e) => handleChange(e)}
        />
      </>
    ),
  },
  {
    body: (selectedUser, handleChange, state, onFileChange, editImage) => (
      <>
        <FlexBox margin="0 10px 0 0" minW="100px" direction="column">
          <StyledBody margin="0 0 10px 0">사업자 이미지</StyledBody>
          <ImageInput
            onChange={onFileChange}
            id="editImageInput"
            accept="image/*"
            editImage={editImage}
          />
        </FlexBox>
        <div style={imageStyle.wrap}>
          {state.busi_num_img === "" ? (
            <div style={imageStyle.div}>
              <img
                src={state.busi_num_img}
                alt="business_img"
                style={imageStyle.image}
              />
            </div>
          ) : (
            <div>등록된 이미지가 없습니다.</div>
          )}
        </div>
      </>
    ),
  },
];

const MemberEdit = ({ selectedUser, id, editUser }) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    name: "",
    busi_num: "",
    busi_num_img: "",
  });

  const editImage = true;

  useEffect(() => {
    setState({
      email: selectedUser?.email,
      name: selectedUser?.store.name,
      busi_num: selectedUser?.store.busi_num,
      busi_num_img: selectedUser?.store.busi_num_img,
    });
  }, [selectedUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const goBacktoList = () => {
    navigate("/main/member", { replace: true });
  };

  const submit = (e) => {
    editUser(id, state);
  };

  // 이미지업로드
  const onFileChange = async (e) => {
    const maxSize = 10 * 1024 * 1024;
    const imgSize = e.target.files[0].size;

    if (imgSize > maxSize) {
      alert("이미지 용량은 10MB 이내로 등록가능합니다.");
    } else {
      const uploaded = await imageUploader.upload(e.target.files[0]);
      setState((prev) => ({
        ...prev,
        busi_num_img: uploaded,
      }));
    }
  };

  return (
    <>
      <Form method="POST" direction="column">
        <FlexBox wrap="wrap" width="100%">
          {InputData.map((item, index) => (
            <FlexBox align="center" width="40%" margin="20px 30px" key={index}>
              {item.body(
                selectedUser,
                handleChange,
                state,
                onFileChange,
                editImage
              )}
            </FlexBox>
          ))}
        </FlexBox>
        <FlexBox>
          <Button
            type="button"
            title="수정"
            width="150px"
            margin="30px 20px 0 0"
            background="#06c"
            onClick={submit}
          />
          <Button
            type="button"
            title="목록"
            width="150px"
            margin="30px 0 0 0"
            background="#33a66c"
            onClick={goBacktoList}
          />
        </FlexBox>
      </Form>
    </>
  );
};

export default MemberEdit;
