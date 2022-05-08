import { Box, Modal, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import React from "react";

/**
 * This is AdvSearchModal : a part of GridHeader 
 * This contains..
 * modal when ADVANCE SEARCH is clicked
 * 
 * NOTE: ALL UI SCREENSHOT ARE IN THE SRC/RESOURCES/UI-ScreenShots folder
*/

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 200,
  color: "white",
  bgcolor: "#304454",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const initState = {
  cust_number: "",
  buisness_year: "",
  doc_id: "",
  invoice_id: "",
};

function AdvSearchModal(props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initState);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleAdvSearch(e) {
    //e.preventDefault();
    var json = JSON.stringify(value);
    console.log("JSON : " + json);
    console.log("Printing before fetch.." + e.target.value);

    var api = axios.create({
      baseURL: "http://localhost:8080/HRC_FINAL",
    });

    api
      .get("/AdvSearch", {
        params: value,            
      })      
      .then((response) => {
        console.log(response);
        props.setTableData(response.data);        
      });
    setValue(initState);  
    handleClose();    
  }
  return (
    <div className="AdvSearchModal">
      <Button
        style={{ maxWidth: "150px", minWidth: "150px" }}
        onClick={handleOpen}
      >
        ADVANCE SEARCH
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Advance Search
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
                  //required
                  name="doc_id"
                  placeholder="Document id"
                  value={value.doc_id}
                  onChange={handleInputChange}
                />
                <TextField
                  //required
                  name="invoice_id"
                  placeholder="invoice Id"
                  value={value.invoice_id}
                  onChange={handleInputChange}
                />
                <TextField
                  //required
                  name="cust_number"
                  placeholder="Customer Number"
                  value={value.cust_number}
                  onChange={handleInputChange}
                />
                <TextField
                  //required
                  name="buisness_year"
                  placeholder="Buisiness Year"
                  value={value.buisness_year}
                  onChange={handleInputChange}
                />
              </div>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  style={{ maxWidth: "250px", minWidth: "250px" }}
                  onClick={handleAdvSearch}
                >
                  SEARCH
                </Button>
                <Button
                  style={{ maxWidth: "250px", minWidth: "250px" }}
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

export default AdvSearchModal;
