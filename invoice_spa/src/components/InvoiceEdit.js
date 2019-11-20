import React, { Component } from 'react';
import {
    Form,
    Row,
    Col
} from 'reactstrap';

import CustomerSearch from '../components/CustomerSearch';
import InvoiceService from '../services/InvoiceService';
import CustomerService from '../services/CustomerService';
import InvoiceItems from '../components/InvoiceItems';

export default class InvoiceEdit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            invoiceItems: [],
            nettPrice: 0,
            vat: 0,
            totalAmount: 0,
            customer: null,
            user: null
        };

        this.invoiceService = new InvoiceService();
        this.customerService = new CustomerService();
    }

    // get invoice for id
    async componentDidMount() {
        let response = await this.invoiceService.loadInvoicesById(this.props.match.params.id)
            .catch(error => {
                alert(error);
                return false;
            });

        if (response.status !== 200) {
            alert("Unable to load invoice");
        } else {

            let invoice = await response.json();

            this.setState({
                nettPrice: invoice.nettPrice,
                vat: invoice.vat,
                totalAmount: invoice.totalAmount,
                invoiceItems: invoice.invoiceItems,
                customer: invoice.customer[0],
                user: invoice.user[0],
                _id: invoice._id
            });
        }
    }


    // calculate amount for invoice item
    calculateInvoiceLines(invoiceItems) {
        let invoice = {
            nettPrice: 0,
            vat: 0,
            totalAmount: 0
        };
        
        invoiceItems.map(element => {
            invoice.nettPrice += parseFloat(element.nettPrice);
        });

        invoice.vat = parseFloat(invoice.nettPrice) * 0.15;
        invoice.totalAmount = parseFloat(invoice.vat + invoice.nettPrice);
        return invoice;
    }

    // update invoice with new details
    updateInvoice = async () => {

        if (this.state.invoiceItems.length === 0) {
            alert("Pleases add an invoice line");
            return;
        }
        let invoice = { ...this.state };        
        let response = await this.invoiceService.updateInvoice(invoice)
            .catch(error => {
                alert("Error occurred: " + error);
                return false;
            });

        if (response.status !== 200) {
            alert("Unable to save invoice")
        } else {
            alert("Invoice updated!");
            window.location = "/invoices";
        }
    }

    // event handler for InvoiceItem component
    addInvoiceItem = (invoiceItems) => {
        let invoice = this.calculateInvoiceLines(invoiceItems);

        this.setState({
            ...invoice,
            invoiceItems: invoiceItems
        });
        alert(`Item added!`)
    }

    // properties update section
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // set selected customer
    selectedCustomer(cust) {
        this.setState({
            ...this.state,
            customer: cust
        });
    }

    render() {

        // displays invoice list
        let displayInvoice = null;
        if (this.state.customer === null) {
            displayInvoice = (<Row><Col><p>Please select a customer</p></Col></Row>);
        } else {
            displayInvoice = (
                <Form>
                    <Row form>
                        <Col >
                            <small className="float-left">TAX INVOICE</small>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    <Row form>
                        <Col >
                            <small className="float-left">VAT NO: {this.state.customer.vatNumber}</small>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    <Row form>
                        <Col >
                            <small className="float-left">USER CREATED: {this.state.user.name}</small>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    <Row form>
                        <Col >
                            <small className="float-left">INVOICE TO: {this.state.customer.companyName}</small>
                        </Col>
                        <Col><small className="float-left">DELIVER TO: {this.state.customer.companyName}</small></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    <Row form>
                        <Col >
                            <small className="float-left">{this.state.customer.billTo}</small>
                        </Col>
                        <Col><small className="float-left">{this.state.customer.deliverTo}</small></Col>
                        <Col></Col>
                        <Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <hr></hr>
                        </Col>
                    </Row>
                    <Row form>
                        <Col>
                            <a className="btn btn-success float-right mb-4"
                                onClick={this.updateInvoice.bind(this)}>
                                Update Invoice</a>
                        </Col>
                    </Row>
                    <InvoiceItems
                        isEdit={true}
                        invoiceItems={[...this.state.invoiceItems]}
                        addInvoiceItem={this.addInvoiceItem} />
                    <Row form>
                        <Col>
                        </Col>
                        <Col></Col>
                        <Col><small className="float-left">NETT PRICE: R {this.state.nettPrice}</small></Col>
                        <Col></Col>
                    </Row>
                    <Row form>
                        <Col>
                        </Col>
                        <Col></Col>
                        <Col><small className="float-left">VAT: R {this.state.vat}</small></Col>
                        <Col></Col>
                    </Row>
                    <Row form>
                        <Col>
                        </Col>
                        <Col></Col>
                        <Col><small className="float-left">TOTAL: R {this.state.totalAmount} </small></Col>
                        <Col></Col>
                    </Row>
                    <br></br>
                </Form>);
        }

        return (
            <div>
                <p></p>
                {displayInvoice}
            </div>
        );
    }
}