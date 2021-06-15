import React, { FunctionComponent } from 'react';
import { useCallback } from 'react';
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
  category: ICategory;
  setCategory: (category: ICategory) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect: FunctionComponent<CategorySelectProps> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  const handleChooseCategory = useCallback((item: ICategory) => {
    setCategory(item);
  }, []);

  const isSelected = useCallback(
    (item: ICategory) => {
      return item.name === category.name;
    },
    [category]
  );

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
          <Category onPress={() => handleChooseCategory(item)}>
            <Icon name={item.icon} selected={isSelected(item)} />
            <Label selected={isSelected(item)}>{item.name}</Label>
          </Category>
        )}
        ItemSeparatorComponent={() => <HorizontalRow />}
      />

      <Footer>
        <Button activeOpacity={0.7} onPress={closeSelectCategory}>
          Selecionar
        </Button>
      </Footer>
    </Container>
  );
};
