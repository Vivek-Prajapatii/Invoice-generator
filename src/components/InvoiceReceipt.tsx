import React from "react";
import { Container, Grid } from "@mui/material";
import "../styles/components/InvoiceReceipt.scss";


function InvoiceReceipt(props: { formData: any }) {
  const { formData } = props;
  // Helper function to calculate the subtotal
  const calculateSubtotal = (items: any) => {
    return items.reduce(
      (total: number, item: any) =>
        total + item.totalHoursOfWork * item.totalRate,
      0
    );
  };

  // Helper function to calculate the total including other expenses
  const calculateTotal = (items: any, otherExpenses: string) => {
    return calculateSubtotal(items) + parseFloat(otherExpenses);
  };
  return (
    <Container className="container">
      <Grid container className="grid-container">
        <Grid item className={"address"}>
          From, <br />
          <h3>infinite analytics</h3>
          A909, The Capital, G Block BKC, Bandra Kurla
          Complex, Bandra East, Mumbai, Maharashtra 400051
        </Grid>
        <Grid item className={"address"}>
          To, <br />
          Vivek Prajapati<br />
          7768998254
        </Grid>
      </Grid>
    </Container>
  );
}

export default InvoiceReceipt;
