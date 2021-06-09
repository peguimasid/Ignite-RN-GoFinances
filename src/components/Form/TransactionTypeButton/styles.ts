import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

interface TransactionProps {
  type: 'up' | 'down';
  selected: boolean | null;
}

export const Container = styled(TouchableOpacity)<TransactionProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 18px 0;

  border-width: ${({ selected }) => (selected ? 0 : 1.5)}px;
  border-style: solid;
  border-color: rgba(150, 156, 178, 0.2);
  border-radius: 5px;

  ${({ selected, type, theme }) =>
    selected !== null &&
    css`
      border-color: transparent;
    `}

  ${({ selected, type, theme }) =>
    selected &&
    type === 'down' &&
    css`
      background: rgba(232, 63, 91, 0.1);
      border: 0;
    `}

  ${({ selected, type, theme }) =>
    selected &&
    type === 'up' &&
    css`
      background: rgba(18, 164, 64, 0.1);
      border: 0;
    `}
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather)<TransactionProps>`
  font-size: ${RFValue(20)}px;
  margin-right: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};
`;
