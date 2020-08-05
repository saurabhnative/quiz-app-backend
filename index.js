const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json());
let quotesCollection = null;
const MongoClient = require('mongodb').MongoClient

MongoClient.connect(`mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_USER_PASSWORD}@${process.env.MONGO_DB_CLUSTER_URL}/quizApp?retryWrites=true&w=majority`, (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database') 
  const db = client.db('quizApp')
  quotesCollection = db.collection('quizQuestions')
  })
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/add_quiz_question', function (req, res) {
  quotesCollection.insertOne(req.body)
  .then(result => {
    console.log(result)
    res.send({"response": "success"});
  })
  .catch(error => console.error(error))
})

app.get('/get_quiz_questions', (req, res) => {
  quotesCollection.find().toArray()
    .then(results => {
      console.log(results)
      res.send({"results": results})
    })
    .catch(error => console.error(error))
})

app.listen(port)