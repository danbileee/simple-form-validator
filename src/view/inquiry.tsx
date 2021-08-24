import React, { useState } from 'react';

import isEmpty from 'lodash/isEmpty';
import range from 'lodash/range';

import Fieldset from '../components/fieldset';
import Flexbox from '../components/flexbox';
import Input from '../components/input';
import Select from '../components/select';
import Textarea from '../components/textarea';

import { useReservationContext } from '../context';

import { inquiryValidationSchema as schema } from '../plugin/validation-schema';

import { InquiryFlag } from '../shared/types';

function Inquiry() {
  const {
    inquiry,
    setInquiry,
    errors,
    setErrors,
    travelers,
  } = useReservationContext();

  const [flag, setFlag] = useState<InquiryFlag>(
    Object.fromEntries(
      Object.entries(inquiry).map(([key]) => ([key, false]))
    ) as InquiryFlag
  );

  const {
    arrivalhour,
    arrivalminute,
    name,
    phone,
    detail
  } = inquiry;

  const handleChange = (key: string) => (value: string) => {
    setErrors(old => ({
      ...old,
      inquiry: {
        ...old.inquiry,
        [key]:
          schema[key as keyof InquiryFlag](
            value, !isEmpty(value)
          ).error,
      }
    }));

    setFlag(old => ({
      ...old,
      [key]: !isEmpty(value),
    }))

    setInquiry(old => ({
      ...old,
      [key]: value,
    }));
  }

  const getShouldFocus = (i: number) => {
    return errors.focusIndex === (travelers.length * 5) + i;
  }

  const getError = (k: string, v: any) => {
    const key = k as keyof InquiryFlag;

    return errors.inquiry[key]
      || schema[key](v, flag[key]).error;
  }

  return (
    <>
      <Fieldset title="숙소 도착 예정 시간">
        <Flexbox>
          <Select
            options={range(0, 24).map(hour => `${hour}시`)}
            placeholder="시"
            value={arrivalhour}
            onChange={handleChange('arrivalhour')}
            shouldFocus={getShouldFocus(0)}
            error={getError('arrivalhour', arrivalhour)}
          />
          <Select
            options={range(0, 60).map(minute => `${minute}분`)}
            placeholder="분"
            value={arrivalminute}
            onChange={handleChange('arrivalminute')}
            shouldFocus={getShouldFocus(1)}
            error={getError('arrivalminute', arrivalminute)}
          />
        </Flexbox>
      </Fieldset>
      <Fieldset title="상세 핸드폰 정보">
        <Input
          label="사용자 이름"
          placeholder="Hong Gil Dong"
          value={name}
          onChange={handleChange('name')}
          shouldFocus={getShouldFocus(2)}
          error={getError('name', name)}
        />
        <Input
          placeholder="'-' 없이 적어주세요."
          label="핸드폰 번호"
          value={phone}
          onChange={handleChange('phone')}
          options={['+82(대한민국)']}
          shouldFocus={getShouldFocus(3)}
          error={getError('phone', phone)}
        />
      </Fieldset>
      <Fieldset title="기타 예약 정보">
        <Textarea
          label="오시는 교통 수단을 적어주세요."
          value={detail}
          onChange={handleChange('detail')}
          shouldFocus={getShouldFocus(4)}
          error={getError('detail', detail)}
        />
      </Fieldset>
    </>
  )
}

export default Inquiry;
