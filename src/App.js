import React from 'react';
import {AgGridReact} from 'ag-grid-react';
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-bootstrap.css";


class App extends React.Component {
    render() {
        const {rows} = this.props;

        return (
            <div className="ag-theme-bootstrap" style={{height: '100%'}}>
                <AgGridReact rowData={rows}
                             columnDefs={[{
                                 headerName: 'Name',
                                 field: 'name'
                             }, {
                                 headerName: 'Other column 1',
                                 field: 'field1'
                             }, {
                                 headerName: 'Other column 2',
                                 field: 'field2'
                             }]}/>
            </div>
        );
    }
}

export default App;
