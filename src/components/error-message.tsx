import React from 'react';

import styled from '@emotion/styled';

import colors from '../shared/colors';

type Align = 'left' | 'right';

const Message = styled.p<{ align: Align }>`
  color: ${colors.error};
  font-size: 12px;
  text-align: ${props => props.align};
  margin-top: 8px;
`;

function ErrorMessage({
  align = 'left',
  children
}: {
  align?: Align,
  children: string
}) {
  return (
    <Message align={align}>{children}</Message>
  );
}

export default ErrorMessage;
