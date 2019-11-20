// this class makes requests to server (express) for stuff

export default class InvoiceService {
  loadInvoices = () => {
    return fetch("/api/invoices", {
      method: "GET"
    })
  };

  loadInvoicesById = (id) => {
    return fetch(`/api/invoices/${id}`, {
      method: "GET"
    })
  }

  deleteInvoice = id => {
    // Default options are marked with *     
    return fetch(`/api/invoices/${id}`, {
      method: "DELETE"
    });     
  } 

  updateInvoice = invoice => {
    // Default options are marked with *     
    return fetch(`/api/invoices`, {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(invoice)
    });     
  } 

  addInvoice = invoice => {
    // Default options are marked with *     
    return fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(invoice)
    });     
  } 
}

