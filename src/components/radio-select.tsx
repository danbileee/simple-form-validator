import React, { useRef } from 'react';

import styled from '@emotion/styled';
import isUndefined from 'lodash/isUndefined';

import ErrorMessage from './error-message';

import colors from '../shared/colors';
import useFocusEffect from '../shared/focus-effect';

const Container = styled.div`
  display: flex;

  & > *:not(:first-child) {
    margin-left: -1px;
  }
`;

const InputContainer = styled.div<{ error?: string }>`
  position: relative;
  flex: 1;

  &:first-of-type {
    & > label {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }

  &:last-of-type {
    & > label {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }

  input {
    &:checked,
    &:not(:checked) {
      position: absolute;
      left: -9999px;
    }
  
    &:checked + label,
    &:not(:checked) + label {
      cursor: pointer;
      position: relative;
      display: block;
      width: 100%;
      text-align: center;
      background-color: ${colors.white};
      padding: 8px;
      border: 1px solid ${props =>
    isUndefined(props.error) ? colors.grey : colors.error};
      transition: all ease-in-out 0.2s;
    }

    &:checked + label {
      background-color: ${colors.grey};
    }

    &:not(:checked) + label {
      background-color: ${colors.white};
    }
  }
`;

interface Props {
  options: string[];
  name: string;
  value?: string;
  onChange(value: string): void;
  shouldFocus: boolean;
  error?: string;
}

function RadioSelect({
  options,
  name,
  value,
  onChange,
  shouldFocus,
  error,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);

  useFocusEffect(shouldFocus, ref);

  return (
    <div>
      <Container>
        {options.map(option => (
          <InputContainer key={option} error={error}>
            <input
              ref={ref}
              type="radio"
              id={`${name}-${option}`}
              name={name}
              value={value}
              onChange={() => onChange(option)}
            />
            <label htmlFor={`${name}-${option}`}>
              {option}
            </label>
          </InputContainer>
        ))}
      </Container>
      {!isUndefined(error) && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
    </div>
  )
}

export default RadioSelect;
