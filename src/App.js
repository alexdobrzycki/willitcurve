import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [approxAverage, setapproxAverage] = useState("");
  const [classData, setClassData] = useState({});

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function searchForClass(event) {
    // Set up API call
    var APIClassString = "https://planetterp.com/api/v1/course?name="+searchText
    // Handle API call
    axios.get(APIClassString).then(function (response) {
      var dataGPA = response.data.average_gpa;
      var gpa = parseFloat(dataGPA);
      var average = parseFloat(approxAverage);
      var gpaConverted;
      if (!isNumber(gpa) || !(isNumber(average)) || isNaN(average)) {
        setClassData("Invalid input, please use the following format: \"MATH140\" \"80\"")
      } else {
        if (gpa <= 4 && gpa > 3.7) {
          gpaConverted = gpa * 25;
        } else if (gpa <= 3.7 && gpa > 3.3) {
          gpaConverted = gpa * 26;
        } else if (gpa <= 3.3 && gpa > 3.0) {
          gpaConverted = gpa * 27.8;
        } else if (gpa <= 3.0 && gpa > 2.7) {
          gpaConverted = gpa * 29.7;
        } else if (gpa <= 2.7 && gpa > 2.3) {
          gpaConverted = gpa * 32.54;
        } else if (gpa <= 2.3 && gpa > 2.0) {
          gpaConverted = gpa * 36.17;
        } else if (gpa <= 2.0 && gpa > 1.7) {
          gpaConverted = gpa * 40.17;
        } else if (gpa <= 1.7 && gpa > 1.3) {
          gpaConverted = gpa * 47.71;
        } else if (gpa <= 1.3 && gpa >= 1.0) {
          gpaConverted = gpa * 59.54;
        } 

        if (gpaConverted - average <= 0) {
          setClassData("There will likely be no curve :(");
        } else {
          setClassData("The curve will approximately be "+ (gpaConverted - average).toFixed(2) + " points");
        }
      }
    }).catch(function (error) {
      setClassData("Invalid input, please use the following format: \"MATH140\" \"80\"")
    });
  }

  console.log(classData);
  
  return (
    <div className="App">
      <div className="container">
        <h1>Will it Curve? UMD</h1>
        <input type="text" placeholder='Enter class, ex: MATH140' onChange={e => setSearchText(e.target.value)}></input>
        <br></br>
        <input type="text" placeholder='Enter approximate average'onChange={e => setapproxAverage(e.target.value)}></input>
        <br></br>
        <button onClick={e => searchForClass(e)}>Search for a class</button>
      </div>
      {JSON.stringify(classData) !== '{}' ? 
      <><p>{classData}</p></> 
      :
      <><p>Enter Class Name (eg: MATH140) and Approximate Average (eg: 85.55)</p></> 
    }
    </div>
  );
}

export default App;
