import React, { useEffect, useState, useCallback, memo, useRef } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
  LoadingLi,
} from "../../components/StyledElements";
import { Button, Input } from "../../components";
import { Ul, Li } from "../../components/StyledElements";
import { useStores } from "../../stores/Context";
import Select from "react-select";
import { observer } from "mobx-react";

const ListTitle = memo(() => {
  return (
    <Ul
      borderB="1px solid #e2e6e7"
      width="100%"
      padding="14px 24px"
      boxSizing="border-box"
      just="space-around"
      color="rgb(33, 43, 54)"
      fontW="600"
      fontSize="14px"
      height="68px"
      align="center"
    >
      <Li just="center" width="25%" align="center">
        등록아이디
      </Li>
      <Li just="center" width="25%" align="center">
        카테고리
      </Li>
      <Li just="center" width="25%" align="center">
        이름
      </Li>
      <Li just="center" width="25%" align="center">
        관리
      </Li>
    </Ul>
  );
});

const ManageAdmin = observer(() => {
  const { ManageStore } = useStores();

  const [facilityList, setFacilityList] = useState([]);
  const [state, setState] = useState({
    name: "",
  });
  const [editState, setEditState] = useState({
    name: "",
  });

  const [isClicked, setIsClicked] = useState("");

  const [isLoading, setIsLoading] = useState(false);

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
    { value: "CONVEIENCE", label: "CONVEIENCE" },
    { value: "NOODEL", label: "BREAD" },
    { value: "BEVERAGE", label: "BEVERAGE" },
  ];

  const getFacilityList = useCallback(() => {
    setIsLoading(true);
    ManageStore.callFacilityList()
      .then((res) => {
        setFacilityList(ManageStore.getFacilityList);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("정보를 불러오는데 실패하였습니다. 다시 시도해주세요.");
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  }, [ManageStore]);

  const deleteList = async (id) => {
    await ManageStore.deleteFacilityList(id);
    getFacilityList();
  };

  const selctedList = (index) => {
    setIsClicked(index);
  };

  const editList = (id, category) => {
    if (editState.name !== "") {
      ManageStore.editFacilityList(id, category, editState.name)
        .then((res) => {
          getFacilityList();
          setIsClicked(false);
          setEditState({
            name: "",
          });
        })
        .catch((err) =>
          alert("편의시설이 이미 등록되있거나 잘못된 입력입니다.")
        );
    } else {
      return setIsClicked(false);
    }
  };

  const addList = async () => {
    if (selectRef.current.props.value && state.name !== "") {
      const category = selectRef.current.props.value.value;

      ManageStore.addFacilityList(category, state.name)
        .then((res) => {
          getFacilityList();
          setState({
            name: "",
          });
          selectRef.current.clearValue();
        })
        .catch((err) => {
          if (err.response.status === 409) {
            return;
          } else {
            alert("카테고리 등록에 실패했습니다. 다시 시도해주세요.");
          }
        });
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
            편의시설
          </StyledBody>
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
              margin="0 10px 0 0"
              padding="6px 8px"
              width="40px"
              background="rgb(24, 144, 255)"
              onClick={addList}
            />
          </FlexBox>
        </FlexBox>
        <ListTitle />
        <Ul
          direction="column"
          width="100%"
          boxSizing="border-box"
          just="space-around"
          color="rgb(33, 43, 54)"
          fontSize="14px"
          align="center"
          overflow="hidden"
        >
          {isLoading ? (
            new Array(5).fill(1).map((_, i) => {
              return <SkeletonList key={i} />;
            })
          ) : facilityList ? (
            facilityList.map(({ category, name, id }, index, item) => {
              return (
                <Li
                  key={id}
                  border={
                    item.length - 1 === index ? "null" : "1px solid #e2e6e7"
                  }
                  align="center"
                  width="100%"
                  padding="14px 24px"
                  boxSizing="border-box"
                  just="space-around"
                >
                  <FlexBox
                    width="25%"
                    just="center"
                    height="16px"
                    align="center"
                  >
                    {id}
                  </FlexBox>
                  <FlexBox
                    width="25%"
                    just="center"
                    height="16px"
                    align="center"
                  >
                    {category}
                  </FlexBox>
                  <Input
                    width="25%"
                    maxW="259px"
                    margin="0"
                    placeholder={name}
                    value={isClicked === index ? editState.name : name}
                    id="name"
                    disabled={isClicked === index ? false : true}
                    onChange={editOnChange}
                  />
                  <FlexBox
                    width="25%"
                    just="center"
                    height="16px"
                    align="center"
                  >
                    <Button
                      title={isClicked === index ? "변경" : "수정"}
                      margin="0 10px 0 0"
                      padding="6px 8px"
                      width="40px"
                      background="rgb(24, 144, 255)"
                      onClick={
                        isClicked === index
                          ? (e) => editList(id, category)
                          : (e) => selctedList(index)
                      }
                    />
                    <Button
                      title="삭제"
                      margin="0"
                      padding="6px 8px"
                      width="40px"
                      background="rgb(255, 72, 66)"
                      onClick={() => deleteList(id)}
                    />
                  </FlexBox>
                </Li>
              );
            })
          ) : (
            <div>등록된 리스트가 없습니다.</div>
          )}
        </Ul>
      </FlexBox>
    </FlexBox>
  );
});

export default ManageAdmin;

const SkeletonList = () => {
  return (
    <Li height="68px" width="100%" border="1px solid #e2e6e7" align="center">
      <Ul
        width="100%"
        padding="14px 24px"
        boxSizing="border-box"
        just="space-around"
      >
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
      </Ul>
    </Li>
  );
};
