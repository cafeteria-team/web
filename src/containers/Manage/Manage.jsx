import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
  Ul,
  Li,
  StyledSpan,
} from "../../components/StyledElements";
import { Input, Button, MyEditor } from "../../components";
import { useStores } from "../../stores/Context";
import Select from "react-select";

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
      <Li just="center" width="50%">
        목록
      </Li>
      <Li just="flex-end" width="50%" padding="0 40px 0 0">
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

const Manage = () => {
  // 스토어등록
  const { AuthStore, ManageStore } = useStores();

  // 편의시설 스테이트변경
  const [editState, setEditState] = useState({
    name: "",
  });

  // 편의시설 수정클릭시
  const [isClicked, setIsClicked] = useState("");

  // 셀렉트박스
  const selectRef = useRef();

  // 셀렉트 박스 옵션
  const [options, setOptions] = useState([]);

  // 편의시설목록 -> 셀렉트박스 목록을위한
  // 유저편의시설목록 -> 사용자가 선택한 리스트 보기위한
  const getFacilityList = async () => {
    await ManageStore.callFacilityList();
  };

  const getUserFacilityList = async () => {
    await ManageStore.callUserFacilityList(AuthStore.getUser.userId);
    setOptions([]);
    setLists();
  };

  // const getFacilityList = useCallback(async () => {
  //   await ManageStore.callFacilityList();
  //   setAdminFacility(ManageStore.getFacilityList);
  // }, [ManageStore]);

  // const getUserFacilityList = useCallback(async () => {
  //   await ManageStore.callUserFacilityList(AuthStore.getUser.userId);

  //   setFacilityList(ManageStore.getUserFacilityList);
  //   setOptions([]);
  //   setLists();
  // }, [ManageStore]);

  const setLists = useCallback(() => {
    const value = "value";
    const label = "label";
    const _id = "id";

    ManageStore.getFacilityList.map((item) => {
      const { name, id } = item;

      setOptions((prev) => [
        ...prev,
        {
          [value]: name,
          [label]: name,
          [_id]: id,
        },
      ]);
    });
  }, [ManageStore.getFacilityList]);

  const deleteList = async (id) => {
    await ManageStore.deleteFacilityList(id);
    getFacilityList();
  };

  const selctedList = (index) => {
    setIsClicked(index);
  };

  const editList = async (id, category) => {
    await ManageStore.editFacilityList(id, category, editState.name);
    getFacilityList();
    setIsClicked(false);
    setEditState({
      name: "",
    });
  };

  const addList = async () => {
    const { id } = selectRef.current.props.value;

    if (selectRef.current.props.value) {
      await ManageStore.addUserFacilityList(id, AuthStore.getUser.userId);
      selectRef.current.clearValue();
      getUserFacilityList();
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

  useEffect(() => {
    getFacilityList();
    getUserFacilityList();
  }, [AuthStore.getUser.userId]);

  return (
    <FlexBox width="100%" height="100%" direction="column" padding="30px 70px">
      <StyledTitle margin="0 0 30px 0">업체관리</StyledTitle>
      <FlexBox padding="0 0 30px 0" direction="column" width="100%">
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
            {ManageStore.getUserFacilityList &&
            ManageStore.getUserFacilityList.length !== 0 ? (
              ManageStore.getUserFacilityList.map(
                ({ facility, name, id }, index) => (
                  <Li
                    key={id}
                    border="1px solid #fdcc97"
                    padding="14px"
                    align="center"
                  >
                    <Input
                      width="50%"
                      margin="0"
                      placeholder={facility.name}
                      value={isClicked === index ? editState.name : name}
                      id="name"
                      disabled={isClicked === index ? false : true}
                      onChange={editOnChange}
                    />
                    <FlexBox
                      width="50%"
                      just="flex-end"
                      height="16px"
                      align="center"
                    >
                      <Button
                        title={isClicked === index ? "변경" : "수정"}
                        margin="0 10px 0 0"
                        padding="4px"
                        width="40px"
                        background="#06c"
                        onClick={
                          isClicked === index
                            ? (e) => editList(id)
                            : (e) => selctedList(index)
                        }
                      />
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
                )
              )
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
