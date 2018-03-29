import React from "react";
import {AgGridReact} from "ag-grid-react";
import {connect} from "react-redux";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-bootstrap.css";


class App extends React.Component {
    render() {
        const {rows} = this.props;

        return (
            <div className="ag-theme-bootstrap" style={{height: '100%'}}>
                <AgGridReact rowData={rows}
                             columnDefs={[{
                                 headerName: 'Index',
                                 field: 'index'
                             }, {
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

const mapStateToProps = (state) => {
    return ({
        rows: state
    });
};

export default connect(mapStateToProps, null)(App);
