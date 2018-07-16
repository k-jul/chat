# Chat

#### To install the project:
 * ```git clone https://github.com/k-jul/chat.git```
 * ```cd  frontend```
 * ```npm install```
 * ```cd ../backend```
 * ```npm install```
 
 #### Import database:
 * ```mongorestore ./dump/chat --db chat```
 
 #### To run the project:
 * backend folder: ```npm start```
 * fontend folder: ```gulp```
 
 > _IMPORTANT!:_
 > If you need to open second window for testing chat - run ```gulp``` in separate terminal!
 
 #### To switch between http and sockets please switch script files in `frontend/src/pug/index.pug`:
   Sockets file:
``` script(src='js/socket.js')```

   HTTP file:
```script(src='js/http.js')```
 
