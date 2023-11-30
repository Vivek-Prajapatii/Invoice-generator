import React, { useState } from "react";
import "../styles/pages/Home.scss";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceReceipt from "../components/InvoiceReceipt";
import { FormData } from "../models/models";

function Home() {
  const [generateInvoice, setGenerateInvoice] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    items: [createNewItem()], // Start with one item by default
    date: null,
    paymentMethod: "",
    paymentStatus: "",
    remarks: "",
  });

  function createNewItem() {
    return {
      description: "",
      totalHoursOfWork: "",
      totalRate: "",
      otherExpenses: "",
      materials: "",
      labourCharges: "",
    };
  }

  return (
    <div className="home">
      {generateInvoice ? (
        <InvoiceForm
          setGenerateInvoice={setGenerateInvoice}
          setFormData={setFormData}
          formData={formData}
        />
      ) : (
        <InvoiceReceipt formData={formData} />
      )}
    </div>
  );
}

export default Home;
