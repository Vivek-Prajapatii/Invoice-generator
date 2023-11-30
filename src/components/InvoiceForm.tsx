import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import "../styles/components/InvoiceForm.scss";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Item, FormData } from "../models/models";

function InvoiceForm(props: {
  setGenerateInvoice: Function;
  setFormData: Function;
  formData: FormData;
}) {
  const { setGenerateInvoice, setFormData, formData } = props;
  // const date = new Date().toLocaleDateString();

  const handleChange =
    (field: keyof Item | keyof FormData, index?: number) => (event: any) => {
      if (index !== undefined) {
        // Field is inside the items array
        const newItems = [...formData.items];
        newItems[index][field as keyof Item] =
          event.target && "value" in event.target
            ? (event.target.value as string)
            : (event.value as string);
        setFormData({ ...formData, items: newItems });
      } else {
        // Field is outside the items array
        setFormData({
          ...formData,
          [field as keyof FormData]:
            event.target && "value" in event.target
              ? (event.target.value as string)
              : (event.value as string),
        });
      }
    };

  const handleDateChange = (e: any) => {
    const date = convertDate(e.$d.toISOString());
    setFormData({ ...formData, date: date });
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    if (formData.name !== "" || formData.phone !== "") {
      setGenerateInvoice(true);
    } else {
      alert("Fill the mandatory fields");
    }
  };

  function createNewItem() {
    return {
      description: "",
      totalHoursOfWork: "",
      totalExpenses: "",
      otherExpenses: "",
      materials: "",
      labourCharges: "",
    };
  }

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      items: [createNewItem()],
      date: null,
      paymentMethod: "",
      paymentStatus: "",
      remarks: "",
    });
  };

  const handleAddItem = () => {
    setFormData({ ...formData, items: [...formData.items, createNewItem()] });
  };

  const handleRemoveItem = (index: number) => () => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({ ...formData, items: newItems });
  };

  const convertDate = (date: any) => {
    return dayjs(date).format("MM/DD/YYYY");
  };

  return (
    <Container className="container">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* basic labour info */}

          <h3>Enter Basic details</h3>
          <Grid
            className={"labour info"}
            container
            spacing={2}
            sx={{ width: "100%", ml: 2, mr: 2 }}
          >
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                label="Name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange("name")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="filled"
                required
                type="number"
                label="Phone"
                fullWidth
                value={formData.phone}
                onChange={handleChange("phone")}
              />
            </Grid>
          </Grid>

          {/* details */}

          {formData.items.map((item, index) => (
            <React.Fragment key={index}>
              <Grid
                container
                sx={{ width: "100%", justifyContent: "space-between" }}
              >
                <h3>Line Item: {index + 1}</h3>
                <Button
                  variant="outlined"
                  color="secondary"
                  size={"small"}
                  sx={{ width: "7rem", height: "2rem", mt: 4, mr: 2 }}
                  onClick={handleRemoveItem(index)}
                >
                  Remove
                </Button>
              </Grid>

              <Grid
                className={"details"}
                container
                spacing={2}
                sx={{ width: "100%", ml: 2, mr: 2 }}
              >
                <Grid item xs={12} sm={12}>
                  <TextField
                    label="Description"
                    variant="filled"
                    fullWidth
                    value={item.description}
                    onChange={handleChange("description", index)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Total Hours of Work"
                    variant="filled"
                    fullWidth
                    type="number"
                    value={item.totalHoursOfWork}
                    onChange={handleChange("totalHoursOfWork", index)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Materials"
                    variant="filled"
                    fullWidth
                    value={item.materials}
                    onChange={handleChange("materials", index)}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Labour Charges"
                    variant="filled"
                    type="number"
                    fullWidth
                    value={item.labourCharges}
                    onChange={handleChange("labourCharges", index)}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Other Expenses"
                    variant="filled"
                    fullWidth
                    type="number"
                    value={item.otherExpenses}
                    onChange={handleChange("otherExpenses", index)}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    label="Total Amount"
                    variant="filled"
                    disabled
                    fullWidth
                    type="number"
                    value={
                      parseInt(item.otherExpenses) +
                        parseInt(item.totalHoursOfWork) *
                          parseInt(item.labourCharges) || ""
                    }
                    onChange={handleChange("totalExpenses", index)}
                  />
                </Grid>
              </Grid>
            </React.Fragment>
          ))}

          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "start", ml: 2 }}
          >
            <Button variant="contained" onClick={handleAddItem}>
              Add Items
            </Button>
          </Grid>

          <h3>Payment details</h3>
          <Grid
            className={"details"}
            container
            spacing={2}
            sx={{ width: "100%", ml: 2, mr: 2 }}
          >
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant={"filled"} required>
                <InputLabel id="payment-status-label">
                  Payment Status
                </InputLabel>
                <Select
                  labelId="payment-status-label"
                  id="payment-status"
                  required
                  value={formData.paymentStatus}
                  label="Payment Status"
                  onChange={handleChange("paymentStatus")}
                >
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControl fullWidth variant={"filled"} required>
                <InputLabel id="payment-method-label">
                  Payment Method
                </InputLabel>
                <Select
                  labelId="payment-method-label"
                  id="payment-method"
                  value={formData.paymentMethod}
                  label="Payment Method"
                  onChange={handleChange("paymentMethod")}
                >
                  <MenuItem value="cash">Cash</MenuItem>
                  <MenuItem value="cheque">Cheque</MenuItem>
                  <MenuItem value="upi">UPI</MenuItem>
                  <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
                  <MenuItem value="neft">NEFT</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ padding: "0px" }}
                >
                  <DatePicker
                    label="Date"
                    onError={() => {}}
                    value={dayjs(formData?.date)}
                    onChange={(e) => handleDateChange(e)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <h3>Notes</h3>
          <Grid
            className={"details"}
            container
            spacing={2}
            sx={{ width: "100%", ml: 4, mr: 2, mt: 0 }}
          >
            <TextField
              label="Remarks"
              variant="filled"
              fullWidth
              multiline
              rows={2}
              value={formData.remarks}
              onChange={handleChange("remarks")}
            />
          </Grid>
          <Stack className={"stack"}>
            <Button variant="outlined" color="secondary" onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              // onClick={handleSubmit}
              type="submit"
            >
              Create Invoice
            </Button>
          </Stack>
        </Grid>
      </form>
    </Container>
  );
}

export default InvoiceForm;
