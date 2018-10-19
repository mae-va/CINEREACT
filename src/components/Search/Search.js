import './Search.css';
import 'react-notifications/lib/notifications.css';
import React, {Component} from 'react';
import Rating from "react-star-rating-lite";
import {NotificationManager, NotificationContainer} from 'react-notifications';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap';

class Search extends Component {

  constructor(props){
    super(props);
    this.state = {
      category: "Movie ",
      query: "",
      modal : false,
      dropdownOpen: false,
      movies : [],
      select : "0"
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
      this.setState({color:"text-danger"});
      this.favoriteMovies();
    }
    else if(this.state.color === "text-danger"){
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
    this.props.functionUpdateMovie(movie)
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
            <ModalHeader close={CloseBtn} className="bg-black">{`RESULTS FOR ${this.state.query.toUpperCase()}`}</ModalHeader>
            <ModalBody className="bg-black">
              {this.state.movies.map((movie, index) =>{
							  return(	
									  <div key={index} className="row top">
											<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 p-0">
												<div className="card mt-5 mx-5">
													<div className="row h-100 ">
														<div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 col-6 ajust-scale p-0">
															<img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="fav-image h-100 w-100"/>
														</div>
														<div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 col-6 ajust-scale p-0">
															<div className="card-block p-5" id="position">
																<h4 className="card-title">{movie.title}</h4>
																<p className="card-text"> {movie.release_date} {movie.director}</p>
																<p className="card-text d-none d-sm-none d-md-block d-lg-block"> {movie.casting}</p>
																<div className="sidebar-box d-none d-sm-none d-md-block d-lg-block">
																	<p className="card-text">{movie.overview}</p>
																</div>
																<div className="item-bottom  mt-5">
                                  <i className= {`${this.state.color} fa fa-heart pl-5 pr-5`} onClick={() => {this.handleClick(movie.id,movie)}}></i>
																	<Rating className="stars" value={`${movie.vote_average}`} weight="18"  readonly/>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
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