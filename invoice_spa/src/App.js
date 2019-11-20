import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import InvoiceList from './components/InvoiceList';
import Login from './components/Login';
import CustomerAdd from './components/CustomerAdd';
import InvoiceAdd from './components/InvoiceAdd';
import InvoiceEdit from './components/InvoiceEdit';

function App() {
  return (
    <div className="App container rounded shadow w-100">
      <Header />
      <div className="pt-5">
        <BrowserRouter>
          {/* ROUTIES */}

          <Route
            exact={true}
            path="/"
            component={Login}
          />
          <Route
            exact={true}
            path="/loggedin"
            component={InvoiceList}
          />
          <Route
            exact={true}
            path="/customeradd"
            component={CustomerAdd}
          />
          <Route
            exact={true}
            path="/invoiceadd"
            component={InvoiceAdd}
          />
          <Route
            exact={true}
            path="/invoices"
            component={InvoiceList}
          />
          <Route
            exact={true}
            path="/invoices/:id"
            component={InvoiceEdit}
          />
          {/* <Route
                        exact={true}
                        path="/loggedin"
                        component={Invoice}
                    />                     */}
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
