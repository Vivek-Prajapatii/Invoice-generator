import { FormData } from "../models/models";

export const generateInvoiceId = () => {
  // Generate a random number between 10000 and 99999
  const randomInvoiceId = Math.floor(
    Math.random() * (999999 - 100000 + 1) + 10000
  );
  return randomInvoiceId;
};

export const calculateTotalAmount = (formData: FormData) => {
  let totalAmt = 0;
  let totalHrs = 0;
  for (let item of formData.items) {
    totalAmt =
      totalAmt + parseInt(item.otherExpenses) + parseInt(item.labourCharges) *
      parseInt(item.totalHoursOfWork);

    totalHrs = totalHrs + parseInt(item.totalHoursOfWork);
  }
  if (!isNaN(totalAmt) && !isNaN(totalHrs)) {
    return { totalAmt, totalHrs };
  } else return { totalAmt: "", totalHrs: "" };
};
