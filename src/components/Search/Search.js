import './Search.css';
import React, {Component} from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';



class Search extends Component {

    constructor(){
        super();
        this.state = {
            category: "Film", // mis à jour à chaque selection de catégorie de l'utilisateur
            query: "", // mis à jour à chaque entrée de l'utilisateur
            methodFetch: "",
            targetFetch: "",
            filmFetch: "",
            queryFetch: "",
            dropdownOpen: false,
            movies : [],
            dropDownValue: "Film  "
        }
    }



    fetchByCategory = () => {
        if(this.state.category === "0"){
            this.setState({ methodFetch : "search", targetFetch : "movie", filmFetch :"&sort_by=popularity.desc&include_adult=false&include_video=false", queryFetch :`&query=${this.state.query}` },()=>this.researchQuery())
        } else if(this.state.category === "1"){             
            this.setState({ methodFetch : "search", targetFetch : "person", filmFetch :`&language=en-US&query=${this.state.query}`, queryFetch :"&include_adult=false" },()=>this.researchQuery())   
        } else if(this.state.category === "2"){
            this.setState({ methodFetch : "discover", targetFetch : "movie", filmFetch :"&sort_by=popularity.desc&include_adult=false&include_video=false", queryFetch :`&primary_release_year=${this.state.query}`},()=>this.researchQuery() )
    
        }
       
    }

    researchQuery = () =>{
        fetch(`https://api.themoviedb.org/3/${this.state.methodFetch}/${this.state.targetFetch}?api_key=762ed8e154d8e7ff207952b1cc7074b0&${this.state.filmFetch}&page=1${this.state.queryFetch}`)
        .then(response => response.json()) 
        .then(json => {this.setState({movies : json})})
        
    }


    inputChange = (event) => {
        this.setState({query: event.target.value }) 
                   
    }

    selectChange = (event) => { 
        this.setState({category : event.target.value})  
        console.log(this.state.category)
                   //event= onClick ; target= "<select>"; value= select value;
    }   

    changeValue= (e) => { 
        this.setState({dropDownValue: e.target.value})
      }

    toggle = () => {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
      }

    render(){
        return(
            <div className= "searchBox">
            
            <div className=" ml-2 input-group">
                <button className="btn btn-dark ml-5" onClick={this.fetchByCategory} >
                    <i className="fa fa-search icon"></i>
                </button>
                <input onChange={this.inputChange} type="text" className="form-control" placeholder="Rechercher..." aria-label="Text input with segmented dropdown button"></input>
                <div className="input-group-append">
                    
                <Dropdown onClick={this.selectChange} {...this.changeValue} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret className="btn btn-outline-secondary  dropdown-toggle-split">
                        {this.state.dropDownValue}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={this.changeValue }value= "Film  " >Film</DropdownItem>
                        <DropdownItem onClick={this.changeValue } value= "Réalisateur  " >Réalisateur</DropdownItem>
                        <DropdownItem onClick={this.changeValue } value= "Année  ">Année</DropdownItem>
                     </DropdownMenu>
                </Dropdown>
                </div>
            </div>
                
            
        </div>
        )
    }
}



export default Search;