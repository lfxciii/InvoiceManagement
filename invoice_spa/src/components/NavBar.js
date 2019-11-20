import React, { Component } from "react";
import {
  Container, Row, Col, Navbar, Nav, NavLink, NavItem, DropdownItem,
  UncontrolledDropdown, DropdownToggle, DropdownMenu
} from "reactstrap";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.user = JSON.parse(sessionStorage.getItem("User"));
    this.AVATAR = "";
  }

  render() {

    return (
      <div>
        <Navbar
          fixed="top"
          color="light"
          light
          expand="xs"
          className="border-bottom border-gray bg-white"
          style={{ height: 60 }}
        >
          <Container>
            <Row
              noGutters
              className="position-relative w-100 align-items-center"
            >
              <Col className="d-none d-lg-flex justify-content-start">
                <Nav className="mrx-auto" navbar>
                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/">
                      Home
                    </NavLink>                    
                  </NavItem>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Manage Customers
                      </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="/customeradd">
                        Add
                        </DropdownItem>                    
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Manage Invoice
                      </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem href="/invoiceadd">
                        Add
                      </DropdownItem>
                      <DropdownItem href="/invoices">
                        View
                        </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <NavItem className="d-flex align-items-center">
                    <NavLink className="font-weight-bold" href="/cars/add">
                      Logout
                    </NavLink>
                    <NavLink className="font-weight-bold" href="/cars/older?years=5">
                      Profile
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </div>
    );
  }
}
