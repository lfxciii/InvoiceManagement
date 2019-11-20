import React, { Component } from 'react';
import { Table } from 'reactstrap';

import InvoiceService from '../services/InvoiceService';

export default class InvoiceList extends Component {

    constructor(props) {
        super(props);

        this.state =
            {
                invoices: []
            };

        this.invoiceService = new InvoiceService();
    }

    async componentDidMount() {
        this.loadInvoices();
    }

    // delete invoice for id
    async deleteInvoice(e) {
        let response = await this.invoiceService.deleteInvoice(e.target.id)
            .catch(error => {
                alert(error);
                return false;
            });

        if (response.status !== 200) {
            alert("Unable to load invoice");
        } else {

            alert("Invoice deleted!");
            this.loadInvoices();
        }
    }

    // load invoice list
    async loadInvoices() {
        let response = await this.invoiceService.loadInvoices()
            .catch(error => {
                alert(error);
                return false;
            });

        if (response.status !== 200) {
            alert("Unable to load invoices");
        } else {

            const invoices = await response.json();

            this.setState({
                invoices: invoices
            });
        }
    }

    render() {

        const TableRows = (invoices) => {
            return invoices.invoices.map((invoice) => {
                return (
                    <tr key={invoice._id}>
                        <td>{invoice._id}</td>
                        <td>{invoice.customer[0].companyName}</td>
                        <td>{invoice.customer[0].accountNumber}</td>
                        <td>R {parseFloat(invoice.nettPrice).toFixed(2)}</td>
                        <td>R {parseFloat(invoice.vat).toFixed(2)}</td>
                        <td>R {parseFloat(invoice.totalAmount).toFixed(2)}</td>
                        <td>{invoice.created}</td>
                        <td><a id={invoice._id}
                            className="btn btn-warning"
                            href={`/invoices/${invoice._id}`}
                        >
                            Edit
                        </a></td>
                        <td><a id={invoice._id} className="btn btn-danger"
                            onClick={this.deleteInvoice.bind(this)}>
                            Delete
                        </a></td>
                    </tr>
                );
            });
        }

        return (
            <div className="pt-5">
                <h3 className="float-left">View Invoices</h3>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Invoice #</th>
                            <th>Customer</th>
                            <th>Account</th>
                            <th>Nett</th>
                            <th>Vat</th>
                            <th>Total</th>
                            <th>Created</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {(this.state.invoices.length > 0) ?
                            <TableRows invoices={[...this.state.invoices]} /> :
                            <tr>
                                <td colSpan="7">
                                    <p>No invoices found</p>
                                </td>
                            </tr>
                        }
                    </tbody>
                </Table>

            </div>
        );
    }
}