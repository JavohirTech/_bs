export const numberFormatter = (amount:number | string = "", separator = ' ', suffix = '') => {
  const formattedNumber = amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  return suffix ? `${formattedNumber} ${suffix}` : formattedNumber;
};