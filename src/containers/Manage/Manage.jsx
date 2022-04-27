import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
  Ul,
  Li,
  StyledSpan,
} from "../../components/StyledElements";
import { Button, MyEditor } from "../../components";
import { useStores } from "../../stores/Context";
import Select from "react-select";
import Decode from "../../utils/decode";
import Menu from "./Menu";

//리스트 제목
const ListTitle = memo(() => {
  return (
    <Ul
      width="100%"
      background="#FF8400"
      padding="14px"
      boxSizing="border-box"
      just="space-around"
      color="#fff"
    >
      <Li just="center" width="80%">
        목록
      </Li>
      <Li just="center" width="20%">
        관리
      </Li>
    </Ul>
  );
});

// 셀렉트박스 스타일
const customStyles = {
  control: (provided) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    width: 200,
    height: 46,
    margin: "0 10px 0 0 ",
  }),
};

const MenuList = function MenuList(props) {
  const children = props.children;

  if (!children.length) {
    return <div className="myClassListName">{children}</div>;
  }

  return (
    <div className="myClassListName">
      {children.length &&
        children.map((key, i) => {
          delete key.props.innerProps.onMouseMove; //FIX LAG!!
          delete key.props.innerProps.onMouseOver; //FIX LAG!!

          return (
            <div className="myClassItemName" key={i}>
              {key}
            </div>
          );
        })}
    </div>
  );
};

const Manage = () => {
  // 스토어등록
  const { AuthStore, ManageStore } = useStores();

  // 편의시설 스테이트변경
  const [editState, setEditState] = useState({
    name: "",
  });

  // 셀렉트박스
  const selectRef = useRef();

  // 셀렉트 박스 옵션
  const [options, setOptions] = useState([]);

  // 카테고리설정
  useEffect(() => {
    const getCategory = async () => {
      const result = await ManageStore.callFacilityList();
      setOptions("");
      setCategory(result);
    };

    getCategory().catch(console.error);
  }, [ManageStore]);

  const setCategory = (props) => {
    const value = "value";
    const label = "label";
    const _id = "id";
    const { data } = props;

    const result = data.map((item) => ({
      [value]: item.name,
      [label]: item.name,
      [_id]: item.id,
    }));

    setOptions(result);
  };

  const [lists, setLists] = useState("");

  const getFacilityList = useCallback(async () => {
    const decode = new Decode();
    const access = localStorage.getItem("access");
    const data = await decode.getUserId(access);
    const results = await ManageStore.callUserFacilityList(data.user_id);

    setLists(results?.data?.store_facility);
  }, [ManageStore]);

  // 유저 편의시설설정
  useEffect(() => {
    getFacilityList();
  }, [getFacilityList]);

  const deleteList = async (id) => {
    await ManageStore.deleteUserFacilityList(AuthStore.getUser.userId, id);
    getFacilityList();
  };

  const addList = async () => {
    const { id } = selectRef.current.props.value;

    if (selectRef.current.props.value) {
      await ManageStore.addUserFacilityList(id, AuthStore.getUser.userId);
      selectRef.current.clearValue();
      getFacilityList();
    } else {
      alert("편의시설 및 서비스를 선택해주세요.");
    }
  };

  // const handleChange = (e) => {
  //   const { id, value } = e.target;
  //   setState((prev) => ({
  //     ...prev,
  //     [id]: value,
  //   }));
  // };

  const editOnChange = (e) => {
    const { id, value } = e.target;
    setEditState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <FlexBox width="100%" height="100%" direction="column" padding="30px 70px">
      <StyledTitle margin="0 0 30px 0">업체관리</StyledTitle>
      <FlexBox padding="0 0 30px 0" direction="column" width="100%">
        <Menu />
        <FlexBox
          width="100%"
          background="#fff"
          padding="20px"
          boxSizing="border-box"
          direction="column"
        >
          <FlexBox just="space-between" align="center" margin="0 0 20px 0">
            <StyledBody>편의시설 및 서비스</StyledBody>
            <FlexBox direction="column">
              <FlexBox margin="0 0 10px 0">
                <Select
                  styles={customStyles}
                  classNamePrefix="select"
                  isClearable={true}
                  name="color"
                  options={options ? options : "카테고리 불러오는중입니다."}
                  ref={selectRef}
                  components={{
                    MenuList,
                  }}
                />
                <Button
                  title="추가"
                  margin="0"
                  padding="4px"
                  width="40px"
                  height="38px"
                  background="#06c"
                  onClick={addList}
                />
              </FlexBox>
              <StyledSpan font="12px" color="#838383" align="flex-end">
                편의시설 및 서비스를 추가해주세요.
              </StyledSpan>
            </FlexBox>
          </FlexBox>
          <ListTitle />
          <Ul direction="column">
            {lists && lists.length !== 0 ? (
              lists.map(({ facility, name, id }, index) => (
                <Li
                  key={id}
                  border="1px solid #fdcc97"
                  padding="14px"
                  align="center"
                >
                  <FlexBox
                    width="80%"
                    just="center"
                    height="16px"
                    align="center"
                  >
                    {facility.name}
                  </FlexBox>
                  <FlexBox
                    width="20%"
                    just="center"
                    height="16px"
                    align="center"
                  >
                    <Button
                      title="삭제"
                      margin="0"
                      padding="4px"
                      width="40px"
                      background="tomato"
                      onClick={() => deleteList(id)}
                    />
                  </FlexBox>
                </Li>
              ))
            ) : (
              <FlexBox
                width="100%"
                padding="40px 20px 20px"
                margin="0 auto"
                just="center"
              >
                등록된 리스트가 없습니다.
              </FlexBox>
            )}
          </Ul>
        </FlexBox>
      </FlexBox>
      <MyEditor />
    </FlexBox>
  );
};
export default Manage;
