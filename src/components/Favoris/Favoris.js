import React, {Component} from "react";
import './Favoris.css';
import 'react-notifications/lib/notifications.css';

import Rating from "react-star-rating-lite";
import _ from 'underscore';
import { NotificationManager } from 'react-notifications';

import { Card, CardBody, CardTitle, CardText, Col, Row, CardSubtitle, CardImgOverlay } from 'reactstrap';

class Favoris extends Component {
  constructor(props){
    super(props);
    this.state= {
      movies:[],
      color: "push-heart"
    }
    this.fullMovie = [];
    this.cardBlock = "";
  }

  renderUpdateMovie = (movie) => {
    this.setState({ movies: [...this.state.movies, movie]});
  }

  componentDidMount = () => {
    this.props.updateLocalMovie(this.renderUpdateMovie);
    let values = [];
    let keys = Object.keys(localStorage);
    for (let y = 0; y < keys.length; y++) { 
      values.push(JSON.parse(localStorage.getItem(keys[y])));
    }
    values.map((value) =>{
      return(this.fullMovie.push(value))
    })
    this.setState({ movies: this.fullMovie}, () => {
      let toto = this.state.movies;

      toto.map(movie =>{
        return (
          movie.cardOverlay = false
        )
      });
  
      this.setState({movies: toto}, () => {
        console.log(this.state.movies)
      });
    });

  }

  removeMovie = (movieId) => {
    window.localStorage.removeItem(movieId.toString());
    this.setState({movies: _.filter(this.state.movies, (movie) => { return movie.id !== movieId})});
    this.deleteMovies();
  }

  deleteMovies = () => {
		NotificationManager.warning('Movie removed!',"", 1000);
  }
  
  toggleCardOverlay = (movieId) => {
    let films = this.state.movies;
    films.forEach((element) => {
      if(element.id === movieId) {
        element.cardOverlay = !element.cardOverlay;
      }
    });
    this.setState({movies: films});
  }

  render() {
    if(this.state.movies.length === 0){
      return(
        <p className="fav-phrase">Here, you can add your favorite movies.</p>
      )
    }
    else {
      return (
        <Row className="row top nopadding">
          {this.state.movies.map((movie,index) =>{
            return(
              <Col md="6 nopaddingright">
              <Card key={index}>
                <Row className="nopaddingright">
                  <Col lg="5" className="nopadding">
                    <img src={`${movie.poster_path}`} alt={movie.title} className="movie-poster-favoris"/>
                    {movie.cardOverlay ? <CardImgOverlay className="custom-overlay-movie">
                      <CardBody>
                        <CardTitle className="display-3 text-uppercase ">{movie.title}</CardTitle>
                        <CardText className="my-5">
                          <i className="fa fa-heart push-heart pull-right mr-3 mt-2" onClick={ () => {this.removeMovie(movie.id);}}></i>
                          <Rating value={movie.vote_average} color="#f4dc42" weight="24" readonly/>
                        </CardText>
                        <CardSubtitle className="h4 text-white mb-2 ">
                          {movie.release_date} - {movie.director}
                        </CardSubtitle>
                        <CardText className="font-weight-bold font-italic">{movie.casting}</CardText>
                        <CardText className="lead mt-4 overview-text-actuality mb-5">{movie.overview}</CardText>
                      </CardBody>
                    </CardImgOverlay> : null}
                    <CardText>
                      {!movie.cardOverlay ? <i onClick={() => {this.toggleCardOverlay(movie.id)}} className="fa fa-chevron-circle-up pull-right button-open-overlay"></i> :
                      <i onClick={() => {this.toggleCardOverlay(movie.id)}} className="fa fa-chevron-circle-down pull-right button-open-overlay"></i> }
                    </CardText>
                  </Col>
                  <Col lg="7" className="favoris-desktop-description d-none d-md-block">
                    <CardBody>
                      <CardTitle className="display-4 text-uppercase ">{movie.title}</CardTitle>
                      <CardText className="mb-4">
                        <i className= {`fa fa-heart pull-right mr-3 mt-2 push-heart`} onClick={ () => {this.removeMovie(movie.id);}}></i>
                        <Rating value={movie.vote_average} color="#f4dc42" weight="24" readonly/>
                      </CardText>
                      <CardSubtitle className="lead text-white mb-2 ">
                        {movie.release_date} - {movie.director}
                      </CardSubtitle>
                      <CardText className="font-weight-bold font-italic">{movie.casting}</CardText>
                      <CardText className="mt-4 text-description-favoris">{movie.overview}</CardText>
                    </CardBody>
                  </Col>
                </Row>
                </Card>
              </Col>
            )
          })
        }
        </Row>
      );
    }
  }
}

export default Favoris;