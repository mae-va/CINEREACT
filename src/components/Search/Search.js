import './Search.css';
import React, {Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



class Search extends Component {

    constructor(){
        super();
        this.state = {
            Select: 0, // mis à jour à chaque selection de catégorie de l'utilisateur
            Input: "", // mis à jour à chaque entrée de l'utilisateur
            dropdownOpen: false
        }
    }
    
    fetchByCategory = () => {
        this.state.Select === "0" ? fetch("") : fetch()
        this.state.Select === "1" ? fetch("") : fetch()
        this.state.Select === "2" ? fetch("") : fetch(`https://api.themoviedb.org/3/discover/movie?api_key=762ed8e154d8e7ff207952b1cc7074b0&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${this.state.query}`)
        .then(response => response.json()) 
        .then(json => {this.setState({movies : json})})
        .then(() => {console.log(this.state.movies)})
    }

    inputChange = (event) => {
        this.setState({Input: event.target.value })  
                   //met à jour le state.Input
    }

    selectChange = (event) => { 
        this.setState({Select : event.target.value})  
                   //event= onClick ; target= "<select>"; value= select value;
    }   

    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    /*getFilmbyYear() {
if((this.state.query).toString().length > 2){
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=762ed8e154d8e7ff207952b1cc7074b0&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${this.state.query}`)
    .then(response => response.json()) 
    .then(json => {this.setState({movies : json})})
    .then(() => {console.log(this.state.movies)})
    }
    }
    
    handleChange = (event) => {
    this.setState({ query : event.target.value});
    this.getFilmbyYear();
    }*/


    render(){
        return(
        <div className= "searchBox">
            <button className="btn btn-dark ml-5" onClick={this.fetchByCategory} >
                <i className="fa fa-search icon"></i>
            </button>
            <div className=" ml-2 input-group">
                <input onChange={this.inputChange} type="text" className="form-control" aria-label="Text input with segmented dropdown button"></input>
                <div className="input-group-append">
                    
                <Dropdown onChange={this.selectChange} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle className="btn btn-outline-secondary  dropdown-toggle-split">
                        Trier par 
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem value= "0" >Film</DropdownItem>
                        <DropdownItem value= "1" >Réalisateur</DropdownItem>
                        <DropdownItem value= "2">Année</DropdownItem>
                     </DropdownMenu>
                </Dropdown>
                </div>
            </div>
                
            
        </div>
        )

    }
}



export default Search;