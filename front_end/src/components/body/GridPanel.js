import React from "react";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import GridHeader from "./GridHeader";

/**
 * This is GridPanel : a part of body component
 * body component is divided in 2 parts(GridHeader and GridPanel)
 * This contains..
 * Datagrid(Datafetching and pagination logic) 
 * and it calls GridHeader
 * 
 * NOTE: ALL UI SCREENSHOT ARE IN THE SRC/RESOURCES/UI-ScreenShots folder
*/

//labels for datagrid columns
const columns = [
  { field: "id", headerName: "Sl no" },
  {
    field: "business_code",
    headerName: "Business Code",
    width: 150,
  },
  {
    field: "cust_number",
    headerName: "Customer Number",
    width: 150,
  },
  {
    field: "clear_date",
    headerName: "Clear Date",
    width: 150,
  },
  {
    field: "buisness_year",
    headerName: "Bussiness Year",
    width: 150,
  },
  {
    field: "doc_id",
    headerName: "Document Id",
  },
  {
    field: "posting_date",
    headerName: "Posting Date",
    width: 150,
  },
  {
    field: "document_create_date",
    headerName: "Document Create Date",
    width: 200,
  },
  {
    field: "due_in_date",
    headerName: "Due Date",
    width: 150,
  },
  {
    field: "invoice_currency",
    headerName: "Invoice Currency",
    width: 150,
  },
  {
    field: "document_type",
    headerName: "Document Type",
    width: 150,
  },
  {
    field: "posting_id",
    headerName: "Posting Id",
  },
  {
    field: "total_open_amount",
    headerName: "Total Open Amount",
    width: 150,
  },
  {
    field: "baseline_create_date",
    headerName: "Baseline Create Date",
    width: 170,
  },
  {
    field: "cust_payment_terms",
    headerName: "Customer Payment Terms",
    width: 200,
  },
  {
    field: "invoice_id",
    headerName: "Invoice Id",
  },
  {
    field: "aging_bucket",
    headerName: "Aging Bucket",
  },
];

function GridPanel() {
  const [tableData, setTableData] = useState([]);
  const [selectedRows, setselectedRows] = useState([]);
  const [selectedRowData, setselectedRowData] = useState([]);  
  const [isDisabled, setisDisabled] = React.useState(true);
  const [isDisabled_Del_Pred, setisDisabled_Del_Pred] = React.useState(true);
  const [pageSize, setpageSize] = useState(5);
  const [page, setpage] = useState(0);
  const [value, setValue] = React.useState("");

  var api = axios.create({
    baseURL: "http://localhost:8080/HRC_FINAL",
  });

  //for handling onPageSizeChange
  function handlePageSizeChange(pgSize) {
    setpageSize(pgSize);
    setpage(0);
    api
      .get("/GetInvoice", {
        params: { cust_number: value, page: 0, pageSize: pgSize },
      })
      .then((response) => {
        console.log("after fetch : ", response, page, pgSize);
        setTableData(response.data);
      });
  }

  //for handling onPageChange
  function handlePageChange(pg) {
    console.log(pg);
    api
      .get("/GetInvoice", {
        params: { cust_number: value, page: pg, pageSize: pageSize },
      })
      .then((response) => {
        console.log("after fetch : ", response, pg, pageSize);
        setpage(pg);
        setTableData(response.data);
      });
  }

  //for handling onSelectionModelChange
  function handleModelChange(idx) {
    const selectedIDs = new Set(idx);
    var selectedRowData = tableData.filter((row) => selectedIDs.has(row.id));       
    
    console.log(idx);
    console.log(selectedRowData);    

    if (idx.length !== 1) setisDisabled(true);
    else setisDisabled(false);

    if (idx.length >= 1) setisDisabled_Del_Pred(false);
    else setisDisabled_Del_Pred(true);
    
    setselectedRows(idx);
    setselectedRowData(selectedRowData);
  }
  
  //initial fetch from backend(called only once on every browser refresh)
  useEffect(() => {
    api
      .get("/GetInvoice", {
        params: { cust_number: value, page: 0, pageSize: 5 },
      })
      .then((response) => {
        console.log(response);
        setTableData(response.data);
      });
  }, []);

  return (
    <div className="GridPanel">
      <Box border={0}>
        <GridHeader
          setTableData={setTableData}
          selectedRows={selectedRows}
          selectedRowData={selectedRowData}
          setpage={setpage}
          setpageSize={setpageSize}
          pageSize={pageSize}
          isDisabled={isDisabled}
          isDisabled_Del_Pred={isDisabled_Del_Pred}                              
          value={value}
          setValue={setValue}
        />
        <div className="GridBody">
          <Box>
            <div style={{ height: 500, width: "101%" }}>
              <DataGrid
                rows={tableData}
                columns={columns}
                rowCount={50000}
                page={page}
                pageSize={pageSize}
                onPageSizeChange={(pageSize) => {
                  handlePageSizeChange(pageSize);
                }}
                onPageChange={(page) => handlePageChange(page)}
                rowsPerPageOptions={[5, 50, 100]}
                checkboxSelection
                disableSelectionOnClick
                headerHeight={80}
                style={{ color: "white" }}
                onSelectionModelChange={handleModelChange}
                pagination
                paginationMode="server"
              />
            </div>
          </Box>
        </div>
      </Box>
    </div>
  );
}

export default GridPanel;
