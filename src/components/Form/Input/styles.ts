import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
  width: 100%;
  background: ${({ theme }) => theme.colors.shape};
  padding: 18px 16px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 8px;
`;
