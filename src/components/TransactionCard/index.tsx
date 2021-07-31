import React, { FunctionComponent, useMemo } from 'react';
import { categories } from '../../utils/categories';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

export interface TransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  date: string;
  category: string;
}

interface CardProps {
  data: TransactionCardProps;
}

export const TransactionCard: FunctionComponent<CardProps> = ({ data }) => {
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
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={icon} />
          <CategoryName>{name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};
