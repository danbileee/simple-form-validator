import React, { ReactNode, ReactNodeArray } from 'react';

import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;

  & > *:not(:last-of-type) {
    margin-right: 12px;
  }
`;

interface Props {
  children: ReactNode | ReactNodeArray;
}

function Flexbox({ children }: Props) {
  return (
    <Container>
      {children}
    </Container>
  )
}

export default Flexbox;
