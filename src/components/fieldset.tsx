import React, { ReactNode, ReactNodeArray } from 'react';

import styled from '@emotion/styled';

import colors from '../shared/colors';

const FieldsetElement = styled.fieldset`
  padding: 20px;
  border: none;
  border-bottom: 1px solid ${colors.grey};

  &:not(:last-of-type) {
    margin-bottom: 20px;
  }

  & > *:not(:first-child) {
    margin-bottom: 20px;
  }
`;

const Legend = styled.legend`
  font-size: 16px;
  font-weight: bold;
`;

interface Props {
  title: string;
  children: ReactNode | ReactNodeArray;
}

function Fieldset({ title, children }: Props) {
  return (
    <FieldsetElement>
      <Legend>{title}</Legend>
      {children}
    </FieldsetElement>
  )
}

export default Fieldset;
