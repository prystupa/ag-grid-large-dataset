import {createStore} from "redux";

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

export const store = createStore(rowsReducer);
