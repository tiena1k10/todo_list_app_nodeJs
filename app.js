const express = require('express');

const app = express();
const path = require('path');
// setup public folder
app.use(express.static("./src/public"));
app.use(express.json());
require('dotenv').config()
const port = process.env.PORT || 8888
const db = require("./src/db/connect");
const notFound = require('./src/middleware/not-found');

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

db.connect().then(()=>{
    console.log("Connect Database thanh cong");
    return app.listen(port);
}).then(()=>{
    console.log(`Server is listening on: http://localhost:${port}`);
})
// setup router
const taskRouter = require('./src/routes/TaskRouter');
app.use('/api/v1/task',taskRouter);
app.use(notFound);
