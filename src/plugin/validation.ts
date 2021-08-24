import isEmpty from 'lodash/isEmpty';
import isNaN from 'lodash/isNaN';
import isUndefined from 'lodash/isUndefined';

const rEng = /^[A-Za-z\s]+$/;
const rKor = /[\uac00-\ud7af]|[\u1100-\u11ff]|[\u3130-\u318f]|[\ua960-\ua97f]|[\ud7b0-\ud7ff]/;

export default class Validation {
  value: any;
  error?: string;
  flag?: boolean;

  constructor(value: any, flag = false) {
    this.value = value;
    this.error = undefined;
    this.flag = flag;
  }

  required(error = '내용을 입력해 주세요.') {
    if (isEmpty(this.value) && this.flag) {
      this.error = error;
    }

    return this;
  }

  string(error = '문자만 입력 가능합니다.') {
    if (typeof this.value !== 'string' && this.flag) {
      this.error = error;
    }

    return this;
  }

  number(error = '숫자만 입력 가능합니다.') {
    if (isNaN(Number(this.value)) && this.flag) {
      this.error = error;
    }

    return this;
  }

  max(maxnum: number, error?: string) {
    if (this.value.length > maxnum && this.flag) {
      this.error = isUndefined(error) 
        ? `최대 ${maxnum}자까지 입력 가능합니다.` 
        : error;
    }

    return this;
  }

  min(minnum: number, error?: string) {
    if (this.value.length < minnum && this.flag) {
      this.error = isUndefined(error) 
        ? `최소 ${minnum}자 이상 입력해 주세요.` 
        : error;
    }

    return this;
  }

  equal(equalnum: number, error?: string) {
    if (this.value.length !== equalnum && this.flag) {
      this.error = isUndefined(error) 
        ? `${equalnum}자만 입력해 주세요.` 
        : error;
    }

    return this;
  }

  eng(error = '영어와 띄워쓰기만 입력 가능합니다.') {
    if (rEng.exec(this.value) == null && this.flag) {
      this.error = error;
    }

    return this;
  }

  kor(error = '한글만 입력 가능합니다.') {
    if (rKor.exec(this.value) == null && this.flag) {
      this.error = error;
    }

    return this;
  }
}