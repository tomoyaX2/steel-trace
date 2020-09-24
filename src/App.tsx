import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import './assets/app.css';
import Navigator from './modules/Navigator/Navigator';
import configureStore from './store'

const store = configureStore();

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navigator />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
