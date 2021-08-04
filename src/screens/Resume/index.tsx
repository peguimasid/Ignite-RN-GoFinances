import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { categories } from '../../utils/categories';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HistoryCard from '../../components/HistoryCard';
import { Container, Header, Title } from './styles';
import { ITransaction } from '../../components/TransactionCard';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

export const Resume: FunctionComponent = () => {
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);

  const getTransactions = useCallback(async () => {
    const data = await AsyncStorage.getItem('@gofinances:transactions');
    const transactions = data ? JSON.parse(data) : [];
    setTransactions(transactions);
  }, []);

  useEffect(() => {
    getTransactions();
  }, []);

  const getAmount = useCallback(
    (currentCategory) => {
      if (!transactions) return;
      return transactions
        .filter(
          ({ category, type }) =>
            category === currentCategory && type === 'negative'
        )
        .reduce((acc, curr) => acc + curr.amount, 0);
    },
    [transactions]
  );

  useFocusEffect(
    useCallback(() => {
      getTransactions();
    }, [])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        {transactions &&
          categories.map(({ color, key, name }) => {
            if (getAmount(key)) {
              return (
                <HistoryCard
                  amount={getAmount(key) || 0}
                  color={color}
                  title={name}
                  key={key}
                />
              );
            }
          })}
      </ScrollView>
    </Container>
  );
};
