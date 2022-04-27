/* eslint-disable no-unused-expressions */
import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: ${({ display }) => display || ""};
  align-items: ${({ align }) => align || ""};
  justify-content: ${({ just }) => just || ""};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || ""};
  font-weight: ${({ weight }) => weight || "normal"};
  padding: ${({ padding }) => padding || "14px 20px"};
  border-radius: 8px;
  outline: unset;
  transition: border, background 0.3s ease-in-out;
  margin: ${({ margin }) => margin || "0 0 20px 0"};
  font-size: ${({ theme, font }) => font || theme.fontSizes[2]};
  background-color: ${({ background, theme }) =>
    background ? background : theme.colors.orange};
  color: ${({ color }) => color || "#fff"};
  border: ${({ border }) => border || "unset"};
  cursor: pointer;
  box-sizing: content-box;
  position: ${({ position }) => position || ""};
  right: ${({ right }) => right || ""};
  left: ${({ left }) => left || ""};
  top: ${({ top }) => top || ""};
  bottom: ${({ bottom }) => bottom || ""};
  text-align: ${({ textAlign }) => textAlign || ""};
  box-shadow: ${({ shadow }) => shadow || ""};

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
      `color: rgb(33, 43, 54);
  cursor: revert;
  transform: revert;`}
  }

  &[aria-current] {
    ${({ ariaCurrent }) => {
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
  border,
  textAlign,
  left,
  bottom,
  height,
  shadow,
  display,
  align,
  just,
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
      border={border}
      textAlign={textAlign}
      left={left}
      bottom={bottom}
      height={height}
      shadow={shadow}
      display={display}
      align={align}
      just={just}
    >
      {title}
    </StyledButton>
  );
}

export default Button;
