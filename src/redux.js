import {applyMiddleware, createStore} from "redux";
import {combineEpics, createEpicMiddleware} from "redux-observable";


export const ON_VIEWPORT_CHANGED = 'ON_VIEWPORT_CHANGED';

export const onViewportChanged = (args) => ({type: ON_VIEWPORT_CHANGED, args});

function buildRows() {
    return new Array(1500).fill().map((_, index) => ({
        index: index + 1
    }));
}

function rowsReducer(state = buildRows(), action) {
    switch (action.type) {
        default:
            return state;
    }
}

function populateRowsEpic(action$) {
    return action$.ofType(ON_VIEWPORT_CHANGED)
        .flatMap((/*{args: {firstRow, lastRow}}*/) => {
            return [];
        });
}

export const rootEpic = combineEpics(populateRowsEpic);

const epicMiddleware = createEpicMiddleware(rootEpic);


export const store = createStore(rowsReducer, applyMiddleware(epicMiddleware));
