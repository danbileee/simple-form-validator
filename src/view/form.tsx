import React from 'react';

import styled from '@emotion/styled';

import Inquiry from './inquiry';
import Terms from './terms';
import Traveler from './traveler';

import { useReservationContext } from '../context';

import colors from '../shared/colors';

const Form = styled.form`
  max-width: 375px;
  color: ${colors.text};
  padding: 20px;
  margin: 100px auto;
`;

const Button = styled.button`
  width: 100%;
  color: ${colors.white};
  background-color: ${colors.primary};
  padding: 12px;
  opacity: 1;
  transition: all ease-in-out 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

function FormComponent() {
  const { submit, travelers, terms } = useReservationContext();

  return (
    <Form onSubmit={submit}>
      {travelers.map((traveler, index) => (
        <Traveler
          key={traveler.id}
          traveler={traveler}
          index={index}
        />
      ))}
      <Inquiry />
      <Terms />
      <Button disabled={!terms.required}>
        결제하기
      </Button>
    </Form>
  )
}

export default FormComponent;
