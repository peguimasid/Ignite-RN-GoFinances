import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';

import { addMonths, subMonths, isEqual } from 'date-fns';

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
  EmptyStateContainer,
  EmptyStateTitle,
  EmptyStateDescription,
} from './styles';
import { useTheme } from 'styled-components';

import { getMonthAndYear } from '../../utils/formatDate';

export const Resume: FunctionComponent = () => {
  const theme = useTheme();

  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getTransactionsByMonthAndYear = useCallback(
    (transactions: ITransaction[]) => {
      const transactionsFilteredByDate = transactions.filter((transaction) => {
        const transactionMonth = new Date(transaction.date).getMonth();
        const transactionYear = new Date(transaction.date).getFullYear();
        const selectedDateMonth = selectedDate.getMonth();
        const selectedDateYear = selectedDate.getFullYear();

        return (
          isEqual(transactionMonth, selectedDateMonth) &&
          isEqual(transactionYear, selectedDateYear)
        );
      });

      setTransactions(transactionsFilteredByDate || []);
    },
    [selectedDate]
  );

  const getTransactions = useCallback(async () => {
    const data = await AsyncStorage.getItem('@gofinances:transactions');
    const transactions: ITransaction[] = data ? JSON.parse(data) : [];
    const negativeTransactions = transactions.filter(
      (transaction) => transaction.type === 'negative'
    );
    getTransactionsByMonthAndYear(negativeTransactions);
  }, [getTransactionsByMonthAndYear]);

  useEffect(() => {
    getTransactions();
  }, [selectedDate]);

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

      const allCategoriesSum = transactions.reduce((acc, curr) => {
        return acc + curr.amount;
      }, 0);

      const specificCategorySum = transactions
        .filter(({ category }) => category === currentCategory)
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

  const isForwardButtonDisabled = useMemo(() => {
    const nextMonthIsAfterCurrent =
      selectedDate.getMonth() + 1 > new Date().getMonth();
    const nextYearIsAfterCurrent =
      selectedDate.getFullYear() + 1 > new Date().getFullYear();

    const isFutureDate = nextMonthIsAfterCurrent && nextYearIsAfterCurrent;

    return isFutureDate;
  }, [selectedDate]);

  const backOneMonth = useCallback(() => {
    setSelectedDate((currentDate) => subMonths(currentDate, 1));
  }, [selectedDate]);

  const forwardOneMonth = useCallback(() => {
    if (isForwardButtonDisabled) return;
    setSelectedDate((currentDate) => addMonths(currentDate, 1));
  }, [isForwardButtonDisabled]);

  return (
    <Container>
      <Header>
        <Title>Gastos por categoria</Title>
      </Header>

      <SelectMonth>
        <BorderlessButton onPress={backOneMonth}>
          <Feather name="chevron-left" size={24} color={theme.colors.title} />
        </BorderlessButton>
        <MonthText>{getMonthAndYear(selectedDate)}</MonthText>
        <BorderlessButton onPress={forwardOneMonth}>
          <Feather
            name="chevron-right"
            size={24}
            color={
              isForwardButtonDisabled
                ? theme.colors.background
                : theme.colors.title
            }
          />
        </BorderlessButton>
      </SelectMonth>

      {transactions && transactions.length ? (
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
          {categories.map(({ color, key, name }) => {
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
      ) : (
        <EmptyStateContainer>
          <EmptyStateTitle>
            Nada aqui{' '}
            <Feather name="meh" size={25} color={theme.colors.title} />
          </EmptyStateTitle>
          <EmptyStateDescription>
            Tente trocar o mês e achar algum que tenha alguma transação sua!
          </EmptyStateDescription>
        </EmptyStateContainer>
      )}
    </Container>
  );
};
