import React, { FunctionComponent } from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Category, Icon } from './styles';

interface CategorySelectProps extends RectButtonProps {
  title: string;
}

export const CategorySelectButton: FunctionComponent<CategorySelectProps> = ({
  title,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
