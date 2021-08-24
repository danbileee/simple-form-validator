import { Dispatch, SetStateAction, FormEvent } from 'react';

export type ValidateFunc = (value: any, flag?: boolean) => ValidationObj;

export type TravelerValidationSchema = Omit<Record<keyof Traveler, ValidateFunc>, 'id'>;

export type InquiryValidationSchema = Record<keyof Inquiry, ValidateFunc>;

export type TravelerFlag = Omit<Record<keyof Traveler, boolean>, 'id'>;

export type InquiryFlag = Record<keyof Inquiry, boolean>;

export type TravelerErrors = Omit<Record<keyof Traveler, string | undefined>, 'id'>;

export type InquiryErrors = Record<keyof Inquiry, string | undefined>;

export interface ValidationObj {
  value: any;
  error?: string;
}

export interface Colors {
  primary: string;
  error: string;
  text: string;
  white: string;
  grey: string;
}

export interface Traveler {
  id: string;
  firstname: string;
  lastname: string;
  koreanname: string;
  gender: '남' | '여' | undefined;
  birthdate: string;
}

export interface Inquiry {
  arrivalhour: string;
  arrivalminute: string;
  name: string;
  phone: string;
  detail: string;
}

export interface Terms {
  all: boolean;
  required: boolean;
  option: boolean;
}

export interface Errors {
  travelers: TravelerErrors[];
  inquiry: InquiryErrors;
  focusIndex: number;
}

export interface Reservation {
  travelers: Traveler[];
  setTravelers: Dispatch<SetStateAction<Traveler[]>>;
  inquiry: Inquiry;
  setInquiry: Dispatch<SetStateAction<Inquiry>>;
  terms: Terms;
  setTerms: Dispatch<SetStateAction<Terms>>;
  errors: Errors;
  setErrors: Dispatch<SetStateAction<Errors>>;
  submit(e: FormEvent): Promise<void>;
}
