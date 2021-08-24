import React, { ChangeEvent, useRef } from 'react';

import styled from '@emotion/styled';
import isUndefined from 'lodash/isUndefined';

import ErrorMessage from './error-message';

import colors from '../shared/colors';
import useFocusEffect from '../shared/focus-effect';

const Container = styled.div<{ width?: number }>`
  width: ${props =>
    isUndefined(props.width) ? '100%' : `${props.width}px`};
`;

const SelectElement = styled.select<{
  error?: string;
}>`
  width: 100%;
  font-size: 14px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${props =>
    isUndefined(props.error) ? colors.grey : colors.error};
`;

interface Props {
  options: string[];
  value: string;
  onChange(value: string): void;
  shouldFocus: boolean;
  error?: string;
  width?: number;
  placeholder?: string;
}

function Select({
  options,
  value,
  onChange,
  shouldFocus,
  error,
  width,
  placeholder
}: Props) {
  const ref = useRef<HTMLSelectElement>(null);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  }

  useFocusEffect(shouldFocus, ref);

  return (
    <Container width={width}>
      <SelectElement
        ref={ref}
        error={error}
        value={value}
        onChange={handleChange}
      >
        {!isUndefined(placeholder) && (
          <option
            value=""
            disabled
            hidden
          >
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </SelectElement>
      {!isUndefined(error) && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
    </Container>
  )
}

export default Select;
