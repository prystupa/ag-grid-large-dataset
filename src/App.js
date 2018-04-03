import React from "react";
import PropTypes from "prop-types";
import {AgGridReact} from "ag-grid-react";
import {connect} from "react-redux";
import "ag-grid/dist/styles/ag-grid.css";
import "ag-grid/dist/styles/ag-theme-bootstrap.css";
import {onViewportChanged} from "./redux";


function getRowNodeId(row) {
    return row.index;
}

class App extends React.Component {
    render() {
        const {rows, onViewportChanged} = this.props;


        const columnDefs = [{
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
        }];

        return (
            <div className="ag-theme-bootstrap" style={{height: '100%'}}>
                <AgGridReact rowData={rows}
                             deltaRowDataMode={true}
                             getRowNodeId={getRowNodeId}
                             columnDefs={columnDefs}
                             onViewportChanged={onViewportChanged}
                />
            </div>
        );
    }
}

App.propTypes = {
    rows: PropTypes.array.isRequired,
    onViewportChanged: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return ({
        rows: state
    });
};

const mapDispatchToProps = (dispatch) => {
    return ({
        onViewportChanged: (args) => dispatch(onViewportChanged(args))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
