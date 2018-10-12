import React, { Component } from 'react';
import {Route} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Actuality from "./components/Actuality/Actuality";
import Favoris from "./components/Favoris/Favoris";

class App extends Component {
  constructor(){
    super();
    this.state = {
      movies : []
    }
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <Navbar/>
          <Route exact path="/" component={Actuality}/>
          <Route path="/favoris" component={Favoris}/>
         </div>
      </div>
    );
  }
}


export default App;

// clé API = 762ed8e154d8e7ff207952b1cc7074b0

