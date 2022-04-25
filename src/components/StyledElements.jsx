import React, { memo } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import FilteredPropsInputField from "./FilteredPropsInputField";

const Title = styled.h1`
  font-size: ${({ props, theme }) => props.font || theme.fontSizes[5]};
  font-weight: ${({ theme }) => theme.fontWeights[6]};
  text-align: ${({ props }) => (props.align === "center" ? "center" : "left")};
  margin: ${({ props }) => props.margin};
  color: ${({ props }) => props.color || "#212B36"};
  padding: ${({ props }) => props.pad || ""};
  display: ${({ props }) => props.display || ""};
  position: ${({ props }) => props.position || ""};
  flex-shrink: 0;
  top: ${({ props }) => props.top || ""};
`;

export const StyledTitle = memo((props) => {
  return <Title props={props}>{props.children}</Title>;
});

const Body = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  margin: ${({ props }) => props.margin || ""};
  padding: ${({ props }) => props.padding || ""};
  color: ${({ props }) => props.color || ""};
  font-weight: ${({ props }) => props.weight || ""};
  display: ${({ props }) => props.display || ""};
  flex-shrink: 0;
  white-space: nowrap;
  line-height: ${({ props }) => props.lineH || ""};
  box-sizing: ${({ props }) => props.boxSizing || ""};
  height: ${({ props }) => props.height || ""};
`;

export const StyledBody = memo((props) => {
  return <Body props={props}>{props.children}</Body>;
});

export const StyledSpan = styled.span`
  align-self: ${(props) => props.align || ""};
  font-size: ${(props) => props.font || ""};
  color: ${(props) => props.color || ""};
  margin: ${(props) => props.margin || ""};
`;

export const MainContainer = styled.div`
  background-color: ${(props) =>
    props.background ? props.background : props.theme.colors.orange};
  background-image: ${(props) => props.bgImage || ""};
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  align-items: center;
  margin: ${(props) => props.margin || ""};
`;
export const FlexBox = styled.div`
  display: ${(props) => props.display || "flex"};
  flex-direction: ${(props) => props.direction || ""};
  justify-content: ${(props) => props.just || ""};
  align-items: ${(props) => props.align};
  margin: ${(props) => props.margin || ""};
  padding: ${(props) => props.padding || ""};
  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  background-color: ${(props) => props.background || ""};
  background-image: ${(props) => props.bgImage || ""};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${(props) => props.rad || ""};
  box-shadow: ${(props) => props.shadow || ""};
  position: ${(props) => props.position || ""};
  min-width: ${(props) => props.minW || ""};
  max-width: ${(props) => props.maxW || ""};
  flex: ${(props) => props.flex || ""};
  flex-wrap: ${(props) => props.wrap || ""};
  transition: all 0.6s ease;
  max-height: ${(props) => props.mHeight || ""};
  min-height: ${(props) => props.minHeight || ""};
  overflow: ${(props) => props.overflow || ""};
  top: ${(props) => props.top || ""};
  right: ${(props) => props.right || ""};
  cursor: ${(props) => props.cursor || ""};
  box-sizing: ${(props) => props.boxSizing || ""};
  &:hover {
    background: ${(props) => props.hoverBg || ""};
    color: ${(props) => props.hoverColor || ""};
  }
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.color || props.theme.colors.orange};
  text-decoration: underline !important;
  text-underline-position: under;
  text-decoration-color: #fdc89a !important;
`;

export const SideUl = styled.ul`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 80px;
`;

export const SideLi = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
  height: auto;
  min-height: 54px;
  width: 100%;
  // padding: 0 20px;
  background: ${(props) => props.background || ""};
  cursor: pointer;
  transition: background-color 0.6s ease;
  &:hover {
    background: #f97316;
  }
`;

export const Ul = styled.ul`
  display: ${(props) => props.display || "flex"};
  flex-direction: ${(props) => props.direction || ""};
  justify-content: ${(props) => props.just || ""};
  align-items: ${(props) => props.align};
  margin: ${(props) => props.margin || ""};
  padding: ${(props) => props.padding || ""};
  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  background-color: ${(props) => props.background || ""};
  background-image: ${(props) => props.bgImage || ""};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${(props) => props.rad || ""};
  box-shadow: ${(props) => props.shadow || ""};
  position: ${(props) => props.position || ""};
  max-width: ${(props) => props.maxW || ""};
  flex: ${(props) => props.flex || ""};
  transition: all 0.6s ease;
  max-height: ${(props) => props.mHeight || ""};
  min-height: ${(props) => props.minHeight || ""};
  overflow: ${(props) => props.overflow || ""};
  top: ${(props) => props.top || ""};
  cursor: ${(props) => props.cursor || ""};
  box-sizing: ${(props) => props.boxSizing || ""};
  color: ${(props) => props.color || ""};
  overflow: ${(props) => props.overflow || ""};
  &:hover {
    background: ${(props) => props.hoverBg || ""};
    color: ${(props) => props.hoverColor || ""};
  }
`;

export const Li = styled.li`
  display: ${(props) => props.display || "flex"};
  flex-direction: ${(props) => props.direction || ""};
  justify-content: ${(props) => props.just || ""};
  align-items: ${(props) => props.align};
  margin: ${(props) => props.margin || ""};
  padding: ${(props) => props.padding || ""};
  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  background-color: ${(props) => props.background || ""};
  background-image: ${(props) => props.bgImage || ""};
  background-repeat: no-repeat;
  background-size: cover;
  border-bottom: ${(props) => props.border || ""};
  border-radius: ${(props) => props.rad || ""};
  box-shadow: ${(props) => props.shadow || ""};
  position: ${(props) => props.position || ""};
  max-width: ${(props) => props.maxW || ""};
  flex: ${(props) => props.flex || ""};
  transition: all 0.6s ease;
  max-height: ${(props) => props.mHeight || ""};
  min-height: ${(props) => props.minHeight || ""};
  overflow: ${(props) => props.overflow || ""};
  top: ${(props) => props.top || ""};
  cursor: ${(props) => props.cursor || ""};
  box-sizing: ${(props) => props.boxSizing || ""};
  &:hover {
    background: ${(props) => props.hoverBg || ""};
    color: ${(props) => props.hoverColor || ""};
  }
`;

export const StyledFiled = styled(FilteredPropsInputField)`
  background-color: white;
  border: 1px solid rgba(145, 158, 171, 0.32);
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5rem;
  font-style: normal;
  font-weight: 400;
  width: 100%;
  max-width: 480px;
  margin-top: 0.5rem;
  margin: ${(props) => props.margin || ""};
  padding: 19.25px 20px;
  transition: border 0.3s ease-in-out;
  box-sizing: border-box;
  &::placeholder {
    color: #637381;
  }

  &:focus,
  &:active {
    border: 2px solid #ff9030;
    outline: none;
  }

  /* Autocomplete styles in Chrome*/
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    background-color: white;
    border: 1px solid lightgrey;
    box-shadow: 0 0 0px 1000px #fff inset;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: black;
  }

  ${({ valid }) =>
    valid &&
    css`
      border: 1px solid rgb(0, 156, 38);

      &:focus,
      &:active {
        border: 1px solid rgb(0, 156, 38);
        box-shadow: rgb(106, 237, 97) 0px 0px 2px 1px,
          rgb(177, 247, 160) 0px 0px 0px 3px;
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 1px solid rgb(0, 156, 38);
      }
    `}

  ${({ error }) =>
    error &&
    css`
      border: 2px solid rgb(255, 72, 66);
      outline: none;

      &:focus,
      &:active {
        box-shadow: rgb(244, 129, 116) 0px 0px 2px 1px,
          rgb(251, 178, 174) 0px 0px 0px 3px;
        border: 2px solid rgb(255, 72, 66);
        outline: none;
      }

      /* Autocomplete styles in Chrome*/
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus {
        border: 2px solid rgb(255, 72, 66);
      }
    `}
`;
