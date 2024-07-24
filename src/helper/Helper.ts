class Helper {
  formatPrice = (price: string) => {
    if (!price) return '';
    const cleaned = price.replace(/[^0-9.]/g, '');
    const [integerPart, decimalPart] = cleaned.split('.');
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ',',
    );
    const formattedDecimalPart = decimalPart ? decimalPart.substring(0, 2) : '';
    return formattedDecimalPart
      ? `${formattedIntegerPart}.${formattedDecimalPart}`
      : formattedIntegerPart;
  };
  formatNumber = (number: number): number => {
    let formattedNumber = number.toString().replace(/,/g, '');
    return Number(formattedNumber);
  };
}
export default new Helper();
