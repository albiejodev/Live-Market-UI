export const formatCurrency = (value: number, maxFractionDigits = 2): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

export const formatNumber = (value: number, maxFractionDigits = 2): string => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
};
