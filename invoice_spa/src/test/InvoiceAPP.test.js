//getCityWeatherHandler snapshot test
import React from 'react';
import Login from '../components/Login';

import renderer from 'react-test-renderer';
// var expect  = require('chai').expect;

var request = require('request');

test("test invoice render", () => {
    const tree = renderer
        .create(<Login />)
        .toJSON();

    expect(tree).toMatchSnapshot();
});

it('load invoices ', function(done) {
    request('http://localhost:9000/api/invoices' , function(error, response, body) {
        expect(401);
        done();
    });
});

it('load customers ', function(done) {
    request('http://localhost:9000/api/customers' , function(error, response, body) {
        expect(401);
        done();
    });
});

// test("load invoices", () => {
//     let service = new InvoiceService();

//     return service.loadInvoices()
//     .then(result => result.json())
//     .then((result) =>  {
//         expect(result.cod)
//             .toBe("200");
//     });
// });

// test("get list of customers", () => {
//     let service = new CustomerService();

//     return service.loadCustomers()
//     .then(result => result.json())
//     .then((result) =>  {
//         expect(result.cod)
//             .toBe("200");
//     });
// });