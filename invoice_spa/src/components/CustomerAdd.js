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

import CustomerService from '../services/CustomerService';

export default class CustomerAdd extends Component {

    constructor(props) {
        super(props);

        this.state =
            {
                customer: null,
                name: "",
                companyName: "",
                vatNumber: "",
                contactNumber: "",
                accountNumber: "",
                billTo: "",
                deliverTo: "",
                email: ""
            };

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

    //         const invoices = await response.json();

    //         this.setState({
    //             invoices: invoices
    //         });
    //     }
    // }

    addCustomer = async () => {
        const customer = { ...this.state };

        let response = await this.customerService.addCustomer(customer)
            .catch(error => {
                alert("Error occurred: " + error);
                return false;
            });

        if (response.status !== 201) {
            alert("Unable to save customer")
        } else {
            alert("Customer created!");
        }
    }

    // properties update section
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <Form className="pt-5">

                <Row form>
                    <Col >
                        <h4>Create a Customer</h4>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <Card>
                            <CardBody className="bg-light">
                                <CustomInput className="float-left" type="checkbox" id="newsletter" label={<strong>Send news letter</strong>} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br></br>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label className="font-weight-bold float-left" name="name" for="name">Name</Label>
                            <Input type="email" name="email" id="name" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label className="font-weight-bold float-left" name="companyName" for="companyName">Company Name</Label>
                            <Input type="password" name="password" id="companyName" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label className="font-weight-bold float-left" name="vatNumber" for="vatNumber">Vat Number</Label>
                            <Input type="email" name="email" id="vatNumber" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label className="font-weight-bold float-left" name="contactNumber" for="contactNumber">Contact Number</Label>
                            <Input type="password" name="password" id="contactNumber" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label className="font-weight-bold float-left" name="accountNumber" for="accountNumber">Account Number</Label>
                            <Input type="email" name="email" id="accountNumber" placeholder="" />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label className="font-weight-bold float-left" name="email" for="email">Email</Label>
                            <Input type="password" name="password" id="email" placeholder="" />
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup>
                    <Label className="font-weight-bold float-left" name="deliverTo" for="deliverTo">Deliver to</Label>
                    <Input type="text" name="address2" id="deliverTo" placeholder="Apartment, studio, or floor" />
                </FormGroup>
                <FormGroup>
                    <Label className="font-weight-bold float-left" name="billTo" for="billTo">Bill to</Label>
                    <Input type="text" name="address2" id="billTo" placeholder="Apartment, studio, or floor" />
                </FormGroup>
                <Row>
                    <Col md={6}>
                        <Card>
                            <CardBody className="bg-light">
                                <CustomInput className="float-left" type="checkbox" id="mailinvoices" label={<strong>Mail invoices</strong>} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <a className="btn btn-success w-75 h-75"
                            onClick={this.addCustomer.bind(this)}>
                            Create Customer</a>
                    </Col>
                </Row>
            </Form>
        );
    }
}