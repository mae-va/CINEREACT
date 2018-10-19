import React, {Component} from "react";
import './Favoris.css';
import 'react-notifications/lib/notifications.css';
import Rating from "react-star-rating-lite";
import _ from 'underscore';
import {NotificationManager, NotificationContainer} from 'react-notifications';

import { Card, CardBody, CardTitle, CardText, Col, Row, CardSubtitle } from 'reactstrap';

class Favoris extends Component {
  constructor(props){
    super(props);
    this.state= {
      movies:[],
      color: "push-heart",
    }
    this.fullMovie = [];
    this.cardBlock = "";
  }

  renderUpdateMovie = (movie) => {
    this.setState({ movies: [...this.state.movies, movie]});
  }

  componentDidMount() {
    this.props.updateLocalMovie(this.renderUpdateMovie);
    let values = [];
    let keys = Object.keys(localStorage);
    for (let y = 0; y < keys.length; y++) { 
      values.push(JSON.parse(localStorage.getItem(keys[y])));
    }
    values.map((value) =>{
      return(this.fullMovie.push(value))
    })
    this.setState({ movies: this.fullMovie});
  }

  removeMovie = (movieId) => {
    window.localStorage.removeItem(movieId.toString());
    this.setState({movies: _.filter(this.state.movies, (movie) => { return movie.id !== movieId})});
    this.deleteMovies();
  }

  deleteMovies = () => {
		NotificationManager.warning('Movie removed!',"", 1000);
	}

  render() {
    if(this.state.movies.length === 0){
      return(
        <p className="fav-phrase">Here, you can add your favorite movies.</p>
      )
    }
    else {
      return (
        <div className="row top">
          {this.state.movies.map((movie,index) =>{
            return(
              <Col md="6 nopadding">
                <Card key={index}>
                <Row>
                  <Col md="5">
                    <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} class="movie-poster-favoris" ></img>
                  </Col>
                  <Col md="7" className="actuality-desktop-description">
                    <CardBody>
                      <CardTitle className="display-4 text-uppercase ">{movie.title}</CardTitle>
                      <CardText className="mb-4">
                        <i className= {`fa fa-heart pull-right mr-3 mt-2`} onClick={ () => {this.removeMovie(movie.id);}}></i>
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
        </div>
      );
    }
  }
}

export default Favoris;