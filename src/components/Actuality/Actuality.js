import React, { Component } from 'react';
import Rating from "react-star-rating-lite";
import './Actuality.css';
import ReadMore from "../ReadMore/ReadMore.js";
import {NotificationManager, NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import posed from 'react-pose';

const Box = posed.div({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
  });

class Actuality extends Component {
    constructor(props){
        super(props);
        this.state = {
            movie : {},
            readMore: false,
            color: "no-clicked-icon",
            isVisible : true
        }
        this.rate ="";
				this.favorite = false
        
    }

    favoriteMovies = () => {
			NotificationManager.success('Movie added!',"", 1000);
		}

		deleteMovies = () => {
			NotificationManager.warning('Movie removed!',"", 1000);
		}

    componentDidMount() {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=762ed8e154d8e7ff207952b1cc7074b0&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2018`)
        .then(response => response.json())           
        .then(json => {   
                this.setState({movie : json.results[this.getRandomInt(19)]},() => this.getDirectorFromMovieId());       
							})
        .then(() => {
            this.setState({movie : {...this.state.movie,vote_average : Math.round(this.state.movie.vote_average/2)}});
            this.setState({movie : {...this.state.movie,release_date : this.state.movie.release_date.slice(0,4)}});
            this.rate = <Rating value={`${this.state.movie.vote_average}`} color="#f4dc42" readonly/>
        })
        setTimeout(() => {
            this.setState({ isVisible: !this.state.isVisible });
          }, 500);
    }

    getDirectorFromMovieId = () => {
      fetch(`https://api.themoviedb.org/3/movie/${this.state.movie.id}/credits?api_key=762ed8e154d8e7ff207952b1cc7074b0`)
        .then(response => response.json())
        .then(json =>{
          this.setState({movie : {...this.state.movie,director : json.crew[0].name}});
          let results = json.cast.slice(0,4);
          let fullCast ="";
          for(let i=0; i<results.length -1 ; i++){
              fullCast +=`${results[i].name}, `;
              if (i === 2) {
                fullCast+=`${results[i].name}... `;
               }
            } 
					this.setState({movie : {...this.state.movie,casting : fullCast}});
					this.forceUpdate();
        })
    }

    getRandomArbitrary = (min, max) =>{
      return Math.random() * (max - min) + min;
    }

    getRandomInt = (max) => {
      return Math.floor(Math.random() * Math.floor(max)); 
    }

    handleClick = () => {
      if (this.state.color=== "no-clicked-icon"){
        this.setState({color:"text-danger"});
        this.favoriteMovies();
      }
      else if (this.state.color === "text-danger"){
        this.setState({color:"no-clicked-icon"});
        this.deleteMovies();
      }
      this.setState({ favorite: !this.state.favorite }, () => {this.setFavorite()});
    }

		setFavorite = () => {
      if (this.state.favorite===true) {
          this.setItem();
      }	else if (this.state.favorite===false) {
        this.removeItem();
      }
		}

  setItem = () => {
    window.localStorage.setItem(`${this.state.movie.id}`, JSON.stringify(this.state.movie));
  }

  removeItem = () => {
    window.localStorage.removeItem(`${this.state.movie.id}`);
  }

  readMoreOpen = () => {
    this.setState({readMore: !this.state.readMore});
  }

  closeReadMore = () => {
    this.setState({readMore: !this.state.readMore});
  }

    render() {
        return (
            <div>
                <div className="container-overlay pl-0"></div>
                <Box className="container-fluid bloc_actuality pl-0 pr-0" pose={this.state.isVisible ? 'hidden' : 'visible'}>
                    <div className="container">
                        {this.state.readMore ? <ReadMore close={this.closeReadMore} title={this.state.movie.title} year={this.state.movie.release_date} director={this.state.movie.director} casting={this.state.movie.casting} synopsis={this.state.movie.overview}/> : null}
                    </div>               
                    <div className="row actuality">
                        <div className="col-lg-6 col-md-12 pl-0 pr-0 poster_column">
                            <img className="img-fluid movie_poster" alt="movie_poster" src={`https://image.tmdb.org/t/p/original${this.state.movie.poster_path}`}/>
                            <span className="fa fa-plus-circle fa-3x cross mb-5" onClick={this.readMoreOpen} style={this.state.readMore ? {display: 'none'} : {display: 'block'}}></span>
                        </div>
                        <div className="col-lg-6 col-md-6 black collapse-mob">
                            <div className="row pb-4 pl-5 pr-5 title">{this.state.movie.title}</div>
                            <div className="row pl-5 mb-2 year top-infos">
                                <p>{this.state.movie.release_date}</p> 
                            </div>
                            <div className="row pl-5 director top-infos">
                                <p>{this.state.movie.director}</p>
                            </div>
                            <div className="row pl-5 pb-3 casting top-infos">
                                <em>{this.state.movie.casting}</em>
                            </div>
                            <hr />
                            <div className="row synopsis pb-4 pl-5 pr-5 d-none d-lg-block">
                                <p>{this.state.movie.overview}</p>
                            </div>
                            <div className="row favoritesRating">
                              <i className= {`${this.state.color} fa fa-heart pl-5 pr-5`} onClick={ () => {this.handleClick()}}></i>
                               {this.rate}
                            </div>
                        </div>
                    </div>
                </Box>
                <div>
                </div>
								<NotificationContainer/>
            </div>
            );

        }
}

export default Actuality;
