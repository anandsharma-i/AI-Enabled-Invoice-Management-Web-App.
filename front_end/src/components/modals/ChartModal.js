import { Box, Grid, Modal, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Chart as ChartJS, ArcElement, Tooltip, Legend,CategoryScale,LinearScale,BarElement,Title,  } from 'chart.js';
import { Pie,Bar } from 'react-chartjs-2';
import React from 'react';

ChartJS.register(ArcElement,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
 
/**
 * This is ChartModal : a part of AnalyticsModal 
 * This contains..
 * modal when SUBMIT is clicked inside AnalyticsModal
 * 
 * NOTE: ALL UI SCREENSHOT ARE IN THE SRC/RESOURCES/UI-ScreenShots folder
*/

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' ,
    },
    title: {
      display: true,
      text: 'Total open amount vs Number of customers for all Business',
    },    
  },
};

const labels = ['Unilever', 'J&J', 'Bose', 'Kellog\'s', 'Sony', 'Puma'];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height:400,    
    color:'white',
    bgcolor: '#304454',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function ChartModal(props) { 
  var Unilever_cnt_cust="";
  var Johnson_and_Johnson_cnt_cust="";
  var Bose_cnt_cust="";
  var Kellogs_cnt_cust="";
  var Sony_cnt_cust="";
  var Puma_cnt_cust="";
  var Unilever_cnt_amt="";
  var Johnson_and_Johnson_cnt_amt="";
  var Bose_cnt_amt="";
  var Kellogs_cnt_amt="";
  var Sony_cnt_amt="";
  var Puma_cnt_amt="";
  var USD="";
  var CAD="";

  props.chartData.forEach(element => {
    if(element.business_name==="Unilever")
    {
      Unilever_cnt_cust=element.cnt_cust;
      Unilever_cnt_amt=element.cnt_amt;
    }      
    if(element.business_name==="Johnson and Johnson")
    {
      Johnson_and_Johnson_cnt_cust=element.cnt_cust;
      Johnson_and_Johnson_cnt_amt=element.cnt_amt;
    }      
    if(element.business_name==="Bose")
    {
      Bose_cnt_cust=element.cnt_cust;  
      Bose_cnt_amt=element.cnt_amt;
    }      
    if(element.business_name==="Kellog's")
    {
      Kellogs_cnt_cust=element.cnt_cust; 
      Kellogs_cnt_amt=element.cnt_amt;
    }      
    if(element.business_name==="Sony")
    {
      Sony_cnt_cust=element.cnt_cust;
      Sony_cnt_amt=element.cnt_amt;  
    }      
    if(element.business_name==="Puma")
    {
      Puma_cnt_cust=element.cnt_cust;
      Puma_cnt_amt=element.cnt_amt;
    }
    if(element.invoice_currency==="USD")
    {
      USD=element.cnt_curr;     
    }
    if(element.invoice_currency==="CAD")
    {
      CAD=element.cnt_curr;     
    }     
  });

  const data1 = {
    labels,
    datasets: [
      {
        label: 'Number of customers',
        data: [Unilever_cnt_cust, Johnson_and_Johnson_cnt_cust, Bose_cnt_cust, Kellogs_cnt_cust,Sony_cnt_cust, Puma_cnt_cust],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Total open amount',
        data: [Unilever_cnt_amt, Johnson_and_Johnson_cnt_amt, Bose_cnt_amt, Kellogs_cnt_amt,Sony_cnt_amt, Puma_cnt_amt],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  const data = {
    labels: ['USD', 'CAD'],
    datasets: [
      {
        label: '# of Votes',
        data: [USD, CAD],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',        
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',        
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="ChartModal">        
        <Modal 
            open={props.ChartOpen}
            onClose={props.handleChartClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                Chart Analytics View
                </Typography>
                <Grid container>
                    <Grid item xs={4}>
                        <div style={{height: "200px",width: "300px",marginLeft:"20px"}}>
                            <Pie data={data} options={{plugins:{title:{display: true,
                                text: 'Pie Chart for Currencies',}}}}
                            />
                        </div>
                    </Grid>
                    <Grid item >
                        <div style={{height: "300px",width: "400px",marginLeft:"100px"}}>
                            <Bar options={options} data={data1} />                
                        </div>
                    </Grid>
                </Grid>                                
                <Button style={{maxWidth: "250px",minWidth: "250px",marginTop:"50px"}} onClick={props.handleChartClose}>CANCEL</Button>                                                               
            </Box>
        </Modal>
    </div>
  );
}

export default ChartModal;
