import React from "react";
import DaumPostcode from "react-daum-postcode";
import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
Geocode.setLanguage("ko");
Geocode.setRegion("ko");
Geocode.enableDebug();

const Post = (props) => {
  const GoogleMap = async (currentAddr) => {
    return Geocode.fromAddress(currentAddr)
      .then((response) => {
        const { lat, lng } = response.results[0].geometry.location;
        return { lat, lng };
      })
      .catch((err) => console.log(err));
  };

  const setGeoLocation = async (address) => {
    console.log(address);
    const currentAddr = address;
    if (currentAddr) {
      const { lat, lng } = await GoogleMap(currentAddr);
      setPoint({ lat: lat, lng: lng });
    }
  };

  const setAddress = props.setAddress;
  const setPoint = props.setPoint;

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
    setGeoLocation(fullAddress).then((res) => {
      props.popupOn();
    });
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
