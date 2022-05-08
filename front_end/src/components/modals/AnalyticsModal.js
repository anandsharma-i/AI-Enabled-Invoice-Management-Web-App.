import { Box, Grid, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ButtonGroup from '@mui/material/ButtonGroup';
import ChartModal from './ChartModal';
import axios from "axios";
import {useState } from "react";
import React from 'react';

/**
 * This is AnalyticsModal : a part of GridHeader 
 * This contains..
 * modal when ANALYTICS VIEW is clicked
 * 
 * NOTE: ALL UI SCREENSHOT ARE IN THE SRC/RESOURCES/UI-ScreenShots folder
*/

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height:400,    
    color:'white',
    bgcolor: '#304454',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const initState = {    
    clear_date_begin: "2020-01-01",
    clear_date_end: "2020-12-30",           
    due_in_date_begin: "2020-01-01",
    due_in_date_end: "2020-12-30",
    invoice_currency: "USD",       
    baseline_create_date_begin: "2020-01-01",    
    baseline_create_date_end: "2020-12-30",    
  };

function AnalyticsModal() {
    const [open, setOpen] = React.useState(false);
    const [ChartOpen, setChartOpen] = React.useState(false);    
    const [value, setValue] = React.useState(initState);
    const [chartData, setchartData] = useState([]);

    const handleChartOpen = () =>setChartOpen(true);
    const handleChartClose = () => setChartOpen(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValue((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      
    function handleSubmit() {
    //e.preventDefault();
    //var json = JSON.stringify(value);
    //console.log("JSON : " + json);
    //console.log("Printing before fetch.." + value);

    var api = axios.create({
        baseURL: "http://localhost:8080/HRC_FINAL",
    });
    
    api.get("/AnalyticView", {
        params: value,
        })
        .then((response) => {
            console.log(response);    
            setchartData(response.data)        
          });
    handleClose();  
    handleChartOpen();

    }
  return (
    <div className="AnalyticsModal">
        <Button style={{maxWidth: "150px",minWidth: "150px",}} onClick={handleOpen}>ANALYTICS VIEW</Button>
        <Modal 
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Analytics View
                </Typography>
                <form>
                <Box                    
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography>Clear Date</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>Due Date</Typography>
                            </Grid>
                        </Grid>                                                                    
                        <TextField
                            required
                            name="clear_date_begin"                                                        
                            type={'date'} 
                            value={value.clear_date_begin}
                            onChange={handleInputChange}                           
                        />                        
                        <TextField
                            required
                            name="due_in_date_begin"                                
                            type={'date'}
                            value={value.due_in_date_begin}
                            onChange={handleInputChange}                 
                        />
                        <TextField
                            required
                            name="clear_date_end"                            
                            type={'date'}
                            value={value.clear_date_end}
                            onChange={handleInputChange}                            
                        />
                        <TextField
                            required
                            name="due_in_date_end"                                
                            type={'date'}
                            value={value.due_in_date_end}
                            onChange={handleInputChange}                 
                        />
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography>Baseline Create Date</Typography>
                            </Grid>
                            <Grid item>
                                <Typography>Invoice Currency</Typography>
                            </Grid>
                        </Grid>                                                 
                        <TextField
                            required
                            name="baseline_create_date_begin"                                
                            type={'date'} 
                            value={value.baseline_create_date_begin}
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
                            name="baseline_create_date_end"                                
                            type={'date'} 
                            value={value.baseline_create_date_end}
                            onChange={handleInputChange}                
                        />
                        
                    </div>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group">                        
                        <Button style={{maxWidth: "250px",minWidth: "250px",}} onClick={handleSubmit}>SUBMIT</Button>                        
                        <Button style={{maxWidth: "250px",minWidth: "250px",}} onClick={handleClose}>CANCEL</Button>                                               
                    </ButtonGroup>                    
                </Box>
                </form>
            </Box>
        </Modal>
        <ChartModal chartData={chartData} ChartOpen={ChartOpen} handleChartClose={handleChartClose}/>  
    </div>
  );
}

export default AnalyticsModal;
