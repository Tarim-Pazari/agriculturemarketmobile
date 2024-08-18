class Helper {
  formatPrice(price: string) {
    if (!price) return '';

    // Sadece sayıları ve virgülü bırak, noktaları virgüle çevir
    const cleaned = price;

    // Tam sayı ve kuruş kısımlarını ayır
    const parts = cleaned.split(',');
    const integerPart = parts[0] || '';
    let decimalPart = parts[1] || '';

    // Tam sayı kısmını binlik gruplara ayır (noktalar ile)
    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.',
    );

    // Kuruş kısmını 2 hane ile sınırlı tut
    if (decimalPart.length > 2) {
      decimalPart = decimalPart.substring(0, 2);
    }

    // Kuruş varsa, formatla ve ekle
    return decimalPart
      ? `${formattedIntegerPart},${decimalPart}`
      : formattedIntegerPart;
  }

  formatNumber = (number: number): number => {
    let formattedNumber = number.toString().replace(/,/g, '');
    return Number(formattedNumber);
  };
}
export default new Helper();
