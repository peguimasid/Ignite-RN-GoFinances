import React, { FunctionComponent, useMemo } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title, Icon } from './styles';

interface TransactionButtonProps extends TouchableOpacityProps {
  title: string;
  type: 'up' | 'down';
  onPress(): void;
  selected: boolean | null;
}

export const TransactionTypeButton: FunctionComponent<TransactionButtonProps> =
  ({ type, title, selected, onPress, ...rest }) => {
    const iconName = useMemo(() => {
      const icons = {
        up: 'arrow-up-circle',
        down: 'arrow-down-circle',
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
