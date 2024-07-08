import React, { useEffect, useState } from "react";
import "./App.css";
import AddUser from "./components/AddUser";
import User from "./components/User";
import axios from "axios";
import UserTable from './components/UserTable';

const App = () => {
  const [usersData, setUsersData] = useState([]);
  const [newUserId, setNewUserId] = useState();
  const [editingData, setEditingData] = useState(null);

  useEffect(() => {
    fetchData();
    console.log(usersData)
  }, []);
  useEffect(() => {
    
    setNewUserId(usersData.length + 1);
    console.log(usersData.length)
  }, [usersData]);
  console.log("newUserId",newUserId)

  const fetchData = async () => {
    // await fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => res.json())
    //   .then((data) => setUsers(data))
    //   .catch((err) => {
    //     console.log(err);
    //   });
    await axios.get("https://jsonplaceholder.typicode.com/users")
      .then((data) => setUsersData(data.data) )
      .catch((err) => {
        console.log(err);
      });
  };

  const onAdd = async (newData) => {
    await axios.post("https://jsonplaceholder.typicode.com/users",newData )
      .then((data) => {
        setUsersData((users) => [...users, data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = async (row) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${row.id}`)
      .then((res) => {
       
          setUsersData(
            usersData.filter((user) => {
              return user.id !== row.id;
            }))
          
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onUpdate = async (Data) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${Data.id}`, Data);
      const updatedUser = response.data;
      
      setUsersData(prevUsersData => 
        prevUsersData.map(user => (user.id === updatedUser.id ? updatedUser : user))
      );
    } catch (err) {
      console.log(err);
    }
  };
  

  console.log(usersData);
  return (
    <div className="App">
      <h3>React Crud Using Jsonplaceholder Api</h3>

      <br />
      <AddUser newUserId={newUserId} onAdd={onAdd} onUpdate={onUpdate} editingData={editingData} setEditingData={setEditingData} />
     { usersData?<UserTable usersData={usersData} onDelete={onDelete} onUpdate={onUpdate} setEditingData={setEditingData} />:<p>Lodding...</p>}
      <div>
        {/* {users.map((user) => (
          <User
            id={user.id}
            key={user.id}
            name={user.name}
            email={user.email}
            onDelete={onDelete}
          />
        ))} */}
      </div>
    </div>
  );
};

export default App;
