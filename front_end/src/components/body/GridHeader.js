import React from "react";
import { Box, Grid,Button,ButtonGroup,TextField } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import AddModal from "../modals/AddModal";
import EditModal from "../modals/EditModal";
import DeleteModal from "../modals/DeleteModal";
import AdvSearchModal from "../modals/AdvSearchModal";
import AnalyticsModal from "../modals/AnalyticsModal";

/**
 * This is GridHeader : a part of body component
 * body component is divided in 2 parts(GridHeader and GridPanel)
 * This contains..
 * All the buttons and it's modals 
 * and it calls them
 * 
 * NOTE: ALL UI SCREENSHOT ARE IN THE SRC/RESOURCES/UI-ScreenShots folder
*/

const theme = createTheme({
  palette: {
    primary: {
      main: "#304454",
      contrastText: "#fff",
    },
  },
});

const initState = {
  business_code: "",
  cust_number: "",
  name_customer:"", 
  clear_date: "",
  buisness_year: "",
  doc_id: "",
  posting_date: "",  
  due_in_date: "",  
  baseline_create_date: "",
  cust_payment_terms: "",
  converted_usd: "",
};

function GridHeader(props) { 
     
  var api = axios.create({
    baseURL: "http://localhost:8080/HRC_FINAL",
  });
  var flaskapi = axios.create({
    baseURL: "http://127.0.0.1:5000",
  });

  //for handling onChange for search customer id field
  const handleChange =(e)=>
  {        
    props.setpage(0);
    props.setValue(e.target.value);
    console.log(e.target.value)

    api
      .get("/GetInvoice", {
        params: { cust_number: e.target.value ,page:0,pageSize:props.pageSize},
      })
      .then((response) => {
        console.log(response);
        props.setTableData(response.data);
      });
  }

  //for handling onClick for refresh button
  function handleRefresh() {
    props.setpageSize(5);
    props.setpage(0);
    api
      .get("/GetInvoice", {
        params: { cust_number: "" ,page:0,pageSize:5},
      })
      .then((response) => {
        console.log(response);
        props.setTableData(response.data);
      });    
  }

  //for handling onClick for predict button
  async function handlePredict()
  {       
    const aging_bucket=[];
    const forLoop = async _ =>{
      for await(const element of props.selectedRowData) 
      {
        initState.business_code=element.business_code;
        initState.cust_number=element.cust_number;
        initState.name_customer=element.name_customer ;
        initState.clear_date=element.clear_date===undefined?"1970-01-01":element.clear_date ;
        initState.buisness_year=element.buisness_year ;
        initState.doc_id=element.doc_id;
        initState.posting_date=element.posting_date;
        initState.due_in_date=element.due_in_date;
        initState.baseline_create_date=element.baseline_create_date;
        initState.cust_payment_terms=element.cust_payment_terms;
        initState.converted_usd = (element.invoice_currency==="USD"?element.total_open_amount:(element.total_open_amount*0.7).toFixed(2));

        //console.log("initstate...",initState);

        await flaskapi.post("/", {
          ...initState
        })
        .then((response) => {
          //console.log('response...',response,response.data[0].aging_bucket);
          aging_bucket.push(response.data[0].aging_bucket)            
        });
      };    
    }
    await forLoop();

    console.log("outside for await loop ..",aging_bucket);
    const jsonidx=JSON.stringify(Object.assign({},props.selectedRows));
    const json=JSON.stringify(Object.assign({},aging_bucket))
    console.log(jsonidx)    
    console.log("stringify..",json)    
    
    api.get("/Predict", {
      params: {rows:jsonidx,aging_bucket:json},
    })
    .then(()=>console.log("backend updated"))    
    .catch((err) => console.log("Error ...", err));
  }

  return (
    <div className="GridHeader">
      <Box fontSize={50}>Invoice List</Box>
      <Box>
        <Grid container spacing={1}>
          <Grid item>
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button disabled={props.isDisabled_Del_Pred} onClick={handlePredict}>PREDICT</Button>
              <ThemeProvider theme={theme}>
                <AnalyticsModal />
                <AdvSearchModal setTableData={props.setTableData}/>
              </ThemeProvider>
            </ButtonGroup>
          </Grid>
          <Grid item xs={3}>
            <Grid container spacing={1}>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={handleRefresh}
                />
              </Grid>
              <Grid item>
                <TextField
                  name="cust_number"
                  label="Search Custumer Id"
                  type="search"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                  }}
                  value={props.value}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ThemeProvider theme={theme}>
              <ButtonGroup 
                variant="contained"
                aria-label="outlined primary button group"
              >
                <AddModal />
                <EditModal selectedRows={props.selectedRows} isDisabled={props.isDisabled} selectedRowData={props.selectedRowData}/>
                <DeleteModal selectedRows={props.selectedRows} isDisabled_Del_Pred={props.isDisabled_Del_Pred} />
              </ButtonGroup>
            </ThemeProvider>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default GridHeader;
