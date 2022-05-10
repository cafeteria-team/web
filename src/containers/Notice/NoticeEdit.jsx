import React, { useEffect, useState } from "react";
import { TextEditor } from "../../views";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
  Ul,
  Li,
} from "../../components/StyledElements";
import { useStores } from "../../stores/Context";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useParams } from "react-router";

const NoticeEdit = observer(() => {
  const navigate = useNavigate();
  const params = useParams();
  const { AuthStore, NoticeStore } = useStores();
  const [noticeData, setNoticeData] = useState("");
  const [noticeSub, setNoticeSub] = useState("");

  const [toggle, setToggle] = useState(true);
  const [showToggle, setShowToggle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  // 공지사항 저장
  const sendNotice = (result, title) => {
    NoticeStore.editNotice(title, result, toggle, params.id)
      .then((res) => {
        alert("공지사항이 등록되었습니다.");
        navigate("/main/notice");
      })
      .catch((err) =>
        alert("공지사항을 저장할수없습니다. 잠시후 다시 시도해주세요.")
      );
  };

  // change toggle status
  const changeToggled = () => {
    setToggle((prev) => !prev);
  };

  //공지사항 불러오기
  const getNotice = () => {
    setIsLoading(true);
    NoticeStore.callNotice()
      .then((res) => {
        const clickedNotice = res.data.filter((item) => item.id !== params.id);
        console.log(clickedNotice);
        setNoticeData(clickedNotice[0].content);
        setTitle(clickedNotice[0].subject);
        setToggle(clickedNotice[0].view);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("공지사항을 불러올수없습니다.");
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    const data = NoticeStore.getNoticeList;
    setNoticeData(data);
  };

  useEffect(() => {
    getNotice();
  }, []);

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">공지사항 수정하기</StyledTitle>
      <FlexBox
        width="100%"
        margin="24px 0 0"
        background="#fff"
        boxSizing="border-box"
        direction="column"
        rad="16px"
        shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
      >
        <TextEditor
          isLoading={isLoading}
          sendNotice={sendNotice}
          noticeData={noticeData}
          showToggle={showToggle}
          toggle={toggle}
          changeToggled={changeToggled}
          handleChange={handleChange}
          title={title}
          noticeSub={noticeSub}
        />
      </FlexBox>
    </FlexBox>
  );
});

export default NoticeEdit;
