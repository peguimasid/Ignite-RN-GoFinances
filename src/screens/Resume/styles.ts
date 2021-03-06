import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const GraphicContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const SelectMonth = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 15px 0;
  padding: 0 24px;
`;

export const MonthText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const EmptyStateContainer = styled.View`
  width: 100%;
  height: 100%;

  align-items: center;

  padding: 0 20px;
  margin-top: 50%;
`;

export const EmptyStateTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;

export const EmptyStateDescription = styled.Text`
  margin-top: ${RFValue(15)}px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
`;
