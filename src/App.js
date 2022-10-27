import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [classData, setClassData] = useState({});


  function searchForClass(event) {
    // Set up API call
    var APIClassString = "https://planetterp.com/api/v1/course?name="+searchText
    // Handle API call
    axios.get(APIClassString).then(function (response) {
      var calc = response.data.average_gpa;
      setClassData(calc);
      // Success
    }).catch(function (error) {
      console.log(error);
    });
  }

  console.log(classData);
  
  return (
    <div className="App">
      <div className="container">
        <h1>Will it Curve?</h1>
        <input type="text" onChange={e => setSearchText(e.target.value)}></input>
        <button onClick={e => searchForClass(e)}>Search for a class</button>
      </div>
      {JSON.stringify(classData) !== '{}' ? 
      <><p>{classData}</p></> 
      :
      <><p>no class data</p></> 
    }
    </div>
  );
}

export default App;
