import React, { ChangeEvent, useRef } from 'react';

import styled from '@emotion/styled';
import isUndefined from 'lodash/isUndefined';

import ErrorMessage from './error-message';
import Flexbox from './flexbox';
import Select from './select';

import colors from '../shared/colors';
import useFocusEffect from '../shared/focus-effect';

const InputElement = styled.input<{ error?: string }>`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid ${props =>
    isUndefined(props.error) ? colors.grey : colors.error};

  &:not(:only-child) {
    margin-left: 12px;
  }
`;

interface Props {
  label: string;
  value: string;
  onChange(value: string): void;
  shouldFocus: boolean;
  error?: string;
  placeholder?: string;
  options?: string[];
}

function Input({
  label,
  value,
  onChange,
  shouldFocus,
  error,
  placeholder = '홍길동',
  options
}: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  useFocusEffect(shouldFocus, ref);

  return (
    <div>
      <label>
        {label}
        <Flexbox>
          {!isUndefined(options) && (
            <Select
              options={options}
              width={100}
              shouldFocus={false}
              /* +82(대한민국)으로 값 고정 */
              value={options[0]}
              onChange={(value: string) => { alert(value) }}
            />
          )}
          <InputElement
            ref={ref}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            error={error}
          />
        </Flexbox>
      </label>
      {!isUndefined(error) && (
        <ErrorMessage
          align={isUndefined(options) ? 'left' : 'right'}
        >
          {error}
        </ErrorMessage>
      )}
    </div>
  )
}

export default Input;
