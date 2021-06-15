import React, { FunctionComponent } from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Form/Button';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Label,
  HorizontalRow,
  Footer,
} from './styles';

interface ICategory {
  key: string;
  name: string;
}

interface CategorySelectProps {
  category: string;
  setCategory: (category: ICategory) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect: FunctionComponent<CategorySelectProps> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category>
            <Icon name={item.icon} />
            <Label>{item.name}</Label>
          </Category>
        )}
        ItemSeparatorComponent={() => <HorizontalRow />}
      />

      <Footer>
        <Button activeOpacity={0.7}>Selecionar</Button>
      </Footer>
    </Container>
  );
};
