import React, {Component} from "react";
import './Favoris.css';
import Rating from "react-star-rating-lite";
import _ from 'underscore';

import { Card, CardBody, Container, CardTitle, CardText, CardImg, Col, Row, CardImgOverlay, CardSubtitle, CardFooter } from 'reactstrap';

class Favoris extends Component {
  constructor(props){
    super(props);
    this.state= {
      movies:[]
    }
    this.fullMovie = [];
    this.cardBlock = "";
  }

  renderUpdateMovie = (movie) => {
    this.setState({ movies: [...this.state.movies, movie]});
    console.log(this.state.movies);
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
  }

  render() {
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
            // <div key={index} className="col-lg-6 col-md-12 col-sm-12 col-xs-12 col-12 p-0">
            //   <div className="card mt-5 mx-5">
            //     <div className="row h-100 ">
            //       <div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0 poster-like">
            //         <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="fav-image h-100 w-100"/>
            //       </div>
            //       <div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0 h-100">
            //         <div className="card-block p-5" id="position">
            //           <h4 className="card-title">{movie.title}</h4>
            //           <p className="card-text"> {movie.release_date} {movie.director}</p>
            //           <p className="card-text d-none d-sm-none d-md-block d-lg-block">{movie.casting}</p>
            //           <div className="sidebar-box d-none d-sm-none d-md-block d-lg-block">
            //             <p className="card-text">{movie.overview}</p>
            //           </div>
            //           <div className="row favoritesRating pb-4 pr-5 mr-0 w-100">
            //             <i className="fa fa-heart pt-1 pl-3 pr-5 coeur" onClick={() => {this.removeMovie(movie.id);}}></i>
            //             <Rating value={movie.vote_average} color="#f4dc42" weight="24" readonly/>
            //             </div>
            //             <div className= "cast">
            //             <p>Brad Pitt , Nicole Kidman , Jim Carrey ...</p>
            //             </div>
            //           </div>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
          )}
        )}
      </div>
    )
  }
}
export default Favoris;