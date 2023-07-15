# INTRO
This is a website with basic features like Register, signIn, signOut. Users can send a URL from a website through https request and it detects a person’s face with making a square from image using ClariFai API.
How to use:
First clone the “smart_brain_backend” on your machine and run `npm start` to run the backend on port 3000. Then clone the “smart_brain_frontend” and run ` npm start` and click Yes to run frontend on port 3001. You also need to create your own database. In the “smart_brain_backend” > server.js file connect your database to the server by changing the database password and ports according to yours.

# CREATING DATABASE
I used PostgreSQL to build the database with name of “smart-brain”. You need 2 tables with names “users” and “login”. 
• In “login” table you need to make: ‘id’  `INTEGER PRIMARY KEY`, ‘hash’ `VARCHAR(100) NOT NULL`, ‘email’ `TEXT UNIQUE NOT NULL`. 
• For “users” table: ‘id’ `INTEGER NOT NULL PRIMARY KEY`, ‘name’ `varchar(100)`, ‘email’ `TEXT UNIQUE NOT NULL`, ‘entries’ `BIGINT`, ‘joined’ `timestamp`.
