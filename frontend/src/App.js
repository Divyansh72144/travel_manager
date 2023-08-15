import React, { useState, useEffect } from "react";
import personService from "./Services/person";
import "./App.css";
const App = () => {
  const [name, setName] = useState("");
  const [distance, setDistance] = useState("");
  const [total, setTotal] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setTotal(response.data);
    });
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
    <div>
      <header className="header">
        <h1>Person Management App</h1>
      </header>
      <footer className="footer">
        <p>&copy; 2023 Person Management App</p>
      </footer>
      Name<input onChange={handleNameChange} value={name}></input>
      <br />
      Distance<input onChange={handleDistanceChange} value={distance}></input>
      <br />
      <button onClick={addPerson}>Add</button>
      <ul>
        {total.map((item, index) => (
          <li key={index}>
            {item.name}
            {item.distance}
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
          </li>
        ))}
        <button onClick={updatePerson}>Update</button>
      </ul>
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
