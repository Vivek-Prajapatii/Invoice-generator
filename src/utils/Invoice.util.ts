export const generateInvoiceId = () => {
  // Generate a random number between 10000 and 99999
  const randomInvoiceId = Math.floor(
    Math.random() * (999999 - 100000 + 1) + 10000
  );
  return randomInvoiceId;
};
