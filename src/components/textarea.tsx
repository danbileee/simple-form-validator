import React, { ChangeEvent, useRef } from 'react';

import styled from '@emotion/styled';
import isUndefined from 'lodash/isUndefined';

import ErrorMessage from './error-message';

import colors from '../shared/colors';
import useFocusEffect from '../shared/focus-effect';

const TextareaElement = styled.textarea<{
  error?: string
}>`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid ${props =>
    isUndefined(props.error) ? colors.grey : colors.error};
`;

interface Props {
  label: string;
  value: string;
  onChange(value: string): void;
  shouldFocus: boolean;
  error?: string;
  placeholder?: string;
}

function Textarea({
  label,
  value,
  onChange,
  shouldFocus,
  error,
  placeholder = '답변을 입력하세요.'
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }

  useFocusEffect(shouldFocus, ref);

  return (
    <div>
      <label>
        {label}
        <TextareaElement
          ref={ref}
          value={value}
          onChange={handleChange}
          error={error}
          placeholder={placeholder}
        />
      </label>
      {!isUndefined(error) && (
        <ErrorMessage>{error}</ErrorMessage>
      )}
    </div>
  )
}

export default Textarea;
