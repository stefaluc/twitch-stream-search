import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App';
import './main.css';
import { Provider } from 'react-redux';
import Store from './store';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const StoreInstance = Store();

ReactDOM.render(
  <Provider store={StoreInstance}>
    <MuiThemeProvider>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
