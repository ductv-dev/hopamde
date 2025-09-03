import bigDecimal from 'js-big-decimal';

export enum Currency {
  VND = 'VND',
}

export enum CurrencyPosition {
  Left = 'left',
  Right = 'right',
}

export const CURRENCIES = {
  VND: {
    symbol: '₫',
    position: CurrencyPosition.Right,
    name: 'Vietnamese Dong',
    decimalDigits: 0,
    code: 'VND',
  },
};

export const bigDecimalFormat: any = (
  value: number,
  decimal = 2,
  mode = bigDecimal.RoundingModes.CEILING,
) => {
  return Number(bigDecimal.round(value, decimal, mode));
};

const renderAmount = (amount: string) => {
  // Replace commas with dots
  const calcAmount = amount?.replace(/,/g, '.');

  // Format the number with commas for thousands separators
  const [integerPart, decimalPart] = calcAmount.split('.');

  // Safari/iOS-compatible thousands separator formatting
  const formattedIntegerPart = integerPart
    ? formatThousandsSeparator(integerPart, '.')
    : integerPart;

  // Concatenate integer part and decimal part (if any)
  let formattedAmount = formattedIntegerPart;
  if (decimalPart) {
    formattedAmount += ',' + decimalPart;
  }

  return formattedAmount;
};

// Helper function to add thousands separators without complex regex
const formatThousandsSeparator = (str: string, separator: string): string => {
  if (!str) return str;

  let result = '';
  const len = str.length;

  for (let i = 0; i < len; i++) {
    if (i > 0 && (len - i) % 3 === 0) {
      result += separator;
    }
    result += str[i];
  }

  return result;
};

const logicFormatCurrency = (
  amount: string,
  hasSymbol = true,
  position: CurrencyPosition,
  symbol: string,
) => {
  const calcAmount = amount?.replace(/\./g, ',');
  let formattedAmount = renderAmount(calcAmount);
  if (hasSymbol) {
    switch (position) {
      case CurrencyPosition.Left:
        formattedAmount = `${symbol}${formattedAmount}`;
        break;
      case CurrencyPosition.Right:
        formattedAmount = `${formattedAmount}${symbol}`;
        break;
      default:
        formattedAmount = `${formattedAmount}${symbol}`;
        break;
    }
  }
  return {
    // Giá trị type number dùng để tính toán
    amount: Number(amount),
    // Giá trị type string dùng để hiển thị
    formattedAmount,
  };
};
export const formatCurrency = (
  amount: number,
  currency: Currency,
  hasSymbol = true,
) => {
  const { symbol, position, decimalDigits } = CURRENCIES[currency];
  let newAmount = amount;
  if (!newAmount) newAmount = 0;
  newAmount = Number(newAmount);
  const roundAmount = bigDecimalFormat(newAmount, decimalDigits)?.toString();
  return logicFormatCurrency(roundAmount, hasSymbol, position, symbol);
};

export const abbrNum = (number: any, decPlaces = 3) => {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);

  // Enumerate number abbreviations
  const abbrev = ['K', 'M', 'B', 'T'];

  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    const size = Math.pow(10, (i + 1) * 3);

    // If the number is bigger or equal do the abbreviation
    if (size <= Number(number)) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((Number(number) * decPlaces) / size) / decPlaces;

      // Handle special case where we round up to the next abbreviation
      if (number === 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      // Add the letter for the abbreviation
      number += abbrev[i];

      // We are done... stop
      break;
    }
  }

  return number;
};

export const numberWithCommas = (x?: number) => {
  if (x === undefined || x === null) return undefined;
  return formatThousandsSeparator(x.toString(), ',');
};

export const calcCommission = ({
  minPrice,
  maxPrice,
  planCommissionRate,
}: {
  minPrice: number;
  maxPrice: number;
  planCommissionRate: number;
}) => {
  return {
    percentage: Number(planCommissionRate / 100 + 1),
    minPrice:
      Number(minPrice) *
      (Number(((planCommissionRate / 100 + 1) * 100) / 10000) as number),
    maxPrice:
      Number(maxPrice) *
      (Number(((planCommissionRate / 100 + 1) * 100) / 10000) as number),
  };
};
