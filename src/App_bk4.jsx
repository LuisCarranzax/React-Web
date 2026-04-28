import React from "react";
import { BrowserRouter as Router, Routes, Link, Route } from "react-router-dom";

function Home(){
  return <h2>Página de Inicio</h2>;

}

function About(){
  return <h2>Acerca de</h2>;

}


function App(){
  return (
    <Router>
      <nav>
        <ul>

          <li><Link to="/">Inicio</Link></li>

          <li><Link to="/about">Acerca de</Link></li>

        </ul>
      </nav>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/about" element= {<About/>}/>
      </Routes>
    </Router>
  );
}


export default App;
