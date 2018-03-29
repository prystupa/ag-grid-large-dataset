import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

function buildRows() {
    return new Array(1500).fill({});
}

ReactDOM.render(<App rows={buildRows()} />, document.getElementById('root'));
registerServiceWorker();
