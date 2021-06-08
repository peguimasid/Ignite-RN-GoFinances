import styled from 'styled-components/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: ${RFValue(56)}px;
  border-radius: 5px;
  background: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.success};
  margin-right: 14px;
`;
