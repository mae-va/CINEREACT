import './Search.css';
import React, {Component} from 'react';
import Rating from "react-star-rating-lite";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap';



class Search extends Component {

    constructor(){
        super();
        this.state = {
            category: "Film", // mis à jour à chaque selection de catégorie de l'utilisateur
            query: "", // mis à jour à chaque entrée de l'utilisateur
            modal : false,
            dropdownOpen: false,
            movies : [],
            select : "0"
						}
				this.card ="";
    }

    fetchByCategory = () => {
      if(this.state.select === "0"){
        this.setState({ methodFetch : "search", targetFetch : "movie", filmFetch :"&sort_by=popularity.desc&include_adult=false&include_video=false", queryFetch :`&query=${this.state.query}` },()=>this.researchQuery())
      } else if(this.state.select === "1"){
        this.setState({ methodFetch : "discover", targetFetch : "movie", filmFetch :"&sort_by=popularity.desc&include_adult=false&include_video=false", queryFetch :`&primary_release_year=${this.state.query}`},()=>this.researchQuery() )
      }
    }

    researchQuery = () =>{
        fetch(`https://api.themoviedb.org/3/${this.state.methodFetch}/${this.state.targetFetch}?api_key=762ed8e154d8e7ff207952b1cc7074b0&${this.state.filmFetch}&page=1${this.state.queryFetch}`)
        .then(response => response.json()) 
				.then(json => {
          this.setState({movies : json.results});
          this.state.movies.map((movie) => {
            movie.release_date = movie.release_date.slice(0,4),
            movie.vote_average = Math.round(movie.vote_average/2)
          });
        })
				.then(() => {this.toggleModal()})
    }
    
    inputChange = (event) => {
      this.setState({query: event.target.value }) 
    }

    changeValue= (e) => { 
      if(e.target.value === "0"){
        this.setState({category: "Film", select : "0"});
      } else if(e.target.value === "1"){
        this.setState({category: "Year", select : "1" });
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
      if(target.charCode==13){
          this.fetchByCategory();    
      }
  
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
                  <DropdownItem onClick={this.changeValue} value="0">Film</DropdownItem>
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
        </div>
        )
    }
}

export default Search;