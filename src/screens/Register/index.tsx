import React, {
  FunctionComponent,
  useCallback,
  useState,
  useEffect,
} from 'react';

import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import { InputForm } from '../../components/Form/InputForm';
import { Button } from '../../components/Form/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';

import { CategorySelect } from '../CategorySelect';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypesContainer,
} from './styles';

interface FormData {
  name: string;
  amount: number;
}

const schema = yup.object().shape({
  name: yup.string().required('O nome é obrigatório'),
  amount: yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O preço é obrigatório'),
});

export const Register: FunctionComponent = () => {
  const [transactionType, setTransacionType] = useState<string | null>(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleIncomePress = useCallback(() => {
    setTransacionType('up');
  }, []);

  const handleOutcomePress = useCallback(() => {
    setTransacionType('down');
  }, []);

  const openSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(true);
  }, []);

  const closeSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(false);
  }, []);

  const handleRegister = useCallback(
    async (form: FormData) => {
      if (!transactionType) {
        return Alert.alert('Selecione o tipo da transação');
      }
      if (category.key === 'category') {
        return Alert.alert('Selecione a categoria da transação');
      }

      const newTransaction = {
        ...form,
        transactionType,
        category: category.key,
      };

      try {
        const data = await AsyncStorage.getItem('@gofinances:transactions');
        const transactions = data ? JSON.parse(data) : [];

        await AsyncStorage.setItem(
          '@gofinances:transactions',
          JSON.stringify([...transactions, newTransaction])
        );
      } catch (err) {
        console.log(err);
        Alert.alert('Não foi possivel salvar');
      }
    },
    [transactionType, category]
  );

  const getAsync = async () => {
    const transactions = await AsyncStorage.getItem('@gofinances:transactions');
    console.log(JSON.parse(transactions!));
  };

  useEffect(() => {
    getAsync();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionTypesContainer>
              <TransactionTypeButton
                type="up"
                selected={transactionType ? transactionType === 'up' : null}
                title="Income"
                onPress={handleIncomePress}
              />
              <TransactionTypeButton
                type="down"
                selected={transactionType ? transactionType === 'down' : null}
                title="Outcome"
                onPress={handleOutcomePress}
              />
            </TransactionTypesContainer>
            <CategorySelectButton
              title={category.name}
              onPress={openSelectCategoryModal}
            />
          </Fields>
          <Button onPress={handleSubmit(handleRegister)}>Enviar</Button>
        </Form>

        <Modal animationType="slide" visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={closeSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
};
