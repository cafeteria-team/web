import styled from "styled-components";
import styles from "styled-components";
import {
  border,
  color,
  compose,
  flexbox,
  layout,
  position,
  shadow,
  space,
  typography,
} from "styled-system";

export const Div = styled("div")(
  compose(border, space, layout, typography, color, position, shadow, flexbox)
);

export const Flex = styled(Div)`
  display: flex;
`;

export const Button = styled("button")(
  compose(border, space, layout, typography, color, position, shadow, flexbox)
);

export const Heading = styled.h1`
  ${typography}
  ${color}
  ${space}
	${layout}
`;

export const Input = styled("input")(
  compose(border, space, layout, typography, color, position, shadow, flexbox)
);

export const Form = styled("form")(
  compose(border, space, layout, typography, color, position, shadow, flexbox)
);

export const P = styled("p")(
  compose(border, space, layout, typography, color, position, shadow)
);
