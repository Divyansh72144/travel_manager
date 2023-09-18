import React, { useState, useEffect, useRef } from "react";
import personService from "./Services/person";
import "./App.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Box, Container } from "@mui/material";
import lottie from "lottie-web";

const App = () => {
  const [name, setName] = useState("");
  const [distance, setDistance] = useState("");
  const [total, setTotal] = useState([]);
  const [editId, setEditId] = useState(null);

  const box = useRef(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setTotal(response.data);
    });
    console.log("1");
    const instance = lottie.loadAnimation({
      container: box.current,
      render: "svg",
      animationData: require("./phone.json"),
      autoplay: true,
      loop: true,
    });
    return () => instance.destroy();
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const addPerson = () => {
    //Before axios
    // setTotal([...total, { name, distance }]);
    // setName("");
    // setDistance("");

    //After axios
    personService.create({ name, distance }).then((response) => {
      setTotal([...total, response.data]);
      setName("");
      setDistance("");
      console.log([...total, { name, distance }]);
    });
  };

  const deletePerson = (id) => {
    // const updatedList = total.filter((_, i) => i !== index);
    // setTotal(updatedList);
    personService.remove(id).then(() => {
      const updatedList = total.filter((person) => person.id !== id);
      setTotal(updatedList);
    });
  };

  const editPerson = (id) => {
    const personToEdit = total.find((person) => person.id === id);
    setName(personToEdit.name);
    setDistance(personToEdit.distance);
    setEditId(id);
    console.log(total);
    console.log(personToEdit.name);
  };

  const updatePerson = () => {
    // const updatedList = [...total];
    // updatedList[editIndex] = { name, distance };
    // setTotal(updatedList);
    // setEditIndex(null);
    // setName("");
    // setDistance("");

    if (!name || !distance) {
      console.log("hehe");
      window.alert("Name or distance field is empty");
      return;
    }

    const updatedPerson = { name, distance };
    console.log(editId); //passed
    console.log(updatedPerson); //passed
    personService.update(editId, updatedPerson).then((response) => {
      const updatedList = total.map((item) =>
        item.id === editId ? { ...item, ...updatedPerson } : item
      );

      setTotal(updatedList);
      console.log(updatedList);
      setEditId(null);
      setName("");
      setDistance("");
    });
  };

  return (
    <div className="app-container">
      {" "}
      {/* 1 */}
      <header className="header">
        <h1>Distance Management App</h1>
      </header>
      <div className="container">
        {/* 1.1 */}
        <ul className="addList">
          <li>
            {" "}
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              //fullWidth
              style={{
                marginBottom: "5px",
                minWidth: "250px",
                marginTop: "10px",
              }}
            />
            <br />
            <TextField
              label="Distance"
              variant="outlined"
              value={distance}
              onChange={handleDistanceChange}
              style={{ marginBottom: "2px", minWidth: "250px" }}
            />
            <br />
            <Button variant="contained" onClick={addPerson}>
              Add
            </Button>
          </li>
        </ul>
        <ul className="person-list">
          {/* 1.1.1 */}
          <li className="person-header">
            {/* 1.1.1.1 */}
            <div className="person-header-item">Name</div>
            <div className="person-header-item">Distance</div>
            <div className="person-header-item">Delete/Edit</div>
          </li>
          {/* 1.1.1.1 */}

          {total.map((item, index) => (
            <li key={index} className="person-box">
              {" "}
              {/* 1.1.1.2 */}
              <div className="person-name">{item.name}</div>
              <div className="person-distance">{item.distance}</div>
              <div className="button-container">
                <button
                  onClick={() => {
                    deletePerson(item.id);
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    editPerson(item.id);
                  }}
                >
                  Edit
                </button>
              </div>
            </li>
          ))}
          <Button variant="contained" onClick={updatePerson}>
            Update
          </Button>
        </ul>

        <ul className="extras">
          <div className="box" ref={box}></div>
        </ul>
      </div>
      <div />
      <div>
        {/* <div class="container">
          <ul class="my-list">
            <li class="my-header">
              <div class="my-item">Name</div>
              <div class="my-item">Distance</div>
              <div class="my-item">Delete/Edit</div>
            </li>
          </ul>
          <ul class="my-list extras">
            <li>
              <div class="my-item">Name</div>
              <div class="my-item">Distance</div>
              <div class="my-item">Delete/Edit</div>
            </li>
          </ul>
        </div> */}

        <footer className="footer">
          <p>&copy; 2023 Person Distance App</p>
        </footer>
      </div>
    </div>
  );
};
export default App;
// import React, { useState, useEffect } from "react";
// import personService from "./Services/person";

// const App = () => {
//   const [name, setName] = useState("");
//   const [distance, setDistance] = useState("");
//   const [total, setTotal] = useState([]);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     personService.getAll().then((response) => {
//       setTotal(response.data);
//     });
//   }, []);

//   const generateRandomId = () => {
//     return Math.floor(Math.random() * 1000);
//   };

//   const handleNameChange = (event) => {
//     setName(event.target.value);
//   };

//   const handleDistanceChange = (event) => {
//     setDistance(event.target.value);
//   };

//   const addPerson = () => {
//     const randomId = generateRandomId();
//     const newPerson = { id: randomId, name, distance };
//     personService.create(newPerson).then(() => {
//       setTotal([...total, newPerson]);
//       setName("");
//       setDistance("");
//     });
//   };

//   const deletePerson = (id) => {
//     personService.remove(id).then(() => {
//       const updatedList = total.filter((person) => person.id !== id);
//       setTotal(updatedList);
//     });
//   };

//   const editPerson = (id) => {
//     const personToEdit = total.find((person) => person.id === id);
//     setName(personToEdit.name);
//     setDistance(personToEdit.distance);
//     setEditId(id);
//     console.log(personToEdit);
//   };

//   const updatePerson = () => {
//     const updatedPerson = { name, distance };
//     personService.update(editId, updatedPerson).then(() => {
//       const updatedList = total.map((item) =>
//         item.id === editId ? { ...item, ...updatedPerson } : item
//       );

//       setTotal(updatedList);
//       setEditId(null);
//       setName("");
//       setDistance("");
//     });
//   };

//   return (
//     <div>
//       Name
//       <input onChange={handleNameChange} value={name} />
//       <br />
//       Distance
//       <input onChange={handleDistanceChange} value={distance} />
//       <br />
//       <button onClick={addPerson}>Add</button>
//       <ul>
//         {total.map((item) => (
//           <li key={item.id}>
//             {item.name} - {item.distance}
//             <button onClick={() => deletePerson(item.id)}>Delete</button>
//             <button onClick={() => editPerson(item.id)}>Edit</button>
//           </li>
//         ))}
//       </ul>
//       {editId && (
//         <div>
//           <button onClick={updatePerson}>Update</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
