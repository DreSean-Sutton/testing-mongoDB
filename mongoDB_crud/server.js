require('./models/db');
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const path = require('path');
const handleBars = require('handlebars');
const exphbs = require('express-handlebars');

const url = "mongodb://localhost:27017/test_student_management";

MongoClient.connect(url, (err, db) => {
  if(err) throw err;
  console.log('Database created!');
  db.close();
});

const {
  allowInsecurePrototypeAccess
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");
const studentController = require("./controllers/studentController");
const app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.send(`
  <h2>Welcome to Students Database!!</h2>

  <h3>Click here to get access to the <b> <a href="/student/list">Database</a> </b></h3>`);

});

app.set('views', path.join(__dirname, '/views/'));

app.engine(
  "hbs",
  exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handleBars),
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/"
  })
);

app.set("view engine", "hbs");
app.use("/student", studentController);

app.listen(3000, () => {
  console.log("Express listening at port: 3000");
});
