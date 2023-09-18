const mongoose = require("mongoose"); // declare constant variable mongoose

if (process.argv.length < 3) {
  // to check command line arguement like node mongo.js and bla bla
  console.log("Usage: node mongo.js <password> <name> <phone>");
  process.exit(1); // exit node js script
}

const password = process.argv[2]; // password is second arguement

const name = process.argv[3]; //name is 3rd arguement

const distance = process.argv[4]; // distance is 4th arguement

const url = `mongodb+srv://Divyansh:YcNOyUR1HwPK0PgT@divyansh.jvjpnhx.mongodb.net/personManagement?retryWrites=true&w=majority`; // url containing database link + name + password and database name
//Divyansh database name

mongoose.set("strictQuery", false); // object mongoose being used , data not following the schema can be added
console.log("Connecting to MongoDB...");
mongoose.connect(url); //establish connection to mongo database

const personSchema = new mongoose.Schema({
  name: String,
  distance: String,
}); // define struture and validation rules for data stored in mongo db using mongoose

const Person = mongoose.model("Person", personSchema); // creating a model based on schema

const person = new Person({
  name: name,
  distance: distance,
});

person.save().then((result) => {
  console.log(`Added ${name} with phone number ${distance} to the phonebook.`);
  mongoose.connection.close(); //closing the connection
});

Person.find({}).then((result) => {
  result.forEach((person) => {
    console.log(person);
  });
});

console.log("Connected");
