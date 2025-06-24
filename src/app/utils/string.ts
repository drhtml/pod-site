import * as _ from 'lodash';

export const lpad = (
  string: string,
  length: number,
  padString: string = '0'
) => {
  let str = string;
  while (str.length < length) str = padString + str;
  return str;
};

export const isNumber = (value: string): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  if (value.match(/^-?\d+$/)) {
    return true;
  } else if (value.match(/^\d+\.\d+$/)) {
    return true;
  }

  return false;
};

export const convertStringToNumber = (
  value: string,
  defaultValue = 0
): number => {
  if (value === null || value === undefined) {
    return defaultValue;
  }
  if (_.isNumber(value)) {
    return value;
  }
  if (value && value.match(/^-?\d+$/)) {
    return parseInt(value);
  } else if (value && value.match(/^\d+\.\d+$/)) {
    return parseFloat(value);
  }

  return defaultValue;
};

export const ordinalSuffixOf = (i: number) => {
  const j = i % 10;
  const k = i % 100;
  if (j == 1 && k != 11) {
    return i + 'st';
  }
  if (j == 2 && k != 12) {
    return i + 'nd';
  }
  if (j == 3 && k != 13) {
    return i + 'rd';
  }
  return i + 'th';
};

export const getFileNameWithExtension = (file: string) => {
  const segments = (file || '').split('/');
  const lastPart = segments[segments.length - 1];
  return lastPart;
};

export const getFileNameWithoutExtension = (file: string) => {
  const lastPart = getFileNameWithExtension(file);
  return lastPart.split('.')[0];
};

export const formatPrice = (price: string) => {
  if (!price) {
    return price;
  }
  return `$${parseFloat(price).toLocaleString('en')}`;
};

// camel case string examples: bigAnimal, electricBaseboard
export const convertCamelCaseTextToTitleCaseText = (text: string) => {
  const result = text.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

// snake case string examples: big_animal, electric_baseboard
export const convertSnakeCaseTextToTitleCaseText = (text: string) => {
  const finalResult = text
    .split('_')
    .filter((x) => x.length > 0)
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');
  return finalResult;
};
