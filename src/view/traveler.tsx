import React, { useState } from 'react';

import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';

import Fieldset from '../components/fieldset';
import Flexbox from '../components/flexbox';
import Input from '../components/input';
import RadioSelect from '../components/radio-select';

import { useReservationContext } from '../context';

import { travelerValidationSchema as schema } from '../plugin/validation-schema';

import { Traveler, TravelerFlag } from '../shared/types';

interface Props {
  traveler: Traveler;
  index: number;
}

function TravelerComponent({ traveler, index }: Props) {
  const {
    id,
    firstname,
    lastname,
    koreanname,
    gender,
    birthdate
  } = traveler;

  const {
    setTravelers,
    errors,
    setErrors,
  } = useReservationContext();

  const [flag, setFlag] = useState<TravelerFlag>(
    Object.fromEntries(
      Object.entries(
        omit(traveler, ['id']))
        .map(([key]) => ([key, false])
        )
    ) as TravelerFlag
  );

  const handleChange = (
    key: string, id: string
  ) => (
    value: string
  ) => {
      setErrors(old => ({
        ...old,
        travelers: old.travelers.map((t, i) => {
          return index === i
            ? {
              ...t,
              [key]:
                schema[key as keyof TravelerFlag](
                  value, !isEmpty(value)
                ).error
            }
            : t
        })
      }));

      setFlag(old => ({
        ...old,
        [key]: !isEmpty(value),
      }));

      setTravelers(old => old.map((traveler) => {
        return id === traveler.id ? ({
          ...traveler,
          [key]: value,
        }) : traveler
      }));
    }

  const getShouldFocus = (i: number) => {
    return errors.focusIndex === (index * 5) + i;
  }

  const getError = (k: string, v: any) => {
    const key = k as keyof TravelerFlag;

    return errors.travelers[index][key]
      || schema[key](v, flag[key]).error;
  }

  return (
    <Fieldset key={id} title={`여행자 ${id}`}>
      <Flexbox>
        <Input
          label="영문 이름"
          value={firstname}
          onChange={handleChange('firstname', id)}
          placeholder="Gil Dong"
          shouldFocus={getShouldFocus(0)}
          error={getError('firstname', firstname)}
        />
        <Input
          label="영문 성"
          value={lastname}
          onChange={handleChange('lastname', id)}
          placeholder="Hong"
          shouldFocus={getShouldFocus(1)}
          error={getError('lastname', lastname)}
        />
      </Flexbox>
      <Input
        label="한글 이름"
        value={koreanname}
        onChange={handleChange('koreanname', id)}
        shouldFocus={getShouldFocus(2)}
        error={getError('koreanname', koreanname)}
      />
      <RadioSelect
        options={['남', '여']}
        name={`${id}-gender`}
        value={gender}
        onChange={handleChange('gender', id)}
        shouldFocus={getShouldFocus(3)}
        error={getError('gender', gender)}
      />
      <Input
        label="생년월일"
        value={birthdate}
        onChange={handleChange('birthdate', id)}
        placeholder="6자리 숫자로 입력하세요(YYMMDD)"
        shouldFocus={getShouldFocus(4)}
        error={getError('birthdate', birthdate)}
      />
    </Fieldset>
  )
}

export default TravelerComponent;
