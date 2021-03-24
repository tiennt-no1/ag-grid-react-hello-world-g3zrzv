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
      .then(rowData => {console.log(rowData) ; setRowData(rowData)})
  }, []);



  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }

  const onButtonClick = e => {
    const selectedNodes = gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data )
    const selectedDataStringPresentation = selectedData.map( node => `${node.make} ${node.model}`).join(', ')
    alert(`Selected nodes: ${selectedDataStringPresentation}`)
}

  return (
    
    <div className="ag-theme-material" style={{ height: 400, width: 600 }}>
      <button onClick={onButtonClick}>Get selected rows</button>
      <AgGridReact onGridReady={onGridReady} rowData={rowData} rowSelection="multiple">
        <AgGridColumn field="make" sortable={true}  checkboxSelection={ true } />
        <AgGridColumn field="model" filter={true} />
        <AgGridColumn field="price" />
      </AgGridReact>
    </div>
  );
};

render(<App />, document.getElementById("root"));
