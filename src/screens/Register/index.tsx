import React, { FunctionComponent, useCallback, useState } from 'react';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypesContainer,
} from './styles';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

export const Register: FunctionComponent = () => {
  const [transactionType, setTransacionType] = useState<string | null>(null);

  const handleIncomePress = useCallback(() => {
    setTransacionType('up');
  }, []);

  const handleOutcomePress = useCallback(() => {
    setTransacionType('down');
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
        </Fields>
        <Button>Enviar</Button>
      </Form>
    </Container>
  );
};
