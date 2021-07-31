import React, { FunctionComponent, useState } from 'react';
import { useCallback } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
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

interface ITransaction {
  id: string;
  name: string;
  category: string;
  date: Date;
  amount: number;
  type: string;
}

export interface ListProps extends TransactionCardProps {
  id: string;
}

export const Dashboard: FunctionComponent = () => {
  const [transactions, setTransactions] = useState<ListProps[] | null>(null);

  const getTransactions = useCallback(async () => {
    const data = await AsyncStorage.getItem('@gofinances:transactions');
    const transactions = data ? JSON.parse(data) : [];
    const transactionsFormatted: ListProps[] = transactions.map(
      ({ id, name, date, amount, category, type }: ITransaction) => {
        return {
          id,
          name,
          category,
          type,
          amount: Number(amount).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          date: Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).format(new Date(date)),
        };
      }
    );

    setTransactions(transactionsFormatted);
  }, []);

  useEffect(() => {
    getTransactions();
    // async function ok() {
    //   await AsyncStorage.removeItem('@gofinances:transactions');
    // }
    // ok();
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
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
