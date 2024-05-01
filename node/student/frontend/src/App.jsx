import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [dsbdaStudents, setDsbdaStudents] = useState([]);
  const [allSubjectsStudents, setAllSubjectsStudents] = useState([]);
  const [mathsScienceStudents, setMathsScienceStudents] = useState([]);
  const [rollNo, setRollNo] = useState('');
  const [delrollNo, setdelRollNo] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    wadMarks: "",
    ccMarks: "",
    dsbdaMarks: "",
    cnsMarks: "",
    aiMarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/insert",
        formData
      );

      setFormData({
        name: "",
        rollNo: "",
        wadMarks: "",
        ccMarks: "",
        dsbdaMarks: "",
        cnsMarks: "",
        aiMarks: "",
      });
    } catch (error) {
      // setMessage("Error adding marks");
      console.log(error);
    }
  };




  const handleChange2 = (e) => {
    setRollNo(e.target.value);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:5000/update/${rollNo}`);
      setRollNo('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange3 = (e) => {
    setdelRollNo(e.target.value);
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`http://localhost:5000/delete/${delrollNo}`);
      setdelRollNo('');
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all students
        const response1 = await axios.get("http://localhost:5000/list");
        setStudents(response1.data.students);
        // setcount(response1.data.count);

        // Fetch students with more than 20 marks in DSBDA
        const response2 = await axios.get("http://localhost:5000/dsbda");
        setDsbdaStudents(response2.data.names);

        // Fetch students with more than 25 marks in all subjects
        const response3 = await axios.get("http://localhost:5000/allSubjects");
        setAllSubjectsStudents(response3.data.names);

        // Fetch students with less than 40 in Maths and Science
        const response4 = await axios.get("http://localhost:5000/lessthan");
        setMathsScienceStudents(response4.data.names);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error here, e.g., set an error state or show a notification
      }
    };

    fetchData();
  }, [formData,rollNo,delrollNo]);

  return (
    <div className="App">
      <div>
        <h2>Add Student Marks</h2>
      
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Roll No:</label>
            <input
              type="number"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>WAD Marks:</label>
            <input
              type="number"
              name="wadMarks"
              value={formData.wadMarks}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>CC Marks:</label>
            <input
              type="number"
              name="ccMarks"
              value={formData.ccMarks}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>DSBDA Marks:</label>
            <input
              type="number"
              name="dsbdaMarks"
              value={formData.dsbdaMarks}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>CNS Marks:</label>
            <input
              type="number"
              name="cnsMarks"
              value={formData.cnsMarks}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>AI Marks:</label>
            <input
              type="number"
              name="aiMarks"
              value={formData.aiMarks}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Add Marks</button>
        </form>
      </div>
      {/*  */}

      <div>
      <h2>Update Student Marks</h2>
      <form onSubmit={handleSubmit2}>
        <div>
          <label>Roll No:</label>
          <input
            type="number"
            value={rollNo}
            onChange={handleChange2}
            required
          />
        </div>
        <button type="submit">Update Marks</button>
      </form>
    </div>

    {/*  */}


    <div>
      <h2>Delete Student </h2>
      <form onSubmit={handleSubmit3}>
        <div>
          <label>Roll No:</label>
          <input
            type="number"
            value={delrollNo}
            onChange={handleChange3}
            required
          />
        </div>
        <button type="submit">Delete</button>
      </form>
    </div>

      {/*  */}
      <h1>Student Database</h1>

      <h2>Total Students: {students?.length}</h2>
      <h3>All Students</h3>
      <div>
        <h1>Student Data</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No</th>
              <th>WAD Marks</th>
              <th>CC Marks</th>
              <th>DSBDA Marks</th>
              <th>CNS Marks</th>
              <th>AI Marks</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.rollNo}</td>
                  <td>{student.wadMarks}</td>
                  <td>{student.ccMarks}</td>
                  <td>{student.dsbdaMarks}</td>
                  <td>{student.cnsMarks}</td>
                  <td>{student.aiMarks}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <h3>Students with More Than 20 Marks in DSBDA</h3>
      <ul>
        {dsbdaStudents &&
          dsbdaStudents.map((name, index) => <li key={index}>{name}</li>)}
      </ul>

      <h3>Students with More Than 25 Marks in All Subjects</h3>
      <ul>
        {allSubjectsStudents &&
          allSubjectsStudents.map((name, index) => <li key={index}>{name}</li>)}
      </ul>

      <h3>Students with Less Than 40 Marks in Maths and Science</h3>
      <ul>
        {mathsScienceStudents &&
          mathsScienceStudents.map((name, index) => (
            <li key={index}>{name}</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
