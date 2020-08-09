const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
const user = require("./routes/users");
const quiz = require("./routes/quiz");
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 5000
const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/user", user);
app.use("/quiz", quiz);

app.listen(port)