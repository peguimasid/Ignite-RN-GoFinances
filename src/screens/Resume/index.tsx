import React, { FunctionComponent } from 'react';
import HistoryCard from '../../components/HistoryCard';

import { Container, Header, Title } from './styles';

export const Resume: FunctionComponent = () => {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <HistoryCard title="Casa" amount={550} color="red" />
    </Container>
  );
};
