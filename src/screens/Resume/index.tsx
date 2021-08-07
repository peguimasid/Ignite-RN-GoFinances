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

import { Feather } from '@expo/vector-icons';
import { BorderlessButton, ScrollView } from 'react-native-gesture-handler';
import { VictoryPie } from 'victory-native';

import { ITransaction } from '../../components/TransactionCard';

import {
  Container,
  Header,
  Title,
  GraphicContainer,
  SelectMonth,
  MonthText,
} from './styles';
import { useTheme } from 'styled-components';

export const Resume: FunctionComponent = () => {
  const theme = useTheme();

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
        <Title>Gastos por categoria</Title>
      </Header>

      <SelectMonth>
        <BorderlessButton onPress={() => console.log('mes anterior')}>
          <Feather name="chevron-left" size={24} color={theme.colors.title} />
        </BorderlessButton>
        <MonthText>maio, 2021</MonthText>
        <BorderlessButton onPress={() => console.log('proximo mes')}>
          <Feather name="chevron-right" size={24} color={theme.colors.title} />
        </BorderlessButton>
      </SelectMonth>

      <ScrollView
        contentContainerStyle={{ padding: 24 }}
        showsVerticalScrollIndicator={false}
      >
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
