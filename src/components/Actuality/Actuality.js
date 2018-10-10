import React, { Component } from 'react';
import './Actuality.css';

class Actuality extends Component {
    constructor(props){
        super(props);
        this.state = {
            movies : [],
        }
    }
    
    componentDidMount() {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=762ed8e154d8e7ff207952b1cc7074b0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.getRandomInt(5)}&primary_release_year=${new Date().getFullYear()}`)
        .then(response => response.json())        
        .then(json => {this.setState({movies : json.results[this.getRandomInt(20)]})})
        .then(() => {this.getDirectorFromMovieId()})
     
    }
    
    getDirectorFromMovieId = () => {
      fetch(`https://api.themoviedb.org/3/movie/${this.state.movies.id}/credits?api_key=762ed8e154d8e7ff207952b1cc7074b0`)
        .then(response => response.json())
        .then(json =>{
          this.state.movies.director = json.crew[0].name;
          let results = json.cast.slice(0,4);
          let fullCast ="";
          for(let i=0; i<results.length ; i++){
              fullCast +=`${results[i].name}, `;
          }
          this.state.movies.casting = fullCast;
          this.forceUpdate(); 
        })
      
    } 
    
    
    getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max));
    }
    
    render() {
        return (
            <div>
                <div className="container-overlay pl-0"></div>
                    <div className="container-fluid bloc_actuality pl-0 pr-0">
                        <div class="row actuality">
                            <div className="col-lg-6 col-md-6 pl-0 pr-0 poster_column">
                                <img className="img-fluid movie_poster" alt="movie_poster" src={`https://image.tmdb.org/t/p/original${this.state.movies.poster_path}`}/>
                            </div>

                                <div className="col-lg-6 col-md-6 black">
                                    <div className="row mb-5 pl-5 title">TERRIFIANT!</div>
                                    <div className="row pl-5 year">
                                        <p>2014</p> </div>
                                    <div className="row pl-5 director">
                                        <p>Christopher Bizarre</p> </div>
                           

                                    <div className="row pl-5 pb-3 casting">Matthhew Mac caunaughey, Bulbizarre, Pikaku, Jean-Pierre Css...</div>
                                    <div className="row synopsis pb-5 pl-5 pr-5 mr-5mb-5 d-none d-lg-block">
                                        <p>Il etait une fois un gars vraizment biaeze r qui ecrviat une histoire à la con trs amuvaius. La terre etait condamner et lui ne chercahit qu'à écrite de fou...</p>
                                        <button className="readMore ml-3">+</button>
                                    </div>
                                    <div className="row favoritesRating">
                                        <i class="fa fa-heart pl-5 pr-5"></i>
                                            <p>* * * * *</p>
                                    </div>
                                    </div>
                        </div>
                </div>
            </div>
        );

    }
}

export default Actuality;