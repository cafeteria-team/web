import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${({ width }) => width || "100%"};
  font-weight: ${({ weight }) => weight || "normal"};
  padding: ${({ padding }) => padding || "14px 20px"};
  border-radius: 4px;
  outline: unset;
  transition: border 0.3s ease-in-out;
  margin-bottom: 20px;
  font-size: ${({ theme, font }) => font || theme.fontSizes[2]};
  background-color: ${({ background, theme }) =>
    background ? background : theme.colors.orange};
  color: ${({ color }) => color || "#fff"};
  border: unset;
  cursor: pointer;
  box-sizing: content-box;
  position: ${({ position }) => position || ""};
  right: ${({ right }) => right || ""};
  top: ${({ top }) => top || ""};
`;

function Button({
  title,
  type,
  width,
  background,
  color,
  position,
  right,
  top,
  weight,
  padding,
  font,
  onClick,
}) {
  return (
    <StyledButton
      type={type}
      width={width}
      background={background}
      color={color}
      position={position}
      right={right}
      top={top}
      weight={weight}
      padding={padding}
      font={font}
      onClick={onClick}
    >
      {title}
    </StyledButton>
  );
}

export default Button;
