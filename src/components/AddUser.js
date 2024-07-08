import { Button, Input } from "@mui/joy";
import React from "react";
import { useEffect, useState } from "react";

const AddUser = ({ onAdd,onUpdate,newUserId,editingData,setEditingData }) => {
  const [newData, setNewData]= useState({
    id:newUserId,
    name:'',
    email:'',
  });
  useEffect(()=>{
    console.log("editingData1",editingData)
    if(editingData != null){
      setNewData({
        id:editingData.id,
        name:editingData.name,
        email:editingData.email
      })
    }else{
      setNewData({
        id:newUserId,
        name:'',
        email:'',
      })
    }
  },[editingData])
  console.log("newData",newData)
const handleOnSubmit = (e) => {
  
    e.preventDefault();
    // console.log("newData1",newData)
    if(editingData == null){
      onAdd(newData);
      alert('User added success!!');
    }else{
      onUpdate(newData);
      alert("user updated succesfully")
    }
    
    setEditingData(null);

    e.target.name.value = "";
    e.target.email.value = "";
}
function changeHandeler(e){
  // console.log("newData",newData)
  const {name, value} = e.target;
  setNewData((priv)=>({...priv,[name] :value}))
}
  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h3>Add User </h3>
        <div style={{display:'flex',justifyContent:'space-around'}}>
        <Input sx={{width:'40%'}} size="md" placeholder="Name" name="name" value={newData.name} onChange={changeHandeler}  />
        <Input sx={{width:'40%'}} size="md" placeholder="Email" name="email" value={newData.email} onChange={changeHandeler}  />
        <Button variant="solid" type="submit">Add</Button>

        </div>
        <hr />
      </form>
    </div>
  );
};

export default AddUser;
