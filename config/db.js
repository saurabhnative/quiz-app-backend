const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const MONGOURI = `mongodb+srv://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_USER_PASSWORD}@${process.env.MONGO_DB_CLUSTER_URL}/quizApp?retryWrites=true&w=majority`;

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;