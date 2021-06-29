import React, { FunctionComponent } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps {
  children: string;
  onPress(): void;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onPress,
  ...rest
}) => {
  return (
    <Container onPress={onPress} {...rest}>
      <Title>{children}</Title>
    </Container>
  );
};
