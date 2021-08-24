import React, {
  createContext,
  FormEvent,
  ReactNode,
  ReactNodeArray,
  useContext,
  useState
} from 'react';

import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';

import {
  travelerValidationSchema,
  inquiryValidationSchema,
} from '../plugin/validation-schema';

import {
  Reservation,
  Traveler,
  Inquiry,
  Terms,
  Errors,
  TravelerErrors,
  InquiryErrors,
} from '../shared/types';

const ReservationContext = createContext<Reservation | null>(null);

function ReservationContextProvider({
  children
}: {
  children: ReactNode | ReactNodeArray
}) {
  const [travelers, setTravelers] = useState<Traveler[]>(
    [0, 1].map(index => ({
      id: `${index + 1}`,
      firstname: '',
      lastname: '',
      koreanname: '',
      gender: undefined,
      birthdate: '',
    }))
  );
  const [inquiry, setInquiry] = useState<Inquiry>({
    arrivalhour: '',
    arrivalminute: '',
    name: '',
    phone: '',
    detail: '',
  });
  const [terms, setTerms] = useState<Terms>({
    all: false,
    required: false,
    option: false,
  });

  const initialErrorState = {
    travelers: travelers.map(t => {
      return Object.fromEntries(
        Object.entries(omit(t, ['id'])).map(([key]) => ([key, undefined]))
      )
    }) as TravelerErrors[],
    inquiry: Object.fromEntries(
      Object.entries(inquiry).map(([key]) => ([key, undefined]))
    ) as InquiryErrors,
    focusIndex: -1,
  };

  const [errors, setErrors] = useState<Errors>(initialErrorState);

  const validateTravelers = Promise.resolve(
    travelers.map(t => {
      return Object.fromEntries(
        Object.entries(travelerValidationSchema)
          .map(
            ([key, func]) =>
              ([key, func(t[key as keyof Traveler], true).error])
          )
      )
    })
  );

  const validateInquiry = Promise.resolve(
    Object.fromEntries(
      Object.entries(inquiryValidationSchema)
        .map(
          ([key, func]) =>
            ([key, func(inquiry[key as keyof Inquiry], true).error])
        )
    )
  );

  const submit = async (e: FormEvent) => {
    e.preventDefault();

    setErrors(old => ({
      ...old,
      focusIndex: -1,
    }));

    const [travelerErrors, inquiryErrors] = await Promise.all([
      validateTravelers,
      validateInquiry,
    ]);

    const flattenErrors = [
      ...travelerErrors.map(t => Object.values(t)),
      Object.values(inquiryErrors)
    ].flat();

    const totalErrors = flattenErrors.filter(v => !isUndefined(v));

    if (totalErrors.length === 0) {
      alert('예약이 완료 되었습니다.');
    } else {
      setErrors({
        travelers: travelerErrors as TravelerErrors[],
        inquiry: inquiryErrors as InquiryErrors,
        focusIndex: flattenErrors.findIndex(v => !isUndefined(v)),
      });
    }
  };

  return (
    <ReservationContext.Provider value={{
      travelers,
      setTravelers,
      inquiry,
      setInquiry,
      terms,
      setTerms,
      errors,
      setErrors,
      submit
    }}>
      {children}
    </ReservationContext.Provider>
  )
}

export function useReservationContext() {
  const state = useContext(ReservationContext);

  if (state == null) {
    throw Error('Context should not be null.')
  }

  return state;
}

export default ReservationContextProvider;