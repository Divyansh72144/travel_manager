import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [distance, setDistance] = useState("");
  const [total, setTotal] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDistanceChange = (event) => {
    setDistance(event.target.value);
  };

  const addPerson = () => {
    setTotal([...total, { name, distance }]);
    setName("");
    setDistance("");
  };

  const deletePerson = (index) => {
    const updatedList = total.filter((_, i) => i !== index);
    setTotal(updatedList);
  };

  const editPerson = (index) => {
    const personToEdit = total[index];
    console.log(personToEdit);
    setName(personToEdit.name);
    setDistance(personToEdit.distance);
    setEditIndex(index);
  };

  const updatePerson = () => {
    const updatedList = [...total];
    updatedList[editIndex] = { name, distance };
    setTotal(updatedList);
    console.log(total);

    setEditIndex(null);
    setName("");
    setDistance("");
  };

  return (
    <div>
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
                deletePerson(index);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                editPerson(index);
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
