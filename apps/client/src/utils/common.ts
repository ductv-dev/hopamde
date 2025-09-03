export const formattedCurrency = (value: string | number) => {
  const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedValue;
};
