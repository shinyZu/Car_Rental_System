import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function MyTable(props) {
  console.log(props);
  return (
    <DataGrid
      rows={props.rows}
      columns={props.columns}
      pageSize={props.pageSize}
      rowsPerPageOptions={[props.rowsPerPageOptions]}
      checkboxSelection={props.checkboxSelection}
    />
    // <h1>Table</h1>
  );
}

export default MyTable;
