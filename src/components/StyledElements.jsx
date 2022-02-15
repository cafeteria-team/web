import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes[5]};
  font-weight: ${({ theme }) => theme.fontWeights[8]};
  text-align: ${(props) => (props.align === "center" ? "center" : "left")};
  margin: ${(props) => props.margin};
`;
export const StyledBody = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  margin: ${(props) => props.margin || ""};
`;
export const StyledSpan = styled.span`
  align-self: ${(props) => props.align || ""};
  font-size: ${(props) => props.font || ""};
  color: ${(props) => props.color || ""};
`;
export const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.orange};
  height: 100%;
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
  display: flex;
  flex-direction: ${(props) => props.direction || ""};
  justify-content: ${(props) => props.just || ""};
  align-items: ${(props) => props.align};
  margin: ${(props) => props.margin || ""};
  padding: ${(props) => props.padding || ""};
  width: ${(props) => props.width || ""};
  height: ${(props) => props.height || ""};
  background-color: ${(props) => props.background || ""};
  border-radius: ${(props) => props.rad || ""};
  box-shadow: ${(props) => props.shadow || ""};
  position: ${(props) => props.position || ""};
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.color || props.theme.colors.blue};
`;
