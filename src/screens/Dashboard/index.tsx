import React, { FunctionComponent, useState } from 'react';
import { useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard';
import {
  ITransaction,
  TransactionCard,
} from '../../components/TransactionCard';

import { BorderlessButton } from 'react-native-gesture-handler';

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

export const Dashboard: FunctionComponent = () => {
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);

  const getTransactions = useCallback(async () => {
    const data = await AsyncStorage.getItem('@gofinances:transactions');
    const transactions = data ? JSON.parse(data) : [];
    setTransactions(transactions);
  }, []);

  const handleDeleteTransaction = useCallback(async (transactionId) => {
    const transactionsWithoutDeleted = transactions!.filter(
      (transaction) => transaction.id !== transactionId
    );

    await AsyncStorage.setItem(
      '@gofinances:transactions',
      JSON.stringify(transactionsWithoutDeleted)
    );
    setTransactions(transactionsWithoutDeleted);
  }, []);

  useEffect(() => {
    getTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getTransactions();
    }, [])
  );

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
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
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
