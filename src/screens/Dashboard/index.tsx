import React, { FunctionComponent } from "react";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  PowerIcon,
} from "./styles";

export const Dashboard: FunctionComponent = () => {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/54289589?v=4",
              }}
            />
            <User>
              <UserGretting>Olá,</UserGretting>
              <UserName>Guilhermo</UserName>
            </User>
          </UserInfo>
          <PowerIcon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
};
