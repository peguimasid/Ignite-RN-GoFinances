import React, { FunctionComponent, useMemo } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title, Icon } from './styles';

interface TransactionButtonProps extends TouchableOpacityProps {
  title: string;
  type: 'positive' | 'negative';
  onPress(): void;
  selected: boolean | null;
}

export const TransactionTypeButton: FunctionComponent<TransactionButtonProps> =
  ({ type, title, selected, onPress, ...rest }) => {
    const iconName = useMemo(() => {
      const icons = {
        positive: 'arrow-up-circle',
        negative: 'arrow-down-circle',
      };

      return icons[type];
    }, [type]);

    return (
      <Container onPress={onPress} selected={selected} type={type} {...rest}>
        <Icon name={iconName} type={type} />
        <Title>{title}</Title>
      </Container>
    );
  };
