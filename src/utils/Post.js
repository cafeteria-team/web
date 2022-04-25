import React from "react";
import DaumPostcode from "react-daum-postcode";

const Post = (props) => {
  const setAddress = props.setAddress;

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress((prev) => ({
      ...prev,
      addr: fullAddress,
      zip_code: data.zonecode,
    }));
    props.popupOn();
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    height: "60%",
    padding: "7px",
    zIndex: 100,
    border: "1px solid black",
    background: "white",
  };

  return (
    <>
      <DaumPostcode
        style={postCodeStyle}
        autoClose
        onComplete={handleComplete}
      />
    </>
  );
};

export default Post;
