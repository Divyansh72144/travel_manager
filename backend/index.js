const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Person = require("./models/person");
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("post-data", (req, res) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return "";
});

//custom format
const dataTobeShown =
  ":method :url :status :res[content-length] - :response-time ms :post-data";
//to log request
app.use(
  morgan(dataTobeShown, {
    skip: (req, res) => {
      req.method !== "POST";
    },
  })
);

const generateRandomId = () => {
  const randomId = Math.floor(Math.random() * 1000);
  return randomId;
};

app.get("/api/people", (request, response) => {
  Person.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/people/:id", (request, response) => {
  const id = request.params.id;
  console.log(id);
  Person.findById(id).then((people) => {
    response.json(people);
  });
});

// const id = Number(request.params.id);
// const person = people.find((person) => person.id === id);
// if (person) {
//   response.json(person);
// } else {
//   response.status(404).end();
// }
// });

app.delete("/api/people/:id", (request, response) => {
  const id = request.params.id;
  Person.findOneAndRemove(id)
    .then((removedPerson) => {
      if (removedPerson) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: "Person not found" });
      }
    })
    .catch((error) => {
      console.error("error deleting person", error);
      response.status(500).json({ error: "Failed to delete the person" });
    });
});

app.post("/api/people", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: "content missing" });
  }
  if (body.name === "") {
    return response.status(400).json({ error: "content missing" });
  }

  console.log(body.name);

  const person = new Person({
    name: body.name,
    distance: body.distance,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });

  // people = people.concat(person);
  // console.log(person);
  // response.json(person);
});

// app.put("/api/people/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const updated_person = request.body;
//   const index = people.findIndex((person) => person.id === id);
//   console.log(index, updated_person);
//   if (index !== -1) {
//     updated_person.id = id;
//     people[index] = updated_person;
//     response.json(updated_person);
//     console.log(people);
//   } else {
//     response.status(404).end();
//   }
// });

// const PORT = 3000;

app.put("/api/people/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    distance: body.distance,
  };
  //things to update below
  Person.findByIdAndUpdate(request.params.id, person, {
    name: body.name,
    distance: body.distance,
  })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON());
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Port running at ${PORT}`);
});
