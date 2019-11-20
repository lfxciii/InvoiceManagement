import React, { Component } from 'react';
import {
    Form, FormGroup,
    Label,
    Input,
    Row,
    Col,
    Card,
    CardBody,
    CustomInput
} from 'reactstrap';

import CustomerSearch from '../components/CustomerSearch';
import InvoiceService from '../services/InvoiceService';
import CustomerService from '../services/CustomerService';
import InvoiceItems from '../components/InvoiceItems';

export default class InvoiceAdd extends Component {

    constructor(props) {
        super(props);

        this.state = {
            invoiceItems: [],
            nettPrice: 0,
            vat: 0,
            totalAmount: 0,
            customer: null,

        };

        this.invoiceService = new InvoiceService();
        this.customerService = new CustomerService();
    }

    // async componentDidMount() {
    //     let response = await this.customerService.loadCustomers()
    //         .catch(error => {
    //             alert(error);
    //             return false;
    //         });

    //     if (response.status !== 200) {
    //         alert("Unable to load customers");
    //     } else {

    //         const customers = await response.json();

    //         this.setState({
    //             ...this.state,
    //             customer: customers
    //         });
    //     }
    // }


    calculateInvoiceLines(invoiceItems) {
        let invoice = {
            nettPrice: 0,
            vat: 0,
            totalAmount: 0
        };

        let netP = 0.00;
        invoiceItems.map(element => {
            invoice.nettPrice += parseFloat(element.nettPrice);
        });

        invoice.vat = parseFloat(invoice.nettPrice) * 0.15;
        invoice.totalAmount = parseFloat(invoice.vat + invoice.nettPrice);
        return invoice;
    }

    addInvoice = async () => {

        if (this.state.invoiceItems.length === 0) {
            alert("Pleases add an invoice line");
            return;
        }

        const invoice = { ...this.state };

        let response = await this.invoiceService.addInvoice(invoice)
            .catch(error => {
                alert("Error occurred: " + error);
                return false;
            });

        if (response.status !== 201) {
            alert("Unable to save invoice")
        } else {
            alert("Invoice created!");
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

    selectedCustomer(cust) {
        this.setState({
            ...this.state,
            customer: cust
        });
    }

    render() {

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
                            <small className="float-left">USER CREATED: Logged in User</small>
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
                    <Row>
                        <Col md={6}>
                            <p></p>
                        </Col>
                        <Col md={6}>
                            <a className="btn btn-success mb-4 float-right"
                                onClick={this.addInvoice.bind(this)}>
                                Create Invoice</a>
                        </Col>
                    </Row>
                    <InvoiceItems
                        isEdit={false}
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
                <CustomerSearch selectedCustomer={this.selectedCustomer.bind(this)} />
                {displayInvoice}
            </div>

        );
    }
}