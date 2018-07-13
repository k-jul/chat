# Chat-backend

 #### Install project:
 * ```git clone https://github.com/k-jul/chat-backend.git```
 * ```cd chat-backend```
 * ```npm install```
 
 #### Import database:
 * ```mongorestore ./dump/api```

 #### Run:
 * ```npm start```
 
 
 ### REST API
 #### http://localhost:8000/api
 
 Action | Method | Route 
 --- | --- | ---
 get user by id | GET | /users/:userId
 get all users | GET | /users
 add new user | POST | /users
 update user info | PUT | /users/:userId
 delete user | DELETE | /users/:userId
 get message | GET | /messages/:messageId
 get all message | GET | /messages
 add new message | POST | /messages
 update message | PUT | /messages/:messageId
 delete message | DELETE | /messages/:messageId
 get user's friends by user id | GET | /users/:id/friends
 
 
