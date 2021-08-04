import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import { RFValue } from 'react-native-responsive-fontsize';

import { useFocusEffect } from '@react-navigation/native';

import { categories } from '../../utils/categories';

import AsyncStorage from '@react-native-async-storage/async-storage';

import HistoryCard from '../../components/HistoryCard';
import { ScrollView } from 'react-native-gesture-handler';
import { VictoryPie } from 'victory-native';

import { ITransaction } from '../../components/TransactionCard';

import { Container, Header, Title, GraphicContainer } from './styles';

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

  const getPercentage = useCallback(
    (currentCategory) => {
      if (!transactions) return;

      const allCategoriesSum = transactions
        .filter(({ type }) => type === 'negative')
        .reduce((acc, curr) => acc + curr.amount, 0);

      const specificCategorySum = transactions
        .filter(
          ({ category, type }) =>
            category === currentCategory && type === 'negative'
        )
        .reduce((acc, curr) => acc + curr.amount, 0);

      return `${Math.round((specificCategorySum / allCategoriesSum) * 100)}%`;
    },
    [transactions]
  );

  const { graphicData, graphicColors } = useMemo(() => {
    const filledCategories = categories.filter(({ key }) => getAmount(key));

    return {
      graphicData: filledCategories.map(({ key }) => {
        return { percentage: getPercentage(key), amount: getAmount(key) };
      }),
      graphicColors: filledCategories.map(({ color }) => color),
    };
  }, [transactions]);

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
      <GraphicContainer>
        <VictoryPie
          data={graphicData}
          colorScale={graphicColors}
          x="percentage"
          y="amount"
          labelRadius={80}
          style={{
            labels: {
              fill: 'white',
              fontSize: RFValue(15),
              fontWeight: 'bold',
            },
          }}
        />
      </GraphicContainer>
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
