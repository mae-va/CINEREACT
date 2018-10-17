import './Search.css';
import React, {Component} from 'react';
import Rating from "react-star-rating-lite";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupDropdown,
  Input,
  Button } from 'reactstrap';



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
				// .then(() => {
				// 	this.setState({movies : {...this.state.movies,release_date : this.state.movies.release_date.slice(0,4)}});
				// 	//this.setState({movies : {...this.state.movies,vote_average : Math.round(this.state.movies.vote_average/2)}}/*,() => {this.getDirectorFromMovieId()}*/);		
				// })
				.then(()=>{console.log(this.state.movies)})     
				.then(() => {this.setState({directorId : this.state.movies[0].id},() =>{this.getMoviesFromDirector()})})
		
        
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
					this.setState({ directorFilms : data},() => this.toggleModal());
				})
		}
		/*
		getDirectorFromMovieId = () => {
      fetch(`https://api.themoviedb.org/3/movie/${this.state.movies.id}/credits?api_key=762ed8e154d8e7ff207952b1cc7074b0`)
        .then(response => response.json())
        .then(json =>{
          this.setState({movies : {...this.state.movies,director : json.crew[0].name}});
          let results = json.cast.slice(0,4);
          let fullCast ="";
          for(let i=0; i<results.length -1 ; i++){
              fullCast +=`${results[i].name}, `;
              if (i === 2) {
                fullCast+=`${results[i].name}... `;
               }
            } 
          this.setState({movies : {...this.state.movies,casting : fullCast}})
        })
      
    } */


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
					modal: !this.state.modal
				});
				if(this.state.category === "Film  " || this.state.category === "Année  " ){
				this.card = 
							this.state.movies.map((movie, index) =>{
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
												)})

									} else if(this.state.category === "Réalisateur  "){
										this.card =
										this.state.directorFilms.map((film,index) =>{
											return(	
													<div className="row top">
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 p-0">           
															<div className="card mt-5 mx-5">
																<div className="row h-100 ">
																	<div className="col-lg-5 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0">
																		<img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt={film.title} className="fav-image h-100 w-100"/>
																	</div>
																	<div className="col-lg-7 col-md-6 col-sm-6 col-xs-6 col-6 ajust-height p-0">
																		<div className="card-block p-5" id="position">
																			<h4 className="card-title">{film.title}</h4>
																			<p className="card-text"> {film.release_date} {film.director}</p>
																			<p className="card-text d-none d-sm-none d-md-block d-lg-block"> {film.casting}</p>
																			<div className="sidebar-box d-none d-sm-none d-md-block d-lg-block">
																				<p className="card-text">{film.overview}</p>
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
														)})
									}		
									
							}
    

    render(){
		  const CloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px', color: "#5FD4F4" }} onClick={this.toggleModal}>&times;</button>;
      return(
        <div className="top-fixed-search">
          {/* <InputGroupAddon addonType="prepend"></InputGroupAddon> */}
          <Button onClick={this.fetchByCategory} className="btn-dark"><i className="fa fa-search icon"></i></Button>
          <Input placeholder="Search" onChange={this.inputChange}/>
            {/* <InputGroupAddon addonType="prepend"> */}
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
          {/* </InputGroupAddon> */}  
        </div>

            // <div className= "searchBox">
            //   <div className="input-group">
            //     <button className="btn btn-dark" onClick={this.fetchByCategory} >
            //         <i className="fa fa-search icon"></i>
            //     </button>
            //     <input onChange={this.inputChange} type="text" className="form-control" placeholder="Rechercher..." aria-label="Text input with segmented dropdown button"></input>
            //     <div className="input-group-append">   
            //     <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            //         <DropdownToggle caret className="btn btn-outline-secondary  dropdown-toggle-split">
            //             {this.state.category}
            //         </DropdownToggle>
            //         <DropdownMenu>
            //             <DropdownItem onClick={this.changeValue} value= "Film  " >Film</DropdownItem>
            //             <DropdownItem onClick={this.changeValue} value= "Réalisateur  " >Réalisateur</DropdownItem>
            //             <DropdownItem onClick={this.changeValue} value= "Année  ">Année</DropdownItem>
            //          </DropdownMenu>
            //     </Dropdown>
            //     </div>     
            // </div>
            // <div>
            //     <Modal isOpen={this.state.modal} toggle={this.toggleModal} size="lg" backdropClassName="bd-black">
            //       <ModalHeader close={CloseBtn} className="bg-black">{`RESEARCH FOR ${this.state.query.toUpperCase()}`}</ModalHeader>
            //       <ModalBody className="bg-black">
			// 						{this.card}
            //     </ModalBody>
            //   </Modal>
  			// 		</div> 
			// 		</div>
        )
    }
}



export default Search;