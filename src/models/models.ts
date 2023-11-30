export interface Item {
  description: string;
  totalHoursOfWork: string;
  totalExpenses: string;
  otherExpenses: string;
  materials: string;
  labourCharges: string;
}

export interface FormData {
  name: string;
  phone: string;
  items: Item[];
  date: Date | null;
  paymentMethod: string;
  paymentStatus: string;
  remarks: string;
}
