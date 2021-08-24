import React, { useEffect } from 'react';

import styled from '@emotion/styled';

import Checkbox from '../components/checkbox';

import { useReservationContext } from '../context';

import colors from '../shared/colors';

const Container = styled.div`
  padding: 20px;

  & > *:first-child {
    margin-bottom: 20px;
  }
`;

const InputContainer = styled.div`
  padding: 12px;
  border: 1px solid ${colors.grey};
  margin: 12px 0;

  & > *:not(:last-child) {
    margin-bottom: 8px;
  }
`;

function Terms() {
  const { terms, setTerms } = useReservationContext();
  const { all, required, option } = terms;

  const handleChange = (key: string) => (value: boolean) => {
    setTerms(old => ({
      ...old,
      [key]: value,
    }));
  }

  useEffect(() => {
    setTerms(old => ({
      ...old,
      required: all,
      option: all,
    }));
  }, [all, setTerms]);

  return (
    <Container>
      <h4>약관 동의</h4>
      <Checkbox
        label="전체 약관 동의"
        value={all}
        onChange={handleChange('all')}
      />
      <InputContainer>
        <Checkbox
          label="여행자 약관 동의(필수)"
          value={required}
          onChange={handleChange('required')}
        />
        <Checkbox
          label="특가 항공권 및 할인 혜택 안내 동의(선택)"
          value={option}
          onChange={handleChange('option')}
        />
      </InputContainer>
    </Container>
  )
}

export default Terms;
