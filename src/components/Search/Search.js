import './Search.css';
import React, {Component} from 'react';
import Rating from "react-star-rating-lite";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



class Search extends Component {

    constructor(){
        super();
        this.state = {
            category: "Film  ", // mis à jour à chaque selection de catégorie de l'utilisateur
            query: "", // mis à jour à chaque entrée de l'utilisateur
            methodFetch: "",
            targetFetch: "",
            filmFetch: "",
						queryFetch: "",
						bonjour : false,
            modal : false,
            dropdownOpen: false,
						movies : [],
						directorId : 0,
						directorCredits :[],
						directorFilms :[]
				}
				this.canape ="";
    }



    fetchByCategory = () => {
        if(this.state.category === "Film  "){
            this.setState({ methodFetch : "search", targetFetch : "movie", filmFetch :"&sort_by=popularity.desc&include_adult=false&include_video=false", queryFetch :`&query=${this.state.query}` },()=>this.researchQuery())
        } else if(this.state.category === "Réalisateur  "){             
            this.setState({ methodFetch : "search", targetFetch : "person", filmFetch :`&language=en-US&query=${this.state.query}`, queryFetch :"&include_adult=false" },()=>this.researchQuery())   
        } else if(this.state.category === "Année  "){
            this.setState({ methodFetch : "discover", targetFetch : "movie", filmFetch :"&sort_by=popularity.desc&include_adult=false&include_video=false", queryFetch :`&primary_release_year=${this.state.query}`},()=>this.researchQuery() )
    
        }
       
    }

    researchQuery = () =>{
        fetch(`https://api.themoviedb.org/3/${this.state.methodFetch}/${this.state.targetFetch}?api_key=762ed8e154d8e7ff207952b1cc7074b0&${this.state.filmFetch}&page=1${this.state.queryFetch}`)
        .then(response => response.json()) 
				.then(json => {this.setState({movies : json.results})})
				.then(() => {this.setState({bonjour:!this.state.bonjour},() => this.toggleModal())})
				.then(() => {this.setState({directorId : this.state.movies[0].id},() =>{this.getMoviesFromDirector()})})
				.then(()=>{console.log(this.state.directorId)})
		
        
		}
		
		getMoviesFromDirector = () => {
			fetch(`https://api.themoviedb.org/3/person/${this.state.directorId}/movie_credits?api_key=762ed8e154d8e7ff207952b1cc7074b0`)
				.then(response => response.json())
				.then(json => {this.setState({ directorCredits : json.crew})})
				.then(()=>{ 
					let data = [];
					this.state.directorCredits.map(credit =>{
						if(credit.department === "Directing"){
							data.push(credit);
						}
					})
					this.setState({ directorFilms : data});
				})
		}


    inputChange = (event) => {
        this.setState({query: event.target.value }) 
                   
    }

    changeValue= (e) => { 
				this.setState({category: e.target.value});
      }

    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    toggleModal = () => {
        this.setState({
					modal: !this.state.modal, 		
				});
				this.card = 
												this.state.movies.map(movie =>{
												return(	
												<div className="row top">
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 p-0">           
													<div className="card mt-5 mx-5">
														<div className="row h-100 ">
															<div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0">
																<img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="fav-image h-100 w-100"/>
															</div>
															<div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0">
																<div className="card-block p-5" id="position">
																	<h4 className="card-title">{movie.title}</h4>
																	<p className="card-text"> {movie.release_date} {movie.director}</p>
																	<p className="card-text d-none d-sm-none d-md-block d-lg-block"> {movie.casting}</p>
																	<div className="sidebar-box d-none d-sm-none d-md-block d-lg-block">
																		<p className="card-text">{movie.overview}</p>
																		<p className="read-more"><a href="#" className="button">Read More</a></p>
																	</div>
																	<div className="item-bottom  mt-5">
																		<Rating className="stars" value="3" weight="18"  readonly/>
																	</div>
																</div>
															</div>
														</div>
													</div>      
												</div>
											</div>
												)})}
    

    render(){
        return(
        <div className= "searchBox">
            <button className="btn btn-dark ml-5" onClick={this.fetchByCategory}>
                <i className="fa fa-search icon"></i>
            </button>
            <div className=" ml-2 input-group">
                <input className="input-search" onChange={this.inputChange} type="text" className="form-control" placeholder="Rechercher..." aria-label="Text input with segmented dropdown button"></input>
                <div className="input-group-append">
                    
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret className="btn btn-outline-secondary  dropdown-toggle-split">
                        {this.state.category}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.changeValue} value= "Film  " >Film</DropdownItem>
                        <DropdownItem onClick={this.changeValue} value= "Réalisateur  " >Réalisateur</DropdownItem>
                        <DropdownItem onClick={this.changeValue} value= "Année  ">Année</DropdownItem>
                     </DropdownMenu>
                </Dropdown>
                </div>     
            </div>
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg" backdropClassName="bd-black">
                  <ModalHeader className="bg-black">{`RESEARCH FOR ${this.state.query.toUpperCase()}`}</ModalHeader>
                  <ModalBody className="bg-black">
									{this.card}
                </ModalBody>
              </Modal>
  					</div> 
					</div>
        )
    }
}



export default Search;