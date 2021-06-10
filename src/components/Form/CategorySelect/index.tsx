import React, { FunctionComponent } from 'react';

import { Container, Category, Icon } from './styles';

interface CategorySelectProps {
  title: string;
}

export const CategorySelect: FunctionComponent<CategorySelectProps> = ({
  title,
}) => {
  return (
    <Container>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
};
