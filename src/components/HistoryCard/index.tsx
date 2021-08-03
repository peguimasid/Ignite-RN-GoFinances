import React, { FunctionComponent } from 'react';
import { formatPrice } from '../../utils/formatPrice';

import { Container, Title, Amount } from './styles';

interface HistoryCardProps {
  color: string;
  title: string;
  amount: number;
}

const HistoryCard: FunctionComponent<HistoryCardProps> = ({
  color,
  title,
  amount,
}) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{formatPrice(amount)}</Amount>
    </Container>
  );
};

export default HistoryCard;
