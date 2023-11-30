import React from "react";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import "../styles/components/InvoiceReceipt.scss";
import { TableContainer } from "@mui/material";
import * as constants from "../constants/constants";

function InvoiceReceipt(props: { formData: any }) {
  const { formData } = props;

  const fields = {
    "Invoice ID": "invoiceNo",
    "Invoice Date": formData.date,
    "Total Hours": "Total hours",
    "Total Amount": "amount",
    "Payment Status": formData.paymentStatus,
    "Payment Mode": formData.paymentMethod,
    "Due Date": formData.date,
  };
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
      <Grid container className="receipt-grid-container">
        <Grid className={"address"}>
          <Grid item className="company-address">
            <h3>{constants.COMPANY_NAME}</h3>
            <p>{constants.COMPANY_ADDRESS}</p>
          </Grid>
          <Grid item className="client-address">
            To
            <p>{formData.name}</p>
            <p>{formData.phone}</p>
          </Grid>
        </Grid>
        <Grid container className="table-container">
          <h3>Line Item Details</h3>
          <TableContainer>
            <Table sx={{ width: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <h4>Description</h4>
                  </TableCell>
                  <TableCell>
                    <h4>Materials</h4>
                  </TableCell>
                  <TableCell align="right">
                    <h4>Hours</h4>
                  </TableCell>
                  <TableCell align="right">
                    <h4>Charges</h4>
                  </TableCell>
                  <TableCell align="right">
                    <h4>Other</h4>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.items.map((row: any) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell>{row.materials}</TableCell>
                    <TableCell align="right">{row.totalHoursOfWork}</TableCell>
                    <TableCell align="right">{row.labourCharges}</TableCell>
                    <TableCell align="right">{row.otherExpenses}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid container className="invoice-details">
          <TableContainer className="lower-table">
            <Table sx={{ width: 300 }}>
              <TableBody>
                {Object.entries(fields).map(([label, value], index) => {
                  return (
                    <TableRow key={index} className={"table-row"}>
                      <TableCell className={"table-cell"}>
                        <h4>{label}</h4>
                      </TableCell>
                      <TableCell className={"table-cell"}>{value}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid container className="remarks">
          <h4>Remarks : </h4>
          <p>{formData.remarks}</p>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InvoiceReceipt;
