import React from "react";
import {
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import "../styles/components/InvoiceReceipt.scss";
import { TableContainer } from "@mui/material";
import * as constants from "../constants/constants";
import { getNext7Days } from "../utils/date.util";
import { FormData } from "../models/models";
import { generateInvoiceId } from "../utils/Invoice.util";
import { calculateTotalAmount } from "../utils/Invoice.util";

function InvoiceReceipt(props: { formData: FormData }) {
  const { formData } = props;
  const { totalAmt, totalHrs } = calculateTotalAmount(formData);

  const fields = {
    "Invoice ID": generateInvoiceId(),
    "Invoice Date": formData.date,
    "Total Hours": totalHrs,
    "Total Amount": totalAmt,
    "Payment Status": formData.paymentStatus,
    "Payment Mode": formData.paymentMethod,
    "Due Date":
      formData.date && formData.paymentStatus !== "paid"
        ? getNext7Days(formData.date?.toString())
        : "N/A",
  };

  // opens up a window to print the invoice page
  const handlePrintClick = () => {
    window.print();
  };

  // Opens the email app to send the email
  const sendEmail = () => {
    const subject = encodeURIComponent("Invoice");
    const body = encodeURIComponent("Email Body is not disclosed");

    // Create a mailto link with subject and body parameters
    const mailtoLink = `mailto:prajapativivek@gmail.com?subject=${subject}&body=${body}`;

    // Open the default email client
    window.location.href = mailtoLink;
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
            <Table sx={{ width: 650 }}>
              <TableHead>
                <TableRow className={"table-header"}>
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
                    <h4>Charges/hr</h4>
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
          {formData.paymentStatus === "paid" ? (
            <Grid className="status"></Grid>
          ) : (
            <Grid></Grid>
          )}

          <TableContainer className="lower-table">
            <Table sx={{ width: 300 }}>
              <TableBody>
                {Object.entries(fields).map(([label, value], index) => {
                  return (
                    <TableRow key={index} className={"table-row"}>
                      <TableCell className={"table-cell"}>
                        <h4>{label}</h4>
                      </TableCell>
                      <TableCell className={"table-cell"}>
                        {value !== "NaN" && value && value.toString()}
                      </TableCell>
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
        <Grid container className="share">
          <Button variant="contained" onClick={sendEmail}>
            Share
          </Button>
          <Button variant="contained" onClick={handlePrintClick}>
            Print
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default InvoiceReceipt;
