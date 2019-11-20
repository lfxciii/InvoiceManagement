import React, { Component } from 'react';
import { Navbar, NavDropdown, Button, FormControl, Form, Nav } from "react-bootstrap";
import CustomerService from '../services/CustomerService';

// this component handles the inputs and delegates submission to parent through props b
export default class CustomerSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeys: { },
            customers: []
        }

        this.customerService = new CustomerService();
    }

    // get customers from dropdown selection
    async componentDidMount() {
        let response = await this.customerService.loadCustomers()
            .catch(error => {
                alert(error);
                return false;
            });

        if (response.status !== 200) {
            alert("Unable to load customers");
        } else {

            const customers = await response.json();

            this.setState({
                ...this.state,
                customers: customers
            });
        }
    }

    // signal parent to search based on keywords
    searchTuneHandler() {
        // validation
        let searchKeys = { ...this.state.searchKeys };
        if (searchKeys.term === "" ||
            searchKeys.entity === "") {
            alert("Please enter a valid search term and a valid filter entity");
        } else {// notify parent            
            this.props.search({ ...this.state.searchKeys });
        }
    }

    // updates state entity from dropdowns
    searchEntityHandler(e) {
        this.setState({
            searchKeys: {
                ...this.state.searchKeys,
                entity: e.target.id
            }
        });
    }

    // updates state term
    searchTermHandler(e) {
        this.setState({
            searchKeys: {
                ...this.state.searchKeys,
                term: e.target.value
            }
        });
    }

    selectedCustomer(e) {
        // load customer from state
        const customer = this.state.customers.find((customer) => {
            return (customer._id === e.target.id)
        });

        // send to parent event
        this.props.selectedCustomer(customer);
    }

    render() {
        const DisplayCustomers = (customers) => {
            return customers.customers.map((customer) => {
                return (<NavDropdown.Item key={customer._id} onClick={this.selectedCustomer.bind(this)} id={customer._id} >{customer.companyName}</NavDropdown.Item>);
            });
        }

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home"><strong>Search for a customer</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown className="border rounded" title="Customer list" id="basic-nav-dropdown">
                            {(this.state.customers.length > 0) ?
                                <DisplayCustomers customers={[...this.state.customers]} /> :
                                <NavDropdown.Item id="nope">No customers found</NavDropdown.Item>
                            }                            
                        </NavDropdown>
                    </Nav>
                    <Form inline>
                        <FormControl type="text"
                            onChange={this.searchTermHandler.bind(this)}
                            placeholder="Search a term"
                            className="mr-sm-2" />
                        <Button
                            onClick={this.searchTuneHandler.bind(this)}
                            variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}