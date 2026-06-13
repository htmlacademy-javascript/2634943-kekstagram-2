

//Функция для проверки длины строки

let checksString = function (string, length) {
  if (string.length <= length) {
    return true;
  }
  return false;
};
//Функция для проверки, является ли строка палиндромом

let isPalindrome = function (string) {
  let normalized = string
    .replaceAll(' ', '')
    .toLowerCase();
  let reversed = '';
  for (let i = normalized.length - 1; i >= 0; i--) {
    let char = normalized[i];
    reversed += char;
  }
  return normalized === reversed;
};

//Функция извлечения цифр
let extractDigits = function (string) {
  if (typeof string === 'number') {
    string = string.toString();
  }
  let digits = '';
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (char >= '0' && char <= '9') {
      digits += char;
    }
  }
  if (digits === '') {
    return NaN;
  }
  let result = parseInt(digits);
  if (result < 0) {
    result = result * -1;
  }
  return result;
};
