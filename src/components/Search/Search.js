import './Search.css';
import 'react-notifications/lib/notifications.css';
import React, {Component} from 'react';
import Rating from "react-star-rating-lite";
import {NotificationManager, NotificationContainer} from 'react-notifications';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap';
import { Card, CardBody, Container, CardTitle, CardText, CardImg, Col, Row, CardImgOverlay, CardSubtitle, CardFooter } from 'reactstrap';

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      category: "Movie ",
      query: "",
      modal : false,
      dropdownOpen: false,
      movies : [],
      select : "0",
      color : "no-clicked-icon"
		}
    this.card ="";
    this.favorite = false;
  }

  fetchByCategory = () => {
    if(this.state.select === "0"){
      this.setState({ methodFetch : "search", targetFetch : "movie", filmFetch :"&sort_by=popularity.desc&include_adult=false&include_video=false", queryFetch :`&query=${this.state.query}` },()=>this.researchQuery())
    }
    else if(this.state.select === "1"){
      this.setState({ methodFetch : "discover", targetFetch : "movie", filmFetch :"&sort_by=popularity.desc&include_adult=false&include_video=false", queryFetch :`&primary_release_year=${this.state.query}`},()=>this.researchQuery())
    }
  }

  researchQuery = () =>{
    fetch(`https://api.themoviedb.org/3/${this.state.methodFetch}/${this.state.targetFetch}?api_key=762ed8e154d8e7ff207952b1cc7074b0&${this.state.filmFetch}&page=1${this.state.queryFetch}`)
      .then(response => response.json()) 
			.then(json => {
            this.setState({movies : json.results},() =>{this.getDirectorFromMoviesId()});
            this.state.movies.map((movie) => {
              return(
              movie.release_date = movie.release_date.slice(0,4),
              movie.vote_average = Math.round(movie.vote_average/2))
            });
      })
			.then(() => {this.toggleModal()})
  }

  getDirectorFromMoviesId = () => {
    this.state.movies.map(movie =>{
      return(
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=762ed8e154d8e7ff207952b1cc7074b0`)
      .then(response => response.json())
      .then(json =>{
        if(json.crew[0]) {
          movie.director = json.crew[0].name
          let results = json.cast.slice(0,4);
          let fullCast ="";
          for(let i=0; i<results.length; i++){
            if(i === 3) {
              fullCast+=`${results[i].name}... `;
            } else {
            fullCast +=`${results[i].name}, `;
            }
          } 
          movie.casting = fullCast;
          this.forceUpdate();
        } else {
          console.log("ERROR CREW NAME UNDEFINE");
        }
      })
    )})
    
  }

  inputChange = (event) => {
    this.setState({query: event.target.value })
  }

  changeValue= (e) => {
    if(e.target.value === "0"){
      this.setState({category: "Movie ", select : "0"});
    }
    else if(e.target.value === "1"){
      this.setState({category: "Year ", select : "1" });
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleKeyPress = (target) => {
    if(target.charCode === 13){
      this.fetchByCategory();
    }
  }

  handleClick = (movieId, movie) => {
    if(this.state.color=== "no-clicked-icon"){
      this.setState({color:"push-heart"});
      this.favoriteMovies();
    }
    else if(this.state.color === "push-heart"){
      this.setState({color:"no-clicked-icon"});
      this.deleteMovies();
    }
    this.setState({ favorite: !this.state.favorite }, () => {this.setFavorite(movieId, movie)});
  }

	setFavorite = (movieId, movie) => {
    if(this.state.favorite===true){
      this.setItem(movieId, movie);
    }
    else if(this.state.favorite===false){
      this.removeItem(movieId);
    }
	}

  setItem = (movieId, movie) => {
    window.localStorage.setItem(`${movieId}`, JSON.stringify(movie));
    if(window.location.pathname === "/favoris") {
      this.props.functionUpdateMovie(movie)
    }
  }

  removeItem = (movieId) => {
    window.localStorage.removeItem(`${movieId}`);
  }


  favoriteMovies = () => {
		NotificationManager.success('Movie added!',"", 1000);
	}

	deleteMovies = () => {
		NotificationManager.warning('Movie removed!',"", 1000);
	}

  render(){
		const CloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px', color: "#5FD4F4" }} onClick={this.toggleModal}>&times;</button>;
    return(
      <div className="top-fixed-search">
        <Button onClick={this.fetchByCategory} className="btn-dark"><i className="fa fa-search icon"></i></Button>
        <Input placeholder="Search" onKeyPress={this.handleKeyPress} onChange={this.inputChange}/>
          <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret className="btn btn-outline-secondary  dropdown-toggle-split">
              {this.state.category}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={this.changeValue} value="0">Movie</DropdownItem>
              <DropdownItem onClick={this.changeValue} value="1">Year</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg" backdropClassName="bd-black">
            <ModalHeader close={CloseBtn} className="bg-black">{`Results for ${this.state.query.toUpperCase()}`}</ModalHeader>
            <ModalBody className="bg-black">
              {this.state.movies.map((movie, index) =>{
							  return(	
                  <Col md="12 nopadding" sm="12 nopadding">
                    <Card key={index}>
                      <Row>
                        <Col lg="5">
                          <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} className="movie-poster-favoris" ></img>
                        </Col>
                        <Col lg="7" className="favoris-desktop-description">
                          <CardBody>
                            <CardTitle className="display-4 text-uppercase ">{movie.title}</CardTitle>
                            <CardText className="mb-4">
                              <i className= {`${this.state.color} fa fa-heart pull-right mr-3 mt-2 no-clicked-icon`} onClick={ () => {this.handleClick(movie.id, movie);}}></i>
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
									)})
							  }}
            </ModalBody>
          </Modal>
        <NotificationContainer/>
      </div>
    )
  }
}

export default Search;