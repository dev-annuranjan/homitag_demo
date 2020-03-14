import React from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import { reducer } from "./store/reducer";
import LandingPage from "./landingPage";
import FormComponent from "./form";

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Route path="/" exact component={LandingPage} />
          <Route path="/form" component={FormComponent} />
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
