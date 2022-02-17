import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes[5]};
  font-weight: ${({ theme }) => theme.fontWeights[8]};
  text-align: ${(props) => (props.align === "center" ? "center" : "left")};
  margin: ${(props) => props.margin};
  color: ${(props) => props.color || ""};
  padding: ${(props) => props.pad || ""};
  display: ${(props) => props.display || ""};
  flex-shrink: 0;
`;
export const StyledBody = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[2]};
  margin: ${(props) => props.margin || ""};
  color: ${(props) => props.color || ""};
  font-weight: ${(props) => props.weight || ""};
  display: ${(props) => props.display || ""};
  flex-shrink: 0;
`;
export const StyledSpan = styled.span`
  align-self: ${(props) => props.align || ""};
  font-size: ${(props) => props.font || ""};
  color: ${(props) => props.color || ""};
`;
export const MainContainer = styled.div`
  background-color: ${(props) =>
    props.background ? props.background : props.theme.colors.orange};
  background-image: ${(props) => props.bgImage || ""};
  background-repeat: no-repeat;
  background-size: cover;
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
  background-image: ${(props) => props.bgImage || ""};
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: ${(props) => props.rad || ""};
  box-shadow: ${(props) => props.shadow || ""};
  position: ${(props) => props.position || ""};
  max-width: ${(props) => props.maxW || ""};
  flex: ${(props) => props.flex || ""};
  transition: all 0.6s ease;
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.color || props.theme.colors.blue};
`;

export const SideUl = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const SideLi = styled.li`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  // align-items: center;
  height: 54px;
  width: 100%;
  padding: 0 20px;
  background: ${(props) => props.background || ""};
  cursor: pointer;
  transition: background-color 0.6s ease;
  &:hover {
    background: #f97316;
  }
`;
