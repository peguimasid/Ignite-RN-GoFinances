import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

interface SelectedProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background: ${({ theme }) => theme.colors.primary};
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`;

export const Category = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;

  padding: ${RFValue(15)}px;
`;

export const Icon = styled(Feather)<SelectedProps>`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.title};
  margin-right: ${RFValue(16)}px;

  ${({ selected }) =>
    selected &&
    css`
      color: ${({ theme }) => theme.colors.secondary};
    `}
`;

export const Label = styled.Text<SelectedProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};

  ${({ selected }) =>
    selected &&
    css`
      color: ${({ theme }) => theme.colors.secondary};
    `}
`;

export const HorizontalRow = styled.View`
  width: 100%;
  height: 1px;
  margin-left: ${RFValue(55)}px;
  background: ${({ theme }) => theme.colors.text};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;
