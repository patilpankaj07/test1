import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [songs, setSongs] = useState([]);
  const [dirandsonglist, setDirandsonglist] = useState([]);
  const [dirlist, setDirlist] = useState([]);
  const [dir, setdir] = useState("");
  const [delSongName, setdelSongName] = useState("");
  const [dirname, setDirname] = useState("");
  const [singerName, setSingerName] = useState("");
  const [actorname, setActorname] = useState("");
  const [actressname, setActressname] = useState("");
  const [songName, setSongName] = useState("");

  const [formData, setFormData] = useState({
    Songname: "",
    Film: "",
    Music_director: "",
    singer: "",
    Actor: "",
    Actress: "",
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
        Songname: "",
        Film: "",
        Music_director: "",
        singer: "",
      });
    } catch (error) {
      // setMessage("Error adding marks");
      console.log(error);
    }
  };

  const handleChange2 = (e) => {
    setdir(e.target.value);
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:5000/specific/${dir}`);
      setdir("");

      console.log(response.data.songs);
      setDirlist(response.data.songs);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange3 = (e) => {
    setdelSongName(e.target.value);
  };

  const handleSubmit3 = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(
        `http://localhost:5000/delete/${delSongName}`
      );
      setdelSongName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchByDirAndSing = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/dirandsong`, {
        singerName,
        dirname,
      });
      console.log(response.data.songs);
      setDirandsonglist(response.data.songs);
      setdelSongName("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleActorActressAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `http://localhost:5000/update/${songName}`,
        {
          actorname,
          actressname,
        }
      );
      setActorname("");
      setActressname("");
      setSongName("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all students
        const response1 = await axios.get("http://localhost:5000/list");
        setSongs(response1.data.songs);
        // setcount(response1.data.count);

        // Fetch students with more than 20 marks in DSBDA
        // const response2 = await axios.get("http://localhost:5000/dsbda");
        // setDsbdaStudents(response2.data.names);

        // Fetch students with more than 25 marks in all subjects
        // const response3 = await axios.get("http://localhost:5000/allSubjects");
        // setAllSubjectsStudents(response3.data.names);

        // Fetch students with less than 40 in Maths and Science
        // const response4 = await axios.get("http://localhost:5000/lessthan");
        // setMathsScienceStudents(response4.data.names);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error here, e.g., set an error state or show a notification
      }
    };

    fetchData();
  }, [formData, delSongName, actorname, actressname]);

  return (
    <div className="App">
      <div>
        <h2>Add Song</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Song:</label>
            <input
              type="text"
              name="Songname"
              value={formData.Songname}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Film:</label>
            <input
              type="text"
              name="Film"
              value={formData.Film}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Music_director:</label>
            <input
              type="text"
              name="Music_director"
              value={formData.Music_director}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>singer:</label>
            <input
              type="text"
              name="singer"
              value={formData.singer}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Add Song</button>
        </form>
      </div>
      {/*  */}

      <div>
        <h2>List Director Song</h2>
        <form onSubmit={handleSubmit2}>
          <div>
            <label>Enter Director name:</label>
            <input type="text" value={dir} onChange={handleChange2} required />
          </div>
          <button type="submit">Search by Director</button>
        </form>
      </div>

      {/*  */}

      <div>
        <h2>Delete Song </h2>
        <form onSubmit={handleSubmit3}>
          <div>
            <label>Song Name:</label>
            <input
              type="text"
              value={delSongName}
              onChange={handleChange3}
              required
            />
          </div>
          <button type="submit">Delete</button>
        </form>
      </div>

      <div>
        <h2>Search by director & singer </h2>
        <form onSubmit={handleSearchByDirAndSing}>
          <div>
            <label>Director Name:</label>
            <input
              type="text"
              value={dirname}
              onChange={(e) => {
                setDirname(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label>Singer Name:</label>
            <input
              type="text"
              value={singerName}
              onChange={(e) => {
                setSingerName(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit">Search</button>
        </form>
      </div>

      <div>
        <h2>Add Actors & actress</h2>
        <form onSubmit={handleActorActressAdd}>
          <div>
            <label>Song Name:</label>
            <input
              type="text"
              value={songName}
              onChange={(e) => {
                setSongName(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label>Actor Name:</label>
            <input
              type="text"
              value={actorname}
              onChange={(e) => {
                setActorname(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label>Actress Name:</label>
            <input
              type="text"
              value={actressname}
              onChange={(e) => {
                setActressname(e.target.value);
              }}
              required
            />
          </div>
          <button type="submit">Add</button>
        </form>
      </div>

      {/*  */}
      <h1>Song Database</h1>

      <h2>Total Songs: {songs?.length}</h2>
      <div>
        <h1>Song Data</h1>
        <table>
          <thead>
            <tr>
              <th>SongName</th>
              <th>FilmName</th>
              <th>MusicDirector</th>
              <th>Singer</th>
              <th>Actor</th>
              <th>Actress</th>
            </tr>
          </thead>
          <tbody>
            {songs &&
              songs.map((song, index) => (
                <tr key={index}>
                  <td>{song.Songname}</td>
                  <td>{song.Film}</td>
                  <td>{song.Music_director}</td>
                  <td>{song.singer}</td>
                  <td>{song.Actor}</td>
                  <td>{song.Actress}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <h3>List specified Music Director songs & singer</h3>
      <ul>
        {dirandsonglist &&
          dirandsonglist.map((name, index) => (
            <li key={index}>{name.Songname}</li>
          ))}
      </ul>

      <h3>List specified Music Director songs</h3>
      <ul>
        {dirlist &&
          dirlist.map((name, index) => <li key={index}>{name.Songname}</li>)}
      </ul>
    </div>
  );
}

export default App;
