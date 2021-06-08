import React, { FunctionComponent } from 'react';

import { Input } from '../../components/Form/Input';
import { Button } from '../../components/Form/Button';

import { Container, Header, Title, Form, Fields } from './styles';

export const Register: FunctionComponent = () => {
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
        </Fields>
        <Button>Enviar</Button>
      </Form>
    </Container>
  );
};
