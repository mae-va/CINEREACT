import React, { Component } from 'react';
import './App.css';
//import Navbar from "./components/Navbar/Navbar";
//import Actuality from "./components/Actuality/Actuality";
//import Favoris from "./components/Favoris/Favoris";
//import SearchBar from "./components/SearchBar/SearchBar";
import Bdd from "./api/Bdd";

class App extends Component {
  render() {
    return (
      <div>
        <Bdd/>
      </div>
    );
  }
}


export default App;


// clé API = 762ed8e154d8e7ff207952b1cc7074b0
