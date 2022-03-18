/* eslint-disable no-unused-expressions */
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${({ width }) => width || "100%"};
  font-weight: ${({ weight }) => weight || "normal"};
  padding: ${({ padding }) => padding || "14px 20px"};
  border-radius: 4px;
  outline: unset;
  transition: border, background 0.3s ease-in-out;
  margin: ${({ margin }) => margin || "0 0 20px 0"};
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

  &:hover {
    ${({ hover }) =>
      hover &&
      `background: #f97316;
    cursor: pointer;
`}
  }

  &[disabled] {
    ${({ disabled }) =>
      disabled &&
      `background: grey;
  cursor: revert;
  transform: revert;`}
  }

  &[aria-current] {
    ${({ ariaCurrent }) => {
      console.log(ariaCurrent);
      ariaCurrent === "page" &&
        `background: deeppink;
        font-weight: bold;
        cursor: revert;
        transform: revert`;
    }}
  }
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
  disabled,
  ariaCurrent,
  hover,
  margin,
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
      disabled={disabled}
      ariaCurrent={ariaCurrent}
      hover={hover}
      margin={margin}
    >
      {title}
    </StyledButton>
  );
}

export default Button;
