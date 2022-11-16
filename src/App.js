import "./App.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import List from "./componentes/List";
import Create from "./componentes/Create";
import Detail from "./componentes/Detail";
import Edit from "./componentes/Edit";
import Archieve from "./componentes/Archieve";
import Navbar from "./componentes/Navbar";

function App() {
  /*  const [completed, completedchange] = useState(false);
  const [empdata, empdatachange] = useState(); */

  return (
    <div className="App">
      <Navbar />
      <br></br>
      {/* <h1>React JS Todolist Assessment</h1> */}

      <Routes>
        <Route
          path="/"
          element={<List title={"React JS Todolist Assessment"} />}
        ></Route>
        <Route path="/list/create" element={<Create />}></Route>
        <Route path="/list/archieve" element={<Archieve />}></Route>
        <Route path="/list/detail/:empid" element={<Detail />}></Route>
        <Route path="/list/edit/:empid" element={<Edit />}></Route>
      </Routes>
    </div>
  );
}

export default App;
