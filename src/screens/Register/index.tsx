import React, { FunctionComponent, useCallback, useState } from 'react';

import { Modal } from 'react-native';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypesContainer,
} from './styles';

export const Register: FunctionComponent = () => {
  const [transactionType, setTransacionType] = useState<string | null>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const handleIncomePress = useCallback(() => {
    setTransacionType('up');
  }, []);

  const handleOutcomePress = useCallback(() => {
    setTransacionType('down');
  }, []);

  const openSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(true);
  }, []);

  const closeSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(false);
  }, []);

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionTypesContainer>
            <TransactionTypeButton
              type="up"
              selected={transactionType ? transactionType === 'up' : null}
              title="Income"
              onPress={handleIncomePress}
            />
            <TransactionTypeButton
              type="down"
              selected={transactionType ? transactionType === 'down' : null}
              title="Outcome"
              onPress={handleOutcomePress}
            />
          </TransactionTypesContainer>
          <CategorySelectButton
            title={category.name}
            onPress={openSelectCategoryModal}
          />
        </Fields>
        <Button>Enviar</Button>
      </Form>

      <Modal animationType="slide" visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={closeSelectCategoryModal}
        />
      </Modal>
    </Container>
  );
};
