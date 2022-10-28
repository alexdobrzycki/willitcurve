import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [searchText, setSearchText] = useState("");
  const [approxAverage, setapproxAverage] = useState("");
  const [classData, setClassData] = useState("");

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
        setClassData("Invalid input, please use the proper format: eg: \"MATH140\" and \"80\"");
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
          setClassData("There will likely be no curve (possible decrease in grade)");
        } else {
          setClassData("The curve will be approximately: " + (gpaConverted - average).toFixed(2) + " points");
        }
      }
    }).catch(function (error) {
      setClassData("Invalid input, please use the proper format, eg: \"MATH140\" and \"80\"");
    });
  }

  console.log(classData);
  
  return (
    <div id="center" className="App">
    <img src="marylandlogo.png" alt=" " width="125" height="50"></img>
      <h1>Will it Curve? University of Maryland</h1>
      <div className="container">
        <input type="text" id="textboxid" placeholder='Course name, eg: MATH140' onChange={e => setSearchText(e.target.value)}></input>
        <br></br>
        <input type="text" id="textboxid" placeholder='Approximate class average, eg: 85.55'onChange={e => setapproxAverage(e.target.value)}></input>
        <br></br>
        <br></br>
        <button className="button-24" onClick={e => searchForClass(e)}>Search for a class</button>
        <br></br><br></br>
      </div>
      {JSON.stringify(classData) !== '""' ? 
      <><p><b>{classData}</b></p></>
      :
      <><p>Enter the Course Name and the Approximate Class Average</p>
      <p id="small">Example: If you're taking CMSC216 and you believe your class' average
      is a 65, enter "CMSC216" and "65" into the input boxes.</p>
      <p id="small">The output is an approximation of a curve that the professor could grant
       based on real UMD historical  grade data, calculated by utilizing <a href="https://planetterp.com/api/"
       target="_blank" rel="noreferrer">PlanetTerp's API.</a></p></> 
    }
    </div>
  );
}

export default App;
