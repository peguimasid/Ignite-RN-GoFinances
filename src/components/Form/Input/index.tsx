import React, { FunctionComponent } from "react";
import { TextInputProps } from "react-native";

import { Container } from "./styles";

export const Input: FunctionComponent<TextInputProps> = ({ ...rest }) => {
  return <Container {...rest} />;
};
