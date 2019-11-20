### ############################################################ ###
### THIS PIECE OF SOFTWARE USES THE FOLLOWING PATTERNS and FLOWS

. strategies are created, local, google
. local and google will authenticate the caller and provide a token. 
. tokens are written to cookies and validated against the server with a secret key
. i didnt understand how to implement the passport middelware for jwt, so i wrote my own middelware

### USERS ###
. users are seeded and linked to some todo items. very handy for testing.
. you need to set seed = true in the config. start the server to seed users. then copy user _id into todo items userid (i use compass). remember to set seed = false else you will keep seeding users and not have them linked to items.

### INSTALL ### 
. navigate to todo folder, run npm install
. navigate to todo\public, run npm install

### START ###
. navigate to todo folder, run npm start. both client and server will run

### REQUIREMENTS ###
. User log into using 
    . local
    . google

. user to do items saved to db
. cookie sessions enable
. admin see list of users and their to do items

### RELEASE ###

### REACT ###
. create
. delete
. list view

### API ###
. create item
. delete item
. login to google (need to implement some component)
. !admin list only logged in user and its items
. admin list all users and all items
. token authentication
. token cookie
. login to local