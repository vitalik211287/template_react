export function formatPrice(value) {
  // value може бути number або string
  const num = Number(value);
  if (Number.isNaN(num)) return value;
  return new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}
