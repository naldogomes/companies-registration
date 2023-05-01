import { DataCep } from "../apis/cepService";

export const validateCNPJ = (value: string) => {
  const cnpj = value.replace(/[^\d]+/g, "");

  if (cnpj.length !== 14) {
    return "CNPJ inválido";
  }

  if (/^(\d)\1{13}$/.test(cnpj)) {
    return "CNPJ inválido";
  }

  let size = cnpj.length - 2;
  let numbers = cnpj.substring(0, size);
  const digits = cnpj.substring(size);
  let sum = 0;
  let pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== Number(digits.charAt(0))) {
    return "CNPJ inválido";
  }

  size += 1;
  numbers = cnpj.substring(0, size);
  sum = 0;
  pos = size - 7;

  for (let i = size; i >= 1; i--) {
    sum += Number(numbers.charAt(size - i)) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

  if (result !== Number(digits.charAt(1))) {
    return "CNPJ inválido";
  }

  return true;
};

export const validateCPF = (value: string) => {
  const cpf = value.replace(/[\D]+/g, "").substring(0, 11);
  let sum;
  let rest;
  sum = 0;

  if (cpf.length !== 11) return "CPF inválido";
  if (cpf === "00000000000") return "CPF inválido";
  if (cpf === "11111111111") return "CPF inválido";
  if (cpf === "22222222222") return "CPF inválido";
  if (cpf === "33333333333") return "CPF inválido";
  if (cpf === "44444444444") return "CPF inválido";
  if (cpf === "55555555555") return "CPF inválido";
  if (cpf === "66666666666") return "CPF inválido";
  if (cpf === "77777777777") return "CPF inválido";
  if (cpf === "88888888888") return "CPF inválido";
  if (cpf === "99999999999") return "CPF inválido";

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(9, 10), 10)) {
    return "CPF inválido";
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(10, 11), 10)) {
    return "CPF inválido";
  }

  return true;
};

export const validateCEP = async (value: string) => {
  try {
    const response = await DataCep(value);
    if (response?.data?.erro) return "CEP inválido";
    return response.data;
  } catch (error) {
    return "CEP inválido";
  }
};

export const checkAge = (sypplierBirthDate: string) => {
  const today = new Date();
  const birthDate = new Date(sypplierBirthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const months = today.getMonth() - birthDate.getMonth();
  if (months < 0 || (months === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  const hasCompleted18Years =
    age > 18 ||
    (age === 18 && months === 0 && today.getDate() >= birthDate.getDate());
  return hasCompleted18Years;
};
