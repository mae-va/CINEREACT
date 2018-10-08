import React, { Component } from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Actuality from "./components/Actuality/Actuality";
import Favoris from "./components/Favoris/Favoris";
import SearchBar from "./components/SearchBar/SearchBar";


class App extends Component {
  constructor(){
    super();
    this.state = {
        movies : []
    }
  }

  componentDidMount() {
      fetch('https://api.themoviedb.org/3/search/movie?api_key=762ed8e154d8e7ff207952b1cc7074b0&query=star%20wars')
        .then(response => response.json())        
        .then(json => {this.setState({movies : json.results})})
        .then(() => {
          this.getDirectorFromMovieId()
      })
  }

  getDirectorFromMovieId = () => {
      this.state.movies.map((movie, index) => {
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=762ed8e154d8e7ff207952b1cc7074b0`)
        .then(response => response.json())
        .then(json =>{
          this.state.movies[index].director = json.crew[0].name;
          let results = json.cast.slice(0,4);
          let fullCast ="";
          for(let i=0; i<results.length ; i++){
              fullCast +=`${results[i].name}, `;
          }
          this.state.movies[index].casting = fullCast;
          this.forceUpdate(); 
        })
      
      })  
  }
  render() {
    return (
      <div>
        <Navbar loadBdd={this.componentDidMount}
                loadCrew={this.getDirectorFromMovieId}
                state={this.state}/>
        <Favoris/>     
      </div>
    );
  }
}


export default App;


// clé API = 762ed8e154d8e7ff207952b1cc7074b0