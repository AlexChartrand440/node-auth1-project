import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "./axiosWithAuth";

function App() {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  const handleChange = e => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    axios().post("http://localhost:5000/login/", login)
      .then(result => {
        console.log(result);
        // localStorage.setItem("ID", result.data.id);
        // localStorage.setItem(
        //   "name",
        //   document.getElementById("username-input").value,
        // );
        // localStorage.setItem("token", result.data.token);
        // window.location = "/dashboard";
      })
      .catch(err => {
        console.log(err);
      });
  };

  var logout = () => {

    axios().get("http://localhost:5000/logout/")
    .then(result => {
      console.log(result);
      // localStorage.setItem("ID", result.data.id);
      // localStorage.setItem(
      //   "name",
      //   document.getElementById("username-input").value,
      // );
      // localStorage.setItem("token", result.data.token);
      // window.location = "/dashboard";
    })
    .catch(err => {
      console.log(err);
    });

  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input type='text' placeholder='Username' name='username' onChange={handleChange}/>
        <input type='text' placeholder='Password' name='password' onChange={handleChange}/>
        <button>Login</button>
      </form>
      <button onClick={() => {logout()}}>Logout</button> 
    </div>
  );
}

export default App;
