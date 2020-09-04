import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import { reducer } from "./store/reducer";
import LandingPage from "./landingPage";
import FormComponent from "./form";

const store = createStore(reducer);

const ProtectedRoute = () => {
  const state= store.getState();
  return state.loggedInUserName ? <Route path="/form" component={FormComponent} /> : <Redirect to="/" />
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <ProtectedRoute path="/form" component={FormComponent} />
          </Switch>
        </MuiPickersUtilsProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
