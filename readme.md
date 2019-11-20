### ###################################################### ###
### ################### ARCHITECTURE ##################### ###
### ###################################################### ###

. Frameworks - ReactJs, MongoDB, Mongoose, Express
. Security - Token authentication int browser cookie
. Create-react-app used for front end template
. node-express-mongo used to back end template
. reactstrap and bootstrap will be used for styling components
. React application request to Express server using Mongoose to interact with mongodb

### INTRODUCTION ###

. This piece of software is used to create, view, edit and delete invoices. 
. Invoices are linked to customers which has addresses
. Email functionality will be implemented 

### ###################################################### ###
### ################### REQUIREMENTS ##################### ###
### ###################################################### ###

### FUNCTIONAL REQUIREMENTS ###
. Create customer
. Edit customer
. Create invoice
. Edit invoice
. Delete invoice
. View invoices
. Login - facebook, google, local
. send invoice as email (not required for now)
. user login
. user register

### USER STORIES ###

. Customer
    . as a user, i want to capture the following details for the customer:
        . name
        . company name
        . vat number
        . contact numbers
        . account number        
        . date created
        . _id created
        . invoce number _id,
        . bill to address
        . deliver to address
        . emal
        to create a customer

. Invoice 
    . as a user, i want to capture the following details for an invoice:
        . date created
        . invoice number _id
        . invoice items
        . nett price
        . vat 
        . total amount,
        to create an invoice

    . as a user, i want to delete an invoice    
    . as a user, i want to edit an invoice

. Invoice Item
    . as a user, i want to capture the following details for an invoice item:        
        . item description        
        . unit price
        . quantity
        . nett price       
        . vat 
        . total amount    
        
. User
    . as a user, i want the following details captured:
        . user id _id
        . first name
        . last name
        . created date
        . role
        . email
        . contact number
        
    . as a user, i want to login using google, facebook, local
    . as a user, i want to be registered if i dont exist
    . as a user, if i dont have a company name and address, i need to be prompt to insert these


### NON FUNCTIONAL REQUIREMENTS ###
. Deploy to Heroku - really having a hard time deploying this thing. still investigating whats wrong.
. idea is to deploy back-end and front-end seperately
. this is if i only want to deploy the back-end for mobile use without the front-end

### HOW TO USE ###
. very simple invoice system i plan to extend in future for a customer.
. you can add customers
. view invoices
. edit invoices
. add invoices
. all invoices will be linked to a customer selected
. all invoices will be linked to user thats logged in

### INSTALL ###
. navigate to invoicemanagement then type npm install
. navigate to invoice_spa then type npm install
. navifate to invoice_pi then type npm install

### START ###
. navigate to invoicemanagement then type npm start, client and server starts up at the same time

### SEEDING ###
. seeing is enabled by setting seedDB = true in invoices_api/config/environment/development.js

### TEST ### 
. navigate to invoice_spa and type npm test

### SECURITY ### 
. token authentication with encryption of private key
. if token cant be validated, request is unauthorized 401
. if a user logs in that doesnt exist, they will be created on the system

### THIRD PARTY LIBRARIES ###
. google
. node-express-mongo template
. create-react-app template
. chai and mocha for testing
. request for making requests in tests
. reactstrap and bootstrap for ui styling and layouts