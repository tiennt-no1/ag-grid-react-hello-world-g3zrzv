import React, { useState, useEffect } from "react";
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
    console.log('fetch ')
    fetch('https://www.ag-grid.com/example-assets/row-data.json')
      .then(result => result.json())
      .then(rowData => { console.log(rowData); setRowData(rowData) })
  }, []);



  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const showSelectedNodes = e => {
    const selectedNodes = gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    const selectedDataStringPresentation = selectedData.map(node => `${node.make} ${node.model}`).join(', ')
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
  }

  const clearButtonClick = e => {
    gridApi.deselectAll()
  }

  const gridOptions = {
    rowData: rowData,
    rowSelection: 'mutiple',
    onGridReady: onGridReady,
    groupSelectsChildren: true,
    autoGroupColumnDef: {
      headerName: "Model",
      field: "model",
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true
      }
    }
  }

  return (

    <div className="ag-theme-material" style={{ height: 400, width: 600 }}>
      <button onClick={showSelectedNodes}>Get selected rows</button>
      <button onClick={clearButtonClick}>Clear Selection</button>
      <AgGridReact gridOptions={gridOptions}>
        <AgGridColumn field="make" sortable={true} checkboxSelection={true} rowGroup={true} />
        <AgGridColumn field="model" filter={true} />
        <AgGridColumn field="price" />
      </AgGridReact>
    </div >
  );
};

render(<App />, document.getElementById("root"));
