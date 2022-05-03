import React, { useState, useEffect, memo, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { EditorState, ContentState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { Button } from "../components";
import { FlexBox } from "../components/StyledElements";
import htmlToDraft from "html-to-draftjs";

const MyBlock = styled.div`
  width: 100%;
  border-radius: 16px;
  padding: 0 24px 24px;
  box-sizing: border-box;
  .wrapper-class {
    background: #fff;
  }
  .editor {
    height: 500px !important;
    border: 1px solid #f1f1f1 !important;
    padding: 5px 20px !important;
    border-radius: 2px !important;
  }
`;

const MyEditor = ({ sendNotice, noticeData }) => {
  const htmlToEditor = noticeData;

  // console.log(noticeData);
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleEditorChange = (state) => {
    // editorState에 값 설정
    setEditorState(state);
    // convertContentToHTML(state);
  };

  const convertContentToHTML = (editorState) => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    sendNotice(currentContentAsHTML);
  };

  useEffect(() => {}, [editorState]);

  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) return;
    rendered.current = true;
    const blocksFromHtml = htmlToDraft(htmlToEditor);
    if (blocksFromHtml) {
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [htmlToEditor, noticeData]);

  const sendText = () => {
    convertContentToHTML(editorState);
  };

  return (
    <MyBlock>
      <Editor
        // 에디터와 툴바 모두에 적용되는 클래스
        wrapperClassName="wrapper-class"
        // 에디터 주변에 적용된 클래스
        editorClassName="editor"
        // 툴바 주위에 적용된 클래스
        toolbarClassName="toolbar-class"
        // 툴바 설정
        toolbar={{
          // toolbar options
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "colorPicker",
            "emoji",
            // "history",
          ],
          inline: {
            options: [
              "bold",
              "italic",
              "underline",
              "strikethrough",
              // "monospace",
              // "superscript",
              // "subscript",
            ],
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2"],
            displayNames: [
              { label: "Normal", displayName: "Normal", style: "unstyled" },
              { label: "H1", displayName: "Heading 1", style: "header-one" },
              { label: "H2", displayName: "Heading 2", style: "header-two" },
              // { label: "H3", displayName: "Heading 3", style: "header-three" },
              // { label: "H4", displayName: "Heading 4", style: "header-four" },
              // { label: "H5", displayName: "Heading 5", style: "header-five" },
              // { label: "H6", displayName: "Heading 6", style: "header-six" },
              {
                label: "Blockquote",
                displayName: "Blockquote",
                style: "blockquote",
              },
            ],
            className: undefined,
            component: undefined,
          },
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
        }}
        placeholder="내용을 작성해주세요."
        // 한국어 설정
        localization={{
          locale: "ko",
          // translations: editorLabels,
        }}
        // 초기값 설정
        editorState={editorState}
        // defaultEditorState={noticeData}
        onEditorStateChange={handleEditorChange}
      />
      <FlexBox width="100%" just="center" padding="0 0 26px">
        <Button
          type="button"
          width="240px"
          title="공지사항 저장"
          onClick={sendText}
          margin="32px 0 0 0"
          background="#ff9030"
          shadow="rgb(249 217 189) 0px 8px 16px 0px"
        />
      </FlexBox>
    </MyBlock>
  );
};

export default memo(MyEditor);
