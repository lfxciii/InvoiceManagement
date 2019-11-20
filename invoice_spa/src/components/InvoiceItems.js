import React, { Component } from "react";
import {
  Form, FormGroup,
  Label,
  Input,
  Row,
  Col,
  Table,
  Card,
  CardBody,
  CustomInput
} from 'reactstrap';

// can refactor this into a functional component implementing state hooks
export default class InvoiceItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      invoiceItems: [],
      itemDescription: "",
      unitPrice: 0,
      quantity: 0,
      nettPrice: 0,
      vat: 15,
      totalVat: 0
    };
  }

  calculateInvoiceLine(line) {
    line.nettPrice = parseFloat(line.unitPrice) * parseFloat(line.quantity);
    line.totalVat = parseFloat(line.nettPrice) * parseFloat((line.vat / 100));
    return line;
  }

  componentDidMount() {
    if (this.props.isEdit === true) {
      // save invoiceItems for modification
      this.setState({
        ...this.state,
        invoiceItems: this.props.invoiceItems
      })
    }
  }

  // adds invoice to state items and sends invoice item list to parent
  // clears current invoice state
  addInvoiceItem() {
    let invoiceItems = [...this.state.invoiceItems];
    let newInvoiceItem = { ...this.state };

    if (newInvoiceItem.itemDescription === "") {
      alert("Please specfy at least an item description");
      return;
    }

    delete newInvoiceItem.invoiceItems;

    newInvoiceItem = this.calculateInvoiceLine(newInvoiceItem);
    invoiceItems.push(newInvoiceItem);

    this.setState({
      itemDescription: "",
      unitPrice: 0,
      quantity: 0,
      nettPrice: 0,
      vat: 15,
      totalVat: 0,
      invoiceItems: [...invoiceItems]
    })

    this.props.addInvoiceItem([...invoiceItems]);
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const TableRows = (items) => {
      return items.invoiceItems.map((item, index) => {
        return (
          <tr key={index}>
            <td>{item.itemDescription}</td>
            <td>R {parseFloat(item.unitPrice).toFixed(2)}</td>
            <td>{parseFloat(item.quantity).toFixed(2)}</td>
            <td>R {parseFloat(item.nettPrice).toFixed(2)}</td>
            <td>{item.vat} %</td>
            <td>R {parseFloat(item.totalVat).toFixed(2)}</td>
          </tr>
        );
      });

    }

    let list = null;
    if (this.props.invoiceItems.length === 0) {
      list = <p>No items available</p>
    } else {
      list = (<div>
        <h3>Line items</h3>
        <Table striped>
          <thead>
            <tr>
              {/* <th>Invoice #</th> */}
              <th>Item Description</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Nett Price</th>
              <th>Vat</th>
              <th>Total Vat</th>
            </tr>
          </thead>
          <tbody>
            {(this.props.invoiceItems.length > 0) ?
              <TableRows invoiceItems={[...this.props.invoiceItems]} /> :
              <tr>
                <td colSpan="7">
                  <p>No invoices found</p>
                </td>
              </tr>
            }
          </tbody>
        </Table>
        <hr></hr>
      </div>);
    }

    return (
      <div>       
        <a className="btn btn-success float-right"
          onClick={this.addInvoiceItem.bind(this)}>
          Add Item</a>
        <br></br>
        <FormGroup>
          <Label className="font-weight-bold float-left" name="itemDescription" for="itemdescription">Item description</Label>
          <Input type="text" onChange={this.handleChange.bind(this)} name="itemDescription" id="itemdescription" placeholder="" />
        </FormGroup>
        <Row form>
          <Col md={4}>
            <FormGroup>
              <Label className="font-weight-bold float-left" name="unitprice" for="unitprice">Unit price (R)</Label>
              <Input type="number" onChange={this.handleChange.bind(this)} name="unitPrice" id="unitprice" placeholder="" />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label className="font-weight-bold float-left" name="quantity" for="quantity">Quantity</Label>
              <Input type="number" onChange={this.handleChange.bind(this)} name="quantity" id="quantity" placeholder="" />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
              <Label className="font-weight-bold float-left" name="vat" for="vat">Vat</Label>
              <Input type="number" onChange={this.handleChange.bind(this)} name="vat" id="vat" placeholder="" />
            </FormGroup>
          </Col>
        </Row>
        {list}
      </div>
    );
  }
}
