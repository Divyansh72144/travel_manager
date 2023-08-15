const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

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

let people = [
  { id: 241, name: "abc", distance: "4450" },
  { id: 231, name: "xyz", distance: "352" },
  { id: 325, name: "kpl", distance: "124" },
];

app.get("/", (request, response) => {
  response.json(people);
});

app.get("/api/people", (request, response) => {
  response.json(people);
});

app.get("/api/people/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = people.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/people/:id", (request, response) => {
  const id = Number(request.params.id);
  people = people.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/people", (request, response) => {
  const body = request.body;
  const person = {
    name: body.name,
    distance: body.distance,
    id: generateRandomId(),
  };
  people = people.concat(person);
  console.log(person);
  response.json(person);
});

app.put("/api/people/:id", (request, response) => {
  const id = Number(request.params.id);
  const updated_person = request.body;
  const index = people.findIndex((person) => person.id === id);
  console.log(index, updated_person);
  if (index !== -1) {
    updated_person.id = id;
    people[index] = updated_person;
    response.json(updated_person);
    console.log(people);
  } else {
    response.status(404).end();
  }
});

// const PORT = 3000;
const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Port running at ${PORT}`);
