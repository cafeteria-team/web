import React, { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
import { Button } from "../components";
import { FlexBox } from "../components/StyledElements";

const MyBlock = styled.div`
  width: 100%;
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

// const editorLabels = {
//   // BlockType
//   "components.controls.blocktype.h1": "Heading 1",
//   "components.controls.blocktype.h2": "Heading 2",
//   "components.controls.blocktype.h3": "Heading 3",
//   "components.controls.blocktype.h4": "Heading 4",
//   "components.controls.blocktype.h5": "Heading 5",
//   "components.controls.blocktype.h6": "Heading 6",
//   "components.controls.blocktype.blockquote": "Blockquote",
//   "components.controls.blocktype.code": "Code",
//   "components.controls.blocktype.blocktype": "Block Type",
//   "components.controls.blocktype.normal": "Normal",
// };

const MyEditor = () => {
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState("");

  const handleEditorChange = (state) => {
    // editorState에 값 설정
    setEditorState(state);
    convertContentToHTML(state);
  };
  const convertContentToHTML = (editorState) => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  useEffect(() => {}, [editorState]);

  const sendText = () => {
    console.log(convertedContent);
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
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={handleEditorChange}
      />
      <FlexBox width="100%" just="center">
        <Button
          type="button"
          width="300px"
          title="확인"
          onClick={sendText}
          margin="32px 0 0 0"
        />
      </FlexBox>
    </MyBlock>
  );
};

export default MyEditor;
