import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import './h.css';

function Home(){
  const[rollNo,setRollNo]=useState('');
  const[marks,setMarks]=useState([]);
  const[error,setError]=useState(null);
  const handleInputChange = (e) => {
    setRollNo(e.target.value);
  };
  const fetchMarks = async () => {
    try{
    axios.post('http://localhost:8000/student_data',{num:rollNo});
    axios.get('http://localhost:8000/post')
    .then((response)=>setMarks(response.data))
    .catch((err)=>console.log(err));
    console.log(marks);
    }
    catch{
        setError('Failed to fetch student data')
    }
    
  };
  const Table=()=>{
    const headers = ['Name', 'Math', 'Physics', 'Chemistry'];
    const tableHeaders = headers.map(header => `<th>${header}</th>`).join('');
    const tableRows = marks.map(row => 
      `<tr>
      <td>${row.Name}</td>    
      <td>${row.Maths}</td>
      <td>${row.Physics}</td>
      <td>${row.Chemistry}</td>
      </tr>`
    ).join('');
    return `
    <html>
    <head>
      <title>Marks Table</title>
      <style>
        .result {
    box-shadow: 1 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
    background-color: white;
    margin-top: 20px;
    font-size: 18px;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-family:'Courier New', Courier, monospace;
  }
  .grade{
    text-align: center;
    margin-top: 20px;
    font-size: 22px;
    background-color: white;
    width: 100%;
    justify-content: center;
    align-items: center;
    font-family: 'Courier New', Courier, monospace;
    margin-right: 100px;
  }
    .tab{
    margin-top: 20px;
  }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
          }
      </style>
    </head>
    <body>
        <h1>Marks Table</h1>
        <table>
          <thead>
            <tr>${tableHeaders}</tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>
    </body>
    </html>
  `;
  };
  const handleDownload=()=>{
    const htmlContent = Table(marks);
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'marks.html'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    }
  return (
    <div >
        <div>
            <h1 className='header'>ENTER YOUR INSTITUTION NAME</h1>
        </div>
        <div className='container'>
      <div className="card">
        <input
          type="text"
          placeholder="Enter Roll No"
          value={rollNo}
          onChange={handleInputChange}
        />
        <button onClick={fetchMarks} >Get Marks</button>
        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}
      </div>
      </div>
      <div>
      {marks.length>0&& marks.map((std)=>((
          <div className='markcontainer'>
            <table  className='result'>
              <tr>
                <td><b>Student RollNo</b></td>
                <td>{std.student_Id}</td>
              </tr>
              <tr>
                <td><b>Name</b></td>
                <td>{std.Name}</td>
              </tr>
              </table>
              <table className='result'>
              <tr className='tab'>
                <td className='tableheader'><b>subjects</b></td>
                <td className='tableheader'><b>Marks</b></td>
              </tr>
              <tr className='tab'>
                <td>Maths</td>
                <td>{std.Maths}</td>
              </tr>
              <tr className='tab'>
                <td>Physics</td>
                <td>{std.Physics}</td>
              </tr>
              <tr className='tab'>
                <td>Chemistry</td>
                <td>{std.Chemistry}</td>
              </tr>
              <tr className='tab'>
                <td><b>Grade</b></td>
                <td><b>{std.Grade}</b></td>
              </tr>
            </table>
            <div>
              <button onClick={handleDownload}>download</button>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default Home;
