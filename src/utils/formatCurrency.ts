export const formatCurrency = (amount: number): string => {
  return `£${amount.toFixed(2)}`;
};

export const incrementQuoteNumber = (quote: string): string => {
  const [prefix, numberPart] = quote.split('-');
  const incremented = (Number(numberPart) + 1).toString().padStart(numberPart.length, '0');
  return `${prefix}-${incremented}`;
};


export const createDate = () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  return `${day}/${month}/${year}`;
};