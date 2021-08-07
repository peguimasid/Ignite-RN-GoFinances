import React, { FunctionComponent, useState } from 'react';
import { useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard';
import {
  ITransaction,
  TransactionCard,
} from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  LogoutButton,
  PowerIcon,
  HighlightCards,
  Transactions,
  Title,
  TransactionHeader,
  TransactionsList,
} from './styles';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDate';

export const Dashboard: FunctionComponent = () => {
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);

  const getTransactions = useCallback(async () => {
    const data = await AsyncStorage.getItem('@gofinances:transactions');
    const transactions = data ? JSON.parse(data) : [];
    setTransactions(transactions);
  }, []);

  const handleDeleteTransaction = useCallback(
    async (transactionId) => {
      const transactionsWithoutDeleted = transactions!.filter(
        (transaction) => transaction.id !== transactionId
      );

      await AsyncStorage.setItem(
        '@gofinances:transactions',
        JSON.stringify(transactionsWithoutDeleted)
      );
      setTransactions(transactionsWithoutDeleted);
    },
    [transactions]
  );

  useEffect(() => {
    getTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getTransactions();
    }, [])
  );

  const { received, lastReceived, spend, lastSpend } = useMemo(() => {
    if (!transactions) {
      return {
        spend: 0,
        received: 0,
      };
    }

    const received = transactions
      .filter((transaction) => transaction.type === 'positive')
      .reduce((acc, curr) => {
        acc += curr.amount;
        return acc;
      }, 0);

    const spend = transactions
      .filter((transaction) => transaction.type === 'negative')
      .reduce((acc, curr) => {
        acc += curr.amount;
        return acc;
      }, 0);

    const lastReceived = Math.max(
      ...transactions
        .filter((t) => t.type === 'positive')
        .map((transaction) => new Date(transaction.date).getTime()),
      0
    );

    const lastSpend = Math.max(
      ...transactions
        .filter((t) => t.type === 'negative')
        .map((transaction) => new Date(transaction.date).getTime()),
      0
    );

    return {
      spend,
      received,
      lastReceived: formatDate({ date: lastReceived, type: 'long' }),
      lastSpend: formatDate({ date: lastSpend, type: 'long' }),
    };
  }, [transactions]);

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/54289589?v=4',
              }}
            />
            <User>
              <UserGretting>Olá,</UserGretting>
              <UserName>Guilhermo</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => console.log('Sair')}>
            <PowerIcon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount={formatPrice(received)}
          lastTransaction={
            transactions && transactions.length
              ? `Última entrada dia ${lastReceived}`
              : ''
          }
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount={formatPrice(spend)}
          lastTransaction={
            transactions && transactions.length
              ? `Última saida dia ${lastSpend}`
              : ''
          }
        />
        <HighlightCard
          type="total"
          title="Total"
          amount={formatPrice(received - spend)}
          lastTransaction=""
        />
      </HighlightCards>
      <Transactions>
        <TransactionHeader>
          <Title>Listagem</Title>
        </TransactionHeader>
        <TransactionsList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionCard
              data={item}
              onDeleteTransaction={handleDeleteTransaction}
            />
          )}
        />
      </Transactions>
    </Container>
  );
};
