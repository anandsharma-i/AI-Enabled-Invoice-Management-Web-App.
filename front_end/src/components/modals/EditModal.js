import { Box, Modal, Typography,Button,TextField,ButtonGroup } from "@mui/material";
import axios from "axios";
import React from "react";

/**
 * This is EditModal : a part of GridHeader 
 * This contains..
 * modal when EDIT is clicked
 * 
 * NOTE: ALL UI SCREENSHOT ARE IN THE SRC/RESOURCES/UI-ScreenShots folder
*/

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 120,
  color: "white",
  bgcolor: "#304454",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initState = {
        invoice_currency: "",
        cust_payment_terms: "",
    };

function EditModal(props) {    
  props.selectedRowData.forEach(element => {    
    initState.invoice_currency=element.invoice_currency;
    initState.cust_payment_terms=element.cust_payment_terms;
  });
    
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initState);  
  const handleOpen = () => {setOpen(true)};
  const handleClose = () => setOpen(false);  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleEdit() {             
      var api = axios.create({
        baseURL: "http://localhost:8080/HRC_FINAL",
      });

      api
        .get("/EditInvoice", {
          params: { sl_no: props.selectedRows[0], invoice_currency:value.invoice_currency , cust_payment_terms:value.cust_payment_terms },
        })
        .then(alert("Successfully Edited"))
        .catch((err) => console.log("Error", err));
      handleClose();    
  }

  return (
    <div className="EditModal">
      <Button
        style={{ maxWidth: "150px", minWidth: "150px" }}
        onClick={handleOpen}
        disabled={props.isDisabled}                
      >
        EDIT
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit
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
                <TextField
                  required
                  name="invoice_currency"
                  placeholder="Invoice Currency"
                  value={value.invoice_currency}
                  onChange={handleInputChange}
                />
                <TextField
                  required
                  name="cust_payment_terms"
                  placeholder="Customer Payment Terms"
                  value={value.cust_payment_terms}
                  onChange={handleInputChange}
                />
              </div>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  style={{ maxWidth: "300px", minWidth: "300px" }}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  style={{ maxWidth: "300px", minWidth: "300px" }}
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

export default EditModal;
