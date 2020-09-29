# Stageman
## Setup
### Initialization
Install Server dependencies `npm install`
Install nodemon `npm install -g nodemon`
#### Setup Database
Name the database "stage"
and create a user andybalze to access the database
grant user select and insert priveledges

```
create table users (
 id int,
 email varchar(255),
 fullName varchar(255),
 nickName varchar(255),
 createDate date,
 username varchar(255),
 password varchar(255),
 status varchar(255)
 );
```
### Start server
Start Server `npm start`
