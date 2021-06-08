import React, { FunctionComponent } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title, Icon } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  children: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Title>{children}</Title>
    </Container>
  );
};
