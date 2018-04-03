import {applyMiddleware, createStore} from "redux";
import {combineEpics, createEpicMiddleware} from "redux-observable";


export const ON_VIEWPORT_CHANGED = 'ON_VIEWPORT_CHANGED';
export const RECEIVED_ROWS = 'RECEIVED_ROWS';

export const onViewportChanged = (args) => ({type: ON_VIEWPORT_CHANGED, args});
export const receivedRows = (firstRow, rows) => ({type: RECEIVED_ROWS, firstRow, rows});

function buildRows() {
    return new Array(15000).fill().map((_, index) => ({
        index: index + 1
    }));
}

function rowsReducer(state = buildRows(), action) {
    switch (action.type) {
        case RECEIVED_ROWS: {
            const initialRows = state;
            const {firstRow, rows} = action;
            return [
                ...initialRows.slice(0, firstRow),
                ...rows,
                ...initialRows.slice(firstRow + rows.length)
            ];
        }
        default:
            return state;
    }
}

function fullyLoaded(rows, firstRow, lastRow) {
    if (lastRow < firstRow) {
        return true;
    }

    return rows[firstRow]._isLoaded && rows[lastRow]._isLoaded;
}

function buildLoadedRows(firstRow, lastRow) {
    const length = lastRow - firstRow + 1;
    return new Array(length).fill().map((_, index) => {
        const rowIndex = index + firstRow + 1;
        return ({
            _isLoaded: true,
            index: rowIndex,
            name: `Name ${rowIndex}`,
            field1: `Field 1 (${rowIndex})`,
            field2: `Field 2 (${rowIndex})`
        });
    });
}

function populateRowsEpic(action$, store) {

    return action$.ofType(ON_VIEWPORT_CHANGED)
        .flatMap(({args: {firstRow, lastRow}}) => {
            const rows = store.getState();
            if (fullyLoaded(rows, firstRow, lastRow)) {
                return [];
            } else {
                return [receivedRows(firstRow, buildLoadedRows(firstRow, lastRow))];
            }
        });
}

export const rootEpic = combineEpics(populateRowsEpic);

const epicMiddleware = createEpicMiddleware(rootEpic);


export const store = createStore(rowsReducer, applyMiddleware(epicMiddleware));
