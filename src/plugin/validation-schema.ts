import Validation from './validation';

import { TravelerValidationSchema, InquiryValidationSchema } from '../shared/types';

function validate(value: any, flag = false) {
  return new Validation(value, flag);
}

const travelerValidationSchema: TravelerValidationSchema = {
  firstname: (v, f) => validate(v, f).min(2).max(20).eng(),
  lastname: (v, f) => validate(v, f).min(2).max(20).eng(),
  koreanname: (v, f) => validate(v, f).min(2).max(20).kor(),
  gender: (v, f) => validate(v, f).required('성별을 선택해 주세요.'),
  birthdate: (v, f) => validate(v, f).equal(6, '6자리의 생년월일을 입력해 주세요.').number(),
};

const inquiryValidationSchema: InquiryValidationSchema = {
  arrivalhour: (v, f) => validate(v, f).required('숙소 도착 예정 시간을 선택해주세요.'),
  arrivalminute: (v, f) => validate(v, f).required('숙소 도착 예정 시간을 선택해주세요.'),
  name: (v, f) => validate(v, f).min(2).max(20).eng(),
  phone: (v, f) => validate(v, f).min(2).max(20).number(), 
  detail: (v, f) => validate(v, f).required('기타 예약 정보를 입력해주세요.').max(200),
};

export { travelerValidationSchema, inquiryValidationSchema };