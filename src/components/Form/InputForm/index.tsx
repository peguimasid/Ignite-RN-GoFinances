import React, { FunctionComponent } from 'react';
import { TextInputProps } from 'react-native';

import { Control, Controller } from 'react-hook-form';

import { Input } from '../Input';

import { Container } from './styles';

interface InputFormProps extends TextInputProps {
  control: Control;
  name: string;
}

export const InputForm: FunctionComponent<InputFormProps> = ({
  control,
  name,
  ...rest
}) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      ></Controller>
    </Container>
  );
};