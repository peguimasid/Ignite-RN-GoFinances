import React, { FunctionComponent, useMemo } from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

interface CardProps {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

export const HighlightCard: FunctionComponent<CardProps> = ({
  title,
  amount,
  lastTransaction,
  type,
}) => {
  const iconName = useMemo(() => {
    const icons = {
      up: "arrow-up-circle",
      down: "arrow-down-circle",
      total: "dollar-sign",
    };

    return icons[type];
  }, [type]);

  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={iconName} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
};
