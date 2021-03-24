import React, { useState } from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material";

const App = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData))
  }, []);



  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  return (
    <div className="ag-theme-material" style={{ height: 400, width: 600 }}>
      <AgGridReact onGridReady={onGridReady} rowData={rowData}>
        <AgGridColumn field="make" sortable={true} />
        <AgGridColumn field="model" filter={true} />
        <AgGridColumn field="price" />
      </AgGridReact>
    </div>
  );
};

render(<App />, document.getElementById("root"));
