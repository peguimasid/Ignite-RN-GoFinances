import React, { FunctionComponent, useMemo } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { categories } from '../../utils/categories';

import { formatDate } from '../../utils/formatDate';
import { formatPrice } from '../../utils/formatPrice';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
  TopWrapper,
  DeleteIcon,
} from './styles';

export interface ITransaction {
  id: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  type: 'positive' | 'negative';
}

interface CardProps {
  data: ITransaction;
  onDeleteTransaction(transactionId: string): void;
}

export const TransactionCard: FunctionComponent<CardProps> = ({
  data,
  onDeleteTransaction,
}) => {
  const { icon, name } = useMemo(() => {
    const category = categories.find(
      (category) => category.key === data.category
    );

    return {
      icon: category!.icon,
      name: category!.name,
    };
  }, []);

  return (
    <Container>
      <TopWrapper>
        <Title>{data.name}</Title>
        <BorderlessButton onPress={() => onDeleteTransaction(data.id)}>
          <DeleteIcon name="trash-2" />
        </BorderlessButton>
      </TopWrapper>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {formatPrice(data.amount)}
      </Amount>
      <Footer>
        <Category>
          <Icon name={icon} />
          <CategoryName>{name}</CategoryName>
        </Category>
        <Date>{formatDate({ date: data.date })}</Date>
      </Footer>
    </Container>
  );
};
