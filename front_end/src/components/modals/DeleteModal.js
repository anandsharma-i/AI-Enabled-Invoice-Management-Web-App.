import { Box, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import axios from "axios";
import React from 'react';

/**
 * This is DeleteModal : a part of GridHeader 
 * This contains..
 * modal when DELETE is clicked
 * 
 * NOTE: ALL UI SCREENSHOT ARE IN THE SRC/RESOURCES/UI-ScreenShots folder
*/

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height:100,    
    color:'white',
    bgcolor: '#304454',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function DeleteModal(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  function handleDelete()
  {
    console.log(props.selectedRows);
    var selectedRows=props.selectedRows;
    selectedRows=JSON.stringify(Object.assign({},selectedRows));
    
    console.log(selectedRows);//{"0":1,"1":2,"2":3}
    
    //backend
    var api = axios.create({
      baseURL: "http://localhost:8080/HRC_FINAL",
    });
    
    api.get("/DeleteInvoice", {
        params: {rows:selectedRows},
      })
      .then(alert("Successfully Deleted"))
      .catch((err) => console.log("Error", err));
    handleClose()  
  }
  return (
    <div className="DeleteModal">
        <Button style={{maxWidth: "150px",minWidth: "150px",}} onClick={handleOpen} disabled={props.isDisabled_Del_Pred}>DELETE</Button>
        <Modal 
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>              
              <Typography id="modal-modal-title" variant="h6" component="h2">
                  Delete Records ?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Are you sure you want to delete these record[s] ?
              </Typography>
              
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                  <Button style={{maxWidth: "300px",minWidth: "300px",}} onClick={handleDelete}>Delete</Button>                                            
                  <Button style={{maxWidth: "300px",minWidth: "300px",}} onClick={handleClose}>CANCEL</Button>                                               
              </ButtonGroup>                                       
            </Box>
        </Modal>
    </div>
  );
}

export default DeleteModal;
