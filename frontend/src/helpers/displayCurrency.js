const displayMADCurrency = (num) => {
  const formatter = new Intl.NumberFormat('fr-MA', {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 2
  });

  return formatter.format(num);
}

export default displayMADCurrency;
