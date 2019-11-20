// this class makes requests to server (express) for stuff

export default class CustomerService {
    loadCustomers = () => {
      return fetch("/api/customers", {
        method: "GET"
      })
    };
  
    loadCustomerByCustomerId = (id) => {
      return fetch(`/api/customers/${id}`, {
        method: "GET"
      })
    }
  
    updateCustomer = customer => {
      // Default options are marked with *     
      return fetch("/api/customers", {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(customer)
      });     
    } 
  
    addCustomer = customer => {
      // Default options are marked with *     
      return fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(customer)
      });     
    } 
  }
  
  