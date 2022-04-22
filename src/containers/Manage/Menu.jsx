import React, { useEffect, useState, useCallback, memo, useRef } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
} from "../../components/StyledElements";
import { Button, Input } from "../../components";
import { Ul, Li } from "../../components/StyledElements";
import { useStores } from "../../stores/Context";
import Select from "react-select";

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
      <Li just="center" width="25%">
        등록아이디
      </Li>
      <Li just="center" width="25%">
        카테고리
      </Li>
      <Li just="center" width="25%">
        이름
      </Li>
      <Li just="center" width="25%">
        관리
      </Li>
    </Ul>
  );
});

const Menu = () => {
  const { ManageStore } = useStores();

  const [facilityList, setFacilityList] = useState([]);
  const [state, setState] = useState({
    name: "",
  });
  const [editState, setEditState] = useState({
    name: "",
  });

  const [isClicked, setIsClicked] = useState("");

  const selectRef = useRef();

  const customStyles = {
    control: (provided) => ({
      // none of react-select's styles are passed to <Control />
      ...provided,
      width: 200,
      height: 46,
      margin: "0 10px 0 0 ",
    }),
  };

  const colourOptions = [
    { value: "CAFE", label: "CAFE" },
    { value: "COFFEE", label: "COFFEE" },
  ];

  const getFacilityList = useCallback(async () => {
    await ManageStore.callFacilityList();
    setFacilityList(ManageStore.getFacilityList);
  }, [ManageStore]);

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
    if (selectRef.current.props.value && state.name !== "") {
      const category = selectRef.current.props.value.value;
      await ManageStore.addFacilityList(category, state.name);
      getFacilityList();
      setState({
        name: "",
      });
      selectRef.current.clearValue();
    } else {
      alert("카테고리 또는 편의시설명을 입력해주세요");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const editOnChange = (e) => {
    const { id, value } = e.target;
    setEditState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    getFacilityList();
  }, [getFacilityList]);

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">편의시설 및 서비스</StyledTitle>
      <FlexBox
        width="100%"
        background="#fff"
        padding="20px"
        boxSizing="border-box"
        direction="column"
      >
        <FlexBox just="space-between" align="center" margin="0 0 20px 0">
          <StyledBody>편의시설</StyledBody>
          <FlexBox>
            <Select
              styles={customStyles}
              classNamePrefix="select"
              isClearable={true}
              name="color"
              options={colourOptions}
              ref={selectRef}
            />
            <Input
              placeholder="편의시설 이름"
              width="auto"
              margin="0 10px 0px 0"
              value={state.name}
              id="name"
              onChange={handleChange}
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
        </FlexBox>
        <ListTitle />
        <Ul direction="column">
          {facilityList ? (
            facilityList.map(({ category, name, id }, index) => (
              <Li
                key={id}
                border="1px solid #fdcc97"
                padding="14px"
                align="center"
              >
                <FlexBox width="25%" just="center" height="16px" align="center">
                  {id}
                </FlexBox>
                <FlexBox width="25%" just="center" height="16px" align="center">
                  {category}
                </FlexBox>
                <Input
                  width="25%"
                  margin="0"
                  placeholder={name}
                  value={isClicked === index ? editState.name : name}
                  id="name"
                  disabled={isClicked === index ? false : true}
                  onChange={editOnChange}
                />
                <FlexBox width="25%" just="center" height="16px" align="center">
                  <Button
                    title={isClicked === index ? "변경" : "수정"}
                    margin="0 10px 0 0"
                    padding="4px"
                    width="40px"
                    background="#06c"
                    onClick={
                      isClicked === index
                        ? (e) => editList(id, category)
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
            ))
          ) : (
            <div>등록된 리스트가 없습니다.</div>
          )}
        </Ul>
      </FlexBox>
    </FlexBox>
  );
};

export default Menu;
