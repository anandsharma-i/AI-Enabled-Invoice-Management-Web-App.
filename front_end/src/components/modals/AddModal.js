import { Box, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import React from "react";

/**
 * This is AddModal : a part of GridHeader 
 * This contains..
 * modal when ADD is clicked
 * 
 * NOTE: ALL UI SCREENSHOT ARE IN THE SRC/RESOURCES/UI-ScreenShots folder
*/

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  height: 350,
  color: "white",
  bgcolor: "#304454",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
      contrastText: "#FFFFFF",
    },
  },
});
const initState = {
  business_code: "",
  cust_number: "",
  clear_date: "",
  buisness_year: "",
  doc_id: "",
  posting_date: "",
  document_create_date: "",
  due_in_date: "",
  invoice_currency: "",
  document_type: "",
  posting_id: "",
  total_open_amount: "",
  baseline_create_date: "",
  cust_payment_terms: "",
  invoice_id: "",
};

function AddModal() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initState);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  
  var api = axios.create({
    baseURL: "http://localhost:8080/HRC_FINAL",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleSubmit() {        
    var json = JSON.stringify(value);
    console.log("JSON : " + json);
    console.log("Printing before fetch..");  
    
    if(      
      value!==initState
    )
    {
      console.log("inside if")
        api.get("/AddInvoice", {
          params: value,
        })
        .then(()=>{        
            alert("Successfully Added");
            setValue(initState);
            handleClose();
          })
        .catch((err) => console.log("Error", err));          
    }
    else{
      alert("Fill all fields")
    }        
  }

  return (
    <div className="AddModal">
      <Button
        style={{ maxWidth: "150px", minWidth: "150px" }}
        onClick={handleOpen}
      >
        ADD
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add
          </Typography>
          <form>
            <Box
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <ThemeProvider theme={theme}>
                  <TextField
                    required
                    name="business_code"
                    placeholder="Buisiness Code"
                    value={value.business_code}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="cust_number"
                    placeholder="Customer Number"
                    value={value.cust_number}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="clear_date"
                    type={"date"}
                    value={value.clear_date}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="buisness_year"
                    placeholder="Buisiness Year"
                    value={value.buisness_year}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="doc_id"
                    placeholder="Document id"
                    value={value.doc_id}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="posting_date"
                    placeholder="Posting Date"
                    type={"date"}
                    value={value.posting_date}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="document_create_date"
                    placeholder="Document Create Date"
                    type={"date"}
                    value={value.document_create_date}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="due_in_date"
                    type={"date"}
                    value={value.due_in_date}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="invoice_currency"
                    placeholder="Invoice Currency"
                    value={value.invoice_currency}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="document_type"
                    placeholder="Document type"
                    value={value.document_type}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="posting_id"
                    placeholder="Posting Id"
                    value={value.posting_id}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="total_open_amount"
                    placeholder="Total open amount"
                    value={value.total_open_amount}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="baseline_create_date"
                    type={"date"}
                    value={value.baseline_create_date}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="cust_payment_terms"
                    placeholder="Customer Payment Terms"
                    value={value.cust_payment_terms}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    name="invoice_id"
                    placeholder="invoice Id"
                    value={value.invoice_id}
                    onChange={handleInputChange}
                  />
                </ThemeProvider>
              </div>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  type="submit"
                  style={{ maxWidth: "500px", minWidth: "500px" }}
                  onClick={handleSubmit}
                >
                  Add
                </Button>
                <Button
                  style={{ maxWidth: "500px", minWidth: "500px" }}
                  onClick={handleClose}
                >
                  CANCEL
                </Button>
              </ButtonGroup>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default AddModal;
